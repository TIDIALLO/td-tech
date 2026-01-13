#!/bin/bash

# =============================================================================
# Script de Déploiement Synap6ia - VPS Hostinger
# =============================================================================
# Ce script automatise le déploiement de l'application Next.js sur votre VPS
#
# Usage:
#   ./deploy-hostinger.sh              # Déploiement complet
#   ./deploy-hostinger.sh --quick      # Déploiement rapide (sans reinstall)
#   ./deploy-hostinger.sh --restart    # Redémarrer PM2 seulement
# =============================================================================

set -e  # Arrêter le script en cas d'erreur

# Configuration - À MODIFIER selon votre VPS
VPS_USER="root"                          # Utilisateur SSH
VPS_HOST="votre-ip-hostinger"            # IP ou domaine du VPS
VPS_PORT="22"                            # Port SSH (22 par défaut)
APP_DIR="/var/www/synap6ia"              # Dossier de l'application sur le VPS
BRANCH="main"                            # Branche Git à déployer
PM2_APP_NAME="synap6ia"                  # Nom de l'app dans PM2

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonctions utilitaires
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier la connexion SSH
check_ssh() {
    log_info "Vérification de la connexion SSH..."
    if ssh -q -o ConnectTimeout=5 -p $VPS_PORT $VPS_USER@$VPS_HOST exit; then
        log_success "Connexion SSH établie"
    else
        log_error "Impossible de se connecter au VPS. Vérifiez votre configuration."
        exit 1
    fi
}

# Déploiement complet
full_deploy() {
    log_info "=== Démarrage du déploiement complet ==="

    ssh -p $VPS_PORT $VPS_USER@$VPS_HOST << 'ENDSSH'
        set -e

        echo "📂 Navigation vers le dossier de l'application..."
        cd /var/www/synap6ia || {
            echo "Création du dossier..."
            mkdir -p /var/www/synap6ia
            cd /var/www/synap6ia
            git clone https://github.com/TIDIALLO/td-tech.git .
        }

        echo "📥 Récupération des dernières modifications..."
        git fetch origin
        git reset --hard origin/main
        git pull origin main

        echo "📦 Installation des dépendances..."
        npm install --legacy-peer-deps

        echo "🗄️ Mise à jour de la base de données..."
        npx prisma generate
        npx prisma db push --skip-generate

        echo "🔨 Build de l'application..."
        npm run build

        echo "🚀 Redémarrage de l'application avec PM2..."
        pm2 stop synap6ia 2>/dev/null || true
        pm2 delete synap6ia 2>/dev/null || true
        pm2 start npm --name "synap6ia" -- start
        pm2 save

        echo "✅ Déploiement terminé avec succès!"
        pm2 status
ENDSSH

    log_success "=== Déploiement terminé ==="
}

# Déploiement rapide (sans reinstall)
quick_deploy() {
    log_info "=== Démarrage du déploiement rapide ==="

    ssh -p $VPS_PORT $VPS_USER@$VPS_HOST << 'ENDSSH'
        set -e
        cd /var/www/synap6ia

        echo "📥 Récupération des dernières modifications..."
        git pull origin main

        echo "🔨 Build de l'application..."
        npm run build

        echo "🔄 Rechargement de PM2..."
        pm2 reload synap6ia

        echo "✅ Déploiement rapide terminé!"
ENDSSH

    log_success "=== Déploiement rapide terminé ==="
}

# Redémarrer PM2 seulement
restart_only() {
    log_info "=== Redémarrage de PM2 ==="

    ssh -p $VPS_PORT $VPS_USER@$VPS_HOST << 'ENDSSH'
        pm2 restart synap6ia
        pm2 status
ENDSSH

    log_success "=== Redémarrage terminé ==="
}

# Afficher les logs
show_logs() {
    log_info "=== Logs de l'application ==="
    ssh -p $VPS_PORT $VPS_USER@$VPS_HOST "pm2 logs synap6ia --lines 50"
}

# Afficher le statut
show_status() {
    log_info "=== Statut de l'application ==="
    ssh -p $VPS_PORT $VPS_USER@$VPS_HOST "pm2 status"
}

# Menu principal
case "$1" in
    --quick|-q)
        check_ssh
        quick_deploy
        ;;
    --restart|-r)
        check_ssh
        restart_only
        ;;
    --logs|-l)
        show_logs
        ;;
    --status|-s)
        show_status
        ;;
    --help|-h)
        echo ""
        echo "Script de déploiement Synap6ia pour VPS Hostinger"
        echo ""
        echo "Usage:"
        echo "  ./deploy-hostinger.sh              Déploiement complet"
        echo "  ./deploy-hostinger.sh --quick      Déploiement rapide (pull + build + reload)"
        echo "  ./deploy-hostinger.sh --restart    Redémarrer PM2 seulement"
        echo "  ./deploy-hostinger.sh --logs       Afficher les logs"
        echo "  ./deploy-hostinger.sh --status     Afficher le statut PM2"
        echo "  ./deploy-hostinger.sh --help       Afficher cette aide"
        echo ""
        echo "Configuration requise sur le VPS:"
        echo "  1. Node.js 18+ installé"
        echo "  2. PM2 installé globalement (npm install -g pm2)"
        echo "  3. Git configuré"
        echo "  4. Variables d'environnement dans /var/www/synap6ia/.env"
        echo ""
        ;;
    *)
        check_ssh
        full_deploy
        ;;
esac

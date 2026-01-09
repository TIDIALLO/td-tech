#!/bin/bash

###############################################################################
# Script de Déploiement Rapide PM2 pour synap6ia.com
#
# Ce script automatise le déploiement manuel sur le VPS avec PM2
#
# Usage:
#   bash scripts/deploy-pm2.sh
#
# Note: À exécuter sur le VPS dans /var/www/synap6ia
###############################################################################

set -e  # Arrêter en cas d'erreur

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

APP_NAME="synap6ia"
DEPLOY_PATH="/var/www/synap6ia"
PORT="3002"

# Fonctions
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

###############################################################################
# Vérifications préliminaires
###############################################################################
check_prerequisites() {
    log_info "Vérification des prérequis..."

    # Vérifier PM2
    if ! command -v pm2 &> /dev/null; then
        log_error "PM2 n'est pas installé!"
        echo "Installez PM2 avec: npm install -g pm2"
        exit 1
    fi

    # Vérifier le répertoire
    if [ ! -d "$DEPLOY_PATH" ]; then
        log_error "Le répertoire $DEPLOY_PATH n'existe pas!"
        exit 1
    fi

    log_success "Prérequis OK"
}

###############################################################################
# Sauvegarde du .env
###############################################################################
backup_env() {
    log_info "Sauvegarde du fichier .env..."

    if [ -f "$DEPLOY_PATH/.env" ]; then
        cp "$DEPLOY_PATH/.env" "$DEPLOY_PATH/.env.backup.$(date +%Y%m%d_%H%M%S)"
        log_success "Fichier .env sauvegardé"
    else
        log_warning "Aucun fichier .env à sauvegarder"
    fi
}

###############################################################################
# Pull des modifications Git
###############################################################################
pull_changes() {
    log_info "Pull des dernières modifications..."

    cd "$DEPLOY_PATH"

    # Stash les changements locaux si nécessaire
    git stash > /dev/null 2>&1 || true

    # Pull
    git fetch origin
    git pull origin main || git pull origin master

    log_success "Code mis à jour"
}

###############################################################################
# Installation des dépendances
###############################################################################
install_dependencies() {
    log_info "Installation des dépendances..."

    cd "$DEPLOY_PATH"

    npm ci --legacy-peer-deps || npm install --legacy-peer-deps

    log_success "Dépendances installées"
}

###############################################################################
# Génération du client Prisma
###############################################################################
generate_prisma() {
    log_info "Génération du client Prisma..."

    cd "$DEPLOY_PATH"

    npx prisma generate

    log_success "Client Prisma généré"
}

###############################################################################
# Build de l'application
###############################################################################
build_app() {
    log_info "Build de l'application Next.js..."

    cd "$DEPLOY_PATH"

    npm run build

    log_success "Build terminé"
}

###############################################################################
# Migrations de la base de données
###############################################################################
migrate_database() {
    log_info "Application des migrations de base de données..."

    cd "$DEPLOY_PATH"

    if [ -d "prisma/migrations" ] && [ "$(ls -A prisma/migrations)" ]; then
        log_info "Migrations trouvées, application..."
        npx prisma migrate deploy || {
            log_warning "Migration échouée, tentative avec db push..."
            npx prisma db push --accept-data-loss
        }
    else
        log_warning "Aucune migration, utilisation de db push..."
        npx prisma db push --accept-data-loss
    fi

    log_success "Base de données mise à jour"
}

###############################################################################
# Redémarrage PM2
###############################################################################
restart_pm2() {
    log_info "Redémarrage de l'application avec PM2..."

    cd "$DEPLOY_PATH"

    # Vérifier si l'app existe
    if pm2 list | grep -q "$APP_NAME"; then
        log_info "Redémarrage de l'app existante: $APP_NAME"
        pm2 restart "$APP_NAME"
    else
        log_info "Démarrage d'une nouvelle app: $APP_NAME"
        PORT=$PORT pm2 start npm --name "$APP_NAME" -- start
    fi

    # Sauvegarder la configuration PM2
    pm2 save

    log_success "Application redémarrée"
}

###############################################################################
# Affichage du statut
###############################################################################
show_status() {
    log_info "Statut de l'application..."

    echo ""
    pm2 list

    echo ""
    log_info "Logs récents (dernières 20 lignes):"
    pm2 logs "$APP_NAME" --lines 20 --nostream

    echo ""
    log_success "✅ Déploiement terminé avec succès!"
    echo ""
    echo "🌐 Site: https://synap6ia.com"
    echo "📊 Logs: pm2 logs $APP_NAME"
    echo "🔄 Redémarrer: pm2 restart $APP_NAME"
    echo ""
}

###############################################################################
# Nettoyage en cas d'erreur
###############################################################################
cleanup_on_error() {
    log_error "Une erreur s'est produite pendant le déploiement!"
    log_info "Consultez les logs avec: pm2 logs $APP_NAME"
    exit 1
}

###############################################################################
# Programme principal
###############################################################################
main() {
    echo ""
    log_info "╔════════════════════════════════════════════════════════════╗"
    log_info "║        Déploiement PM2 - synap6ia.com                     ║"
    log_info "╚════════════════════════════════════════════════════════════╝"
    echo ""

    # Confirmation
    read -p "Déployer l'application sur synap6ia.com ? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Déploiement annulé"
        exit 0
    fi

    # Trap pour gérer les erreurs
    trap cleanup_on_error ERR

    # Exécution des étapes
    check_prerequisites
    backup_env
    pull_changes
    install_dependencies
    generate_prisma
    build_app
    migrate_database
    restart_pm2
    show_status

    log_success "🎉 Déploiement réussi!"
}

# Exécution
main "$@"

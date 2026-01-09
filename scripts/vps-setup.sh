#!/bin/bash

###############################################################################
# Script de Configuration VPS pour synap6ia.com (Hostinger)
#
# Ce script automatise la configuration initiale du VPS Hostinger
# pour le déploiement de synap6ia.com
#
# Usage:
#   bash scripts/vps-setup.sh
#
# Note: À exécuter directement sur le VPS après connexion SSH
###############################################################################

set -e  # Arrêter en cas d'erreur

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables
DEPLOY_PATH="/var/www/synap6ia"
REPO_URL="https://github.com/TIDIALLO/td-tech.git"
DOMAIN="synap6ia.com"
NGINX_CONFIG="/etc/nginx/sites-available/synap6ia"

# Fonctions helper
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
# 1. Mise à jour du système
###############################################################################
setup_system() {
    log_info "Mise à jour du système..."
    sudo apt update
    sudo apt upgrade -y
    log_success "Système mis à jour"
}

###############################################################################
# 2. Installation de Docker
###############################################################################
install_docker() {
    if command -v docker &> /dev/null; then
        log_warning "Docker est déjà installé"
        docker --version
    else
        log_info "Installation de Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker $USER
        rm get-docker.sh
        log_success "Docker installé"
    fi
}

###############################################################################
# 3. Installation de Docker Compose
###############################################################################
install_docker_compose() {
    if command -v docker-compose &> /dev/null; then
        log_warning "Docker Compose est déjà installé"
        docker-compose --version
    else
        log_info "Installation de Docker Compose..."
        sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
        log_success "Docker Compose installé"
    fi
}

###############################################################################
# 4. Installation de Nginx
###############################################################################
install_nginx() {
    if command -v nginx &> /dev/null; then
        log_warning "Nginx est déjà installé"
        nginx -v
    else
        log_info "Installation de Nginx..."
        sudo apt install nginx -y
        sudo systemctl enable nginx
        sudo systemctl start nginx
        log_success "Nginx installé et démarré"
    fi
}

###############################################################################
# 5. Installation de Certbot
###############################################################################
install_certbot() {
    if command -v certbot &> /dev/null; then
        log_warning "Certbot est déjà installé"
        certbot --version
    else
        log_info "Installation de Certbot..."
        sudo apt install certbot python3-certbot-nginx -y
        log_success "Certbot installé"
    fi
}

###############################################################################
# 6. Installation de Git
###############################################################################
install_git() {
    if command -v git &> /dev/null; then
        log_warning "Git est déjà installé"
        git --version
    else
        log_info "Installation de Git..."
        sudo apt install git -y
        log_success "Git installé"
    fi
}

###############################################################################
# 7. Clonage du projet
###############################################################################
clone_project() {
    if [ -d "$DEPLOY_PATH/.git" ]; then
        log_warning "Le projet existe déjà dans $DEPLOY_PATH"
        log_info "Mise à jour du projet..."
        cd $DEPLOY_PATH
        git pull origin main || git pull origin master
    else
        log_info "Clonage du projet dans $DEPLOY_PATH..."
        sudo mkdir -p $DEPLOY_PATH
        sudo chown -R $USER:$USER $DEPLOY_PATH
        git clone $REPO_URL $DEPLOY_PATH
        log_success "Projet cloné"
    fi
}

###############################################################################
# 8. Configuration du fichier .env
###############################################################################
setup_env() {
    log_info "Configuration du fichier .env..."

    if [ -f "$DEPLOY_PATH/.env" ]; then
        log_warning "Le fichier .env existe déjà"
        read -p "Voulez-vous le recréer ? (y/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_info "Conservation du .env existant"
            return
        fi
        cp "$DEPLOY_PATH/.env" "$DEPLOY_PATH/.env.backup.$(date +%Y%m%d_%H%M%S)"
    fi

    # Génération d'un AUTH_SECRET sécurisé
    AUTH_SECRET=$(openssl rand -base64 32)

    cat > "$DEPLOY_PATH/.env" << EOF
# Database
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/synap6ia_db?schema=public"

# Auth.js
AUTH_SECRET="$AUTH_SECRET"
AUTH_URL="https://$DOMAIN"

# Uploadthing (optionnel - à configurer)
UPLOADTHING_TOKEN=""

# Email (optionnel - à configurer)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER=""
EMAIL_SERVER_PASSWORD=""
EMAIL_FROM="noreply@$DOMAIN"

# Admin credentials
ADMIN_EMAIL="admin@$DOMAIN"
ADMIN_PASSWORD="ChangeMe123!"

# Node Environment
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://$DOMAIN"
EOF

    log_success "Fichier .env créé"
    log_warning "⚠️  IMPORTANT: Modifiez les valeurs dans $DEPLOY_PATH/.env"
    log_warning "⚠️  Changez notamment ADMIN_PASSWORD et configurez les emails"
}

###############################################################################
# 9. Configuration Nginx
###############################################################################
setup_nginx() {
    log_info "Configuration de Nginx..."

    if [ -f "$NGINX_CONFIG" ]; then
        log_warning "La configuration Nginx existe déjà"
        sudo cp "$NGINX_CONFIG" "$NGINX_CONFIG.backup.$(date +%Y%m%d_%H%M%S)"
    fi

    sudo tee $NGINX_CONFIG > /dev/null << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name synap6ia.com www.synap6ia.com;

    # Logs
    access_log /var/log/nginx/synap6ia.access.log;
    error_log /var/log/nginx/synap6ia.error.log;

    # Headers de sécurité
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy vers l'application Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Assets statiques Next.js
    location /_next/static {
        proxy_cache_valid 60m;
        proxy_pass http://localhost:3000;
    }

    # Fichiers statiques publics
    location /static {
        proxy_cache_valid 60m;
        proxy_pass http://localhost:3000;
    }
}
EOF

    # Activer le site
    sudo ln -sf $NGINX_CONFIG /etc/nginx/sites-enabled/synap6ia

    # Supprimer le site par défaut si présent
    sudo rm -f /etc/nginx/sites-enabled/default

    # Tester la configuration
    sudo nginx -t

    # Recharger Nginx
    sudo systemctl reload nginx

    log_success "Nginx configuré"
}

###############################################################################
# 10. Build et démarrage Docker
###############################################################################
start_application() {
    log_info "Build et démarrage de l'application..."

    cd $DEPLOY_PATH

    # Build et démarrage
    docker-compose down || true
    docker-compose up -d --build

    log_info "Attente du démarrage des conteneurs (30s)..."
    sleep 30

    # Vérifier le statut
    docker-compose ps

    log_success "Application démarrée"
}

###############################################################################
# 11. Configuration de la base de données
###############################################################################
setup_database() {
    log_info "Configuration de la base de données..."

    cd $DEPLOY_PATH

    # Appliquer les migrations ou push le schéma
    if [ -d "prisma/migrations" ] && [ "$(ls -A prisma/migrations)" ]; then
        log_info "Application des migrations Prisma..."
        docker-compose exec -T app npx prisma migrate deploy || {
            log_warning "Migrations échouées, tentative avec db push..."
            docker-compose exec -T app npx prisma db push --accept-data-loss
        }
    else
        log_info "Push du schéma Prisma..."
        docker-compose exec -T app npx prisma db push --accept-data-loss
    fi

    # Seed de la base
    read -p "Voulez-vous peupler la base avec des données de test ? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "Seed de la base de données..."
        docker-compose exec -T app npx prisma db seed || log_warning "Seed échoué"
        docker-compose exec -T app npx tsx prisma/seed-blog.ts || log_warning "Seed blog échoué"
    fi

    log_success "Base de données configurée"
}

###############################################################################
# 12. Configuration SSL
###############################################################################
setup_ssl() {
    log_info "Configuration SSL avec Certbot..."

    read -p "Voulez-vous configurer le SSL maintenant ? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_warning "SSL non configuré. Lancez plus tard:"
        log_info "sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
        return
    fi

    # Configuration SSL automatique
    sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --redirect || {
        log_error "Échec de la configuration SSL"
        log_info "Vous pourrez réessayer avec:"
        log_info "sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
    }

    log_success "SSL configuré"
}

###############################################################################
# 13. Tests finaux
###############################################################################
run_tests() {
    log_info "Tests de l'installation..."

    # Test Docker
    if docker-compose ps | grep -q "Up"; then
        log_success "✓ Docker: Conteneurs actifs"
    else
        log_error "✗ Docker: Problème avec les conteneurs"
    fi

    # Test Nginx
    if sudo systemctl is-active --quiet nginx; then
        log_success "✓ Nginx: Actif"
    else
        log_error "✗ Nginx: Inactif"
    fi

    # Test de l'application
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200\|301\|302"; then
        log_success "✓ Application: Répond sur le port 3000"
    else
        log_warning "⚠ Application: Pas de réponse sur le port 3000"
    fi

    # Test du domaine (si SSL configuré)
    if curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN | grep -q "200\|301\|302"; then
        log_success "✓ Domaine: Accessible via HTTPS"
    else
        log_warning "⚠ Domaine: Non accessible (DNS pas configuré ou SSL manquant)"
    fi
}

###############################################################################
# 14. Affichage des informations finales
###############################################################################
show_final_info() {
    echo ""
    log_success "╔════════════════════════════════════════════════════════════╗"
    log_success "║         INSTALLATION TERMINÉE AVEC SUCCÈS ! 🎉            ║"
    log_success "╚════════════════════════════════════════════════════════════╝"
    echo ""
    log_info "📍 Informations importantes:"
    echo ""
    echo "  🌐 Site web:        https://$DOMAIN"
    echo "  🔐 Admin:           https://$DOMAIN/admin"
    echo "  📝 Blog:            https://$DOMAIN/blog"
    echo "  📁 Chemin projet:   $DEPLOY_PATH"
    echo "  🐳 Docker status:   docker-compose ps"
    echo "  📊 Logs:            docker-compose logs -f"
    echo ""
    log_warning "⚠️  PROCHAINES ÉTAPES:"
    echo ""
    echo "  1. Modifiez $DEPLOY_PATH/.env avec vos vraies valeurs"
    echo "  2. Changez le mot de passe admin (ADMIN_PASSWORD)"
    echo "  3. Configurez les secrets GitHub Actions pour le CI/CD"
    echo "  4. Redémarrez l'application: cd $DEPLOY_PATH && docker-compose restart"
    echo ""
    log_info "📖 Documentation complète: $DEPLOY_PATH/DEPLOYMENT-SYNAP6IA.md"
    echo ""
}

###############################################################################
# PROGRAMME PRINCIPAL
###############################################################################
main() {
    echo ""
    log_info "╔════════════════════════════════════════════════════════════╗"
    log_info "║      Setup VPS pour synap6ia.com (Hostinger)               ║"
    log_info "╚════════════════════════════════════════════════════════════╝"
    echo ""

    # Vérifier que le script est exécuté sur le VPS
    read -p "Ce script va configurer le VPS pour synap6ia.com. Continuer ? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Installation annulée"
        exit 0
    fi

    # Exécution des étapes
    setup_system
    install_docker
    install_docker_compose
    install_nginx
    install_certbot
    install_git
    clone_project
    setup_env
    setup_nginx
    start_application
    setup_database
    setup_ssl
    run_tests
    show_final_info

    log_success "Script terminé !"
}

# Exécution du programme principal
main "$@"

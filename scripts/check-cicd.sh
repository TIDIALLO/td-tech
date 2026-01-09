#!/bin/bash

###############################################################################
# Script de vérification CI/CD pour synap6ia.com
#
# Vérifie que tous les éléments nécessaires au CI/CD sont en place
#
# Usage:
#   bash scripts/check-cicd.sh
###############################################################################

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Compteurs
CHECKS_PASSED=0
CHECKS_FAILED=0
CHECKS_TOTAL=0

# Fonctions
check_pass() {
    echo -e "${GREEN}✓${NC} $1"
    ((CHECKS_PASSED++))
    ((CHECKS_TOTAL++))
}

check_fail() {
    echo -e "${RED}✗${NC} $1"
    ((CHECKS_FAILED++))
    ((CHECKS_TOTAL++))
}

check_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((CHECKS_TOTAL++))
}

log_section() {
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE} $1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo ""
}

###############################################################################
# 1. Vérification des fichiers de workflow
###############################################################################
check_workflows() {
    log_section "1. Vérification des Workflows GitHub Actions"

    if [ -f ".github/workflows/deploy.yml" ]; then
        check_pass "Fichier deploy.yml présent"
    else
        check_fail "Fichier deploy.yml manquant"
    fi

    if [ -f ".github/workflows/ci.yml" ]; then
        check_pass "Fichier ci.yml présent"
    else
        check_fail "Fichier ci.yml manquant"
    fi

    # Vérifier le contenu du workflow de déploiement
    if grep -q "/var/www/synap6ia" .github/workflows/deploy.yml 2>/dev/null; then
        check_pass "Chemin de déploiement synap6ia configuré"
    else
        check_warn "Chemin de déploiement par défaut utilisé"
    fi

    if grep -q "synap6ia" .github/workflows/deploy.yml 2>/dev/null; then
        check_pass "Références à synap6ia présentes dans le workflow"
    else
        check_warn "Pas de références spécifiques à synap6ia"
    fi
}

###############################################################################
# 2. Vérification des fichiers Docker
###############################################################################
check_docker() {
    log_section "2. Vérification des Fichiers Docker"

    if [ -f "Dockerfile" ]; then
        check_pass "Dockerfile présent"
    else
        check_fail "Dockerfile manquant"
    fi

    if [ -f "docker-compose.yml" ]; then
        check_pass "docker-compose.yml présent"
    else
        check_fail "docker-compose.yml manquant"
    fi

    # Vérifier la configuration standalone dans next.config
    if grep -q '"standalone"' next.config.ts 2>/dev/null || grep -q "'standalone'" next.config.ts 2>/dev/null; then
        check_pass "Next.js configuré en mode standalone"
    else
        check_warn "Next.js pas en mode standalone (peut causer des problèmes Docker)"
    fi
}

###############################################################################
# 3. Vérification des fichiers Prisma
###############################################################################
check_prisma() {
    log_section "3. Vérification de Prisma"

    if [ -f "prisma/schema.prisma" ]; then
        check_pass "Schema Prisma présent"
    else
        check_fail "Schema Prisma manquant"
    fi

    if [ -d "prisma/migrations" ] && [ "$(ls -A prisma/migrations)" ]; then
        check_pass "Migrations Prisma présentes"
    else
        check_warn "Aucune migration Prisma (db push sera utilisé)"
    fi

    if [ -f "prisma/seed.ts" ]; then
        check_pass "Script de seed présent"
    else
        check_warn "Pas de script de seed"
    fi

    if [ -f "prisma/seed-blog.ts" ]; then
        check_pass "Script de seed blog présent"
    else
        check_warn "Pas de script de seed blog"
    fi
}

###############################################################################
# 4. Vérification de la configuration Next.js
###############################################################################
check_nextjs() {
    log_section "4. Vérification de la Configuration Next.js"

    if [ -f "next.config.ts" ] || [ -f "next.config.js" ]; then
        check_pass "Fichier next.config présent"
    else
        check_fail "Fichier next.config manquant"
    fi

    if [ -f "package.json" ]; then
        check_pass "package.json présent"

        # Vérifier les scripts nécessaires
        if grep -q '"build"' package.json; then
            check_pass "Script 'build' présent"
        else
            check_fail "Script 'build' manquant"
        fi

        if grep -q '"start"' package.json; then
            check_pass "Script 'start' présent"
        else
            check_fail "Script 'start' manquant"
        fi

        if grep -q '"postinstall".*prisma generate' package.json; then
            check_pass "Postinstall prisma generate configuré"
        else
            check_warn "Postinstall prisma generate non configuré"
        fi
    else
        check_fail "package.json manquant"
    fi
}

###############################################################################
# 5. Vérification du blog
###############################################################################
check_blog() {
    log_section "5. Vérification du Blog"

    if [ -f "src/app/blog/page.tsx" ]; then
        check_pass "Page blog présente"
    else
        check_fail "Page blog manquante"
    fi

    if [ -d "src/app/blog/[slug]" ]; then
        check_pass "Page détail blog présente"
    else
        check_fail "Page détail blog manquante"
    fi

    if [ -d "src/app/admin/blog" ]; then
        check_pass "Interface admin blog présente"
    else
        check_fail "Interface admin blog manquante"
    fi

    # Vérifier que blog est dans la navbar
    if grep -q '"Blog"' src/components/navbar.tsx 2>/dev/null || grep -q "'Blog'" src/components/navbar.tsx 2>/dev/null; then
        check_pass "Blog ajouté dans la navbar"
    else
        check_warn "Blog pas visible dans la navbar"
    fi
}

###############################################################################
# 6. Vérification de la documentation
###############################################################################
check_documentation() {
    log_section "6. Vérification de la Documentation"

    if [ -f "DEPLOYMENT-SYNAP6IA.md" ]; then
        check_pass "Guide de déploiement synap6ia présent"
    else
        check_warn "Guide de déploiement synap6ia manquant"
    fi

    if [ -f "README.md" ]; then
        check_pass "README présent"

        if grep -q "Blog" README.md; then
            check_pass "Documentation du blog dans le README"
        else
            check_warn "Pas de documentation du blog dans le README"
        fi
    else
        check_fail "README manquant"
    fi

    if [ -f "scripts/vps-setup.sh" ]; then
        check_pass "Script de setup VPS présent"
    else
        check_warn "Script de setup VPS manquant"
    fi
}

###############################################################################
# 7. Vérification de la structure du projet
###############################################################################
check_structure() {
    log_section "7. Vérification de la Structure du Projet"

    # Vérifier les dossiers essentiels
    [ -d "src/app" ] && check_pass "Dossier src/app présent" || check_fail "Dossier src/app manquant"
    [ -d "src/components" ] && check_pass "Dossier src/components présent" || check_fail "Dossier src/components manquant"
    [ -d "src/lib" ] && check_pass "Dossier src/lib présent" || check_fail "Dossier src/lib manquant"
    [ -d "public" ] && check_pass "Dossier public présent" || check_fail "Dossier public manquant"
    [ -d "prisma" ] && check_pass "Dossier prisma présent" || check_fail "Dossier prisma manquant"

    # Vérifier les fichiers critiques
    [ -f "src/auth.ts" ] && check_pass "Configuration Auth.js présente" || check_warn "Configuration Auth.js manquante"
    [ -f "src/lib/prisma.ts" ] && check_pass "Client Prisma présent" || check_warn "Client Prisma manquant"
}

###############################################################################
# 8. Instructions pour les secrets GitHub
###############################################################################
show_github_secrets() {
    log_section "8. Configuration des Secrets GitHub"

    echo "Pour que le CI/CD fonctionne, configurez ces secrets dans GitHub:"
    echo ""
    echo "Repository Settings → Secrets and variables → Actions → New repository secret"
    echo ""
    echo -e "${YELLOW}Secrets Obligatoires:${NC}"
    echo ""
    echo "  VPS_HOST               → L'adresse IP de votre VPS Hostinger"
    echo "  VPS_USERNAME           → Nom d'utilisateur SSH (ex: root)"
    echo "  VPS_SSH_KEY            → Votre clé SSH privée"
    echo "  DATABASE_URL           → postgresql://user:pass@host:5432/db"
    echo "  AUTH_SECRET            → Généré avec: openssl rand -base64 32"
    echo ""
    echo -e "${YELLOW}Secrets Optionnels:${NC}"
    echo ""
    echo "  VPS_PORT               → Port SSH (par défaut: 22)"
    echo "  VPS_DEPLOY_PATH        → Chemin de déploiement (par défaut: /var/www/synap6ia)"
    echo "  VPS_URL                → https://synap6ia.com"
    echo "  AUTH_URL               → https://synap6ia.com"
    echo "  UPLOADTHING_TOKEN      → Token Uploadthing"
    echo "  EMAIL_SERVER_HOST      → Serveur SMTP"
    echo "  EMAIL_SERVER_USER      → Email SMTP"
    echo "  EMAIL_SERVER_PASSWORD  → Mot de passe SMTP"
    echo ""
    echo -e "${BLUE}Pour générer une clé SSH:${NC}"
    echo "  ssh-keygen -t ed25519 -C 'github-actions-synap6ia'"
    echo ""
}

###############################################################################
# 9. Résumé final
###############################################################################
show_summary() {
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE} RÉSUMÉ DE LA VÉRIFICATION${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo ""
    echo "  Total de vérifications:  $CHECKS_TOTAL"
    echo -e "  ${GREEN}Réussies:${NC}               $CHECKS_PASSED"
    echo -e "  ${RED}Échouées:${NC}                $CHECKS_FAILED"
    echo ""

    if [ $CHECKS_FAILED -eq 0 ]; then
        echo -e "${GREEN}✓ Tous les checks critiques sont passés !${NC}"
        echo ""
        echo -e "${BLUE}Prochaines étapes:${NC}"
        echo "  1. Configurez les secrets GitHub (voir ci-dessus)"
        echo "  2. Configurez le VPS avec: bash scripts/vps-setup.sh"
        echo "  3. Push vers main pour déclencher le déploiement"
        echo ""
        return 0
    else
        echo -e "${RED}✗ Certains checks ont échoué${NC}"
        echo ""
        echo "Corrigez les problèmes ci-dessus avant de déployer"
        echo ""
        return 1
    fi
}

###############################################################################
# Programme principal
###############################################################################
main() {
    # Clear terminal si disponible
    command -v clear &> /dev/null && clear || echo ""
    echo ""
    echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║   Vérification CI/CD - synap6ia.com (Hostinger VPS)       ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""

    check_workflows
    check_docker
    check_prisma
    check_nextjs
    check_blog
    check_documentation
    check_structure
    show_github_secrets
    show_summary

    exit_code=$?
    exit $exit_code
}

# Exécution
main "$@"

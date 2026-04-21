# Moratazana - Système de Gestion d'Inventaire

Application mobile de gestion d'inventaire pour le magasin de peinture Moratazana situé à Fenerive Est, Madagascar.

## 🎯 Fonctionnalités

### Six Écrans Principaux

1. **Connexion** - Authentification sécurisée des utilisateurs
2. **Sélection de boutique** - Choix entre la boutique principale et la deuxième boutique
3. **Tableau de bord** - Vue d'ensemble du stock et accès rapide
4. **Saisie du soir** - Mise à jour quotidienne après fermeture (ventes + arrivages)
5. **Inventaire** - Liste complète avec recherche et filtres
6. **Rapports** - Statistiques et analyses des ventes

### Caractéristiques

✅ Design mobile optimisé (360x800 pixels)  
✅ Interface entièrement en français  
✅ Suivi des stocks en temps réel  
✅ Gestion des ventes quotidiennes  
✅ Gestion des nouveaux arrivages  
✅ Alertes pour stock faible/rupture  
✅ Mode hors ligne avec localStorage  
✅ Deux boutiques indépendantes  
✅ Données persistantes entre les sessions  

## 🎨 Design

- **Couleurs principales**: Bleu foncé (#1e3a8a, #2563eb), Orange (#f97316), Gris clair
- **Style**: Cartes arrondies avec ombres douces
- **Typographie**: Interface claire et professionnelle
- **Devise**: Ariary malgache (Ar)

## 🛠️ Technologies

- **React 18** avec TypeScript
- **React Router** pour la navigation
- **Tailwind CSS v4** pour le styling
- **Context API** pour la gestion d'état
- **localStorage** pour la persistance
- **Lucide React** pour les icônes
- **Sonner** pour les notifications

## 🚀 Démarrage

1. Installer les dépendances:
```bash
pnpm install
```

2. Lancer l'application:
```bash
pnpm run dev
```

## 📱 Navigation

L'application utilise un système de navigation simplifié:
- `/` - Écran de connexion
- `/shop-selection` - Sélection de boutique
- `/dashboard` - Tableau de bord principal
- `/evening-update` - Saisie du soir
- `/inventory` - Inventaire complet
- `/report` - Rapports et statistiques

## 💾 Stockage Local

Les données sont stockées localement dans le navigateur:
- **products**: Liste des produits avec stocks actuels
- **selectedShop**: Boutique sélectionnée (main/second)

## 🔄 Flux d'utilisation

1. **Connexion** → L'utilisateur se connecte avec téléphone/email
2. **Sélection boutique** → Choix de la boutique à gérer
3. **Tableau de bord** → Vue d'ensemble du stock
4. **Saisie du soir** (après fermeture):
   - Saisir les quantités vendues dans la journée
   - Saisir les nouveaux arrivages
   - Enregistrer → Le stock est automatiquement mis à jour
5. **Inventaire** → Consulter tous les produits avec filtres
6. **Rapports** → Analyser les statistiques de vente

## 📦 Produits

L'application gère 8 produits de peinture:
- Peinture Acrylique (Blanc, Bleu, Beige)
- Peinture Murale (Rouge)
- Peinture Extérieure (Vert)
- Peinture Satinée (Jaune)
- Peinture Mate (Gris)
- Peinture Brillante (Noir)

Chaque produit a:
- Nom et image
- Stock actuel
- Prix en Ariary
- Stock minimum pour les alertes

## 🎯 Statuts des Stocks

- **Disponible** (vert) - Stock > minimum
- **Stock faible** (orange) - Stock ≤ minimum mais > 0
- **Rupture** (rouge) - Stock = 0

## 🔧 Outils de développement

- **Navigation Helper** (icône menu en haut à gauche) - Navigation rapide entre les écrans
- **Wireframe Toggle** (bouton en bas à droite) - Basculer entre mode moderne et wireframe

## 📝 Notes

- L'application est conçue pour une utilisation du soir après la fermeture du magasin
- Les données sont persistées localement pour un fonctionnement hors ligne
- Format mobile Android optimisé (360x800px)
- Toute l'interface est en français pour les utilisateurs malgaches

## 🌟 Améliorations futures possibles

- Synchronisation cloud avec Supabase
- Historique des ventes
- Génération de rapports PDF
- Notifications push pour alertes de stock
- Multi-utilisateurs avec rôles
- Gestion des fournisseurs
- Code-barres / QR codes

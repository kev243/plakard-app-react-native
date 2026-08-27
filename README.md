# Plakard

> Application mobile de suivi des dates d’expiration, pensée pour rendre la gestion des produits simple, visuelle et locale.

![Couverture de Plakard](./assets/images/plakard-readme.png)

## À propos

Plakard aide à suivre les produits stockés au réfrigérateur, au congélateur, dans le garde-manger ou ailleurs. L’application met en évidence les prochaines expirations, programme des rappels locaux et rassemble les produits dans une vue calendrier.

Cette première version fonctionne entièrement sur l’appareil : les produits sont enregistrés dans SQLite et les rappels sont programmés avec le système de notifications du téléphone.

## Fonctionnalités

- ajout, consultation, modification et suppression d’un produit ;
- classement par lieu de stockage et catégorie ;
- filtres par emplacement et niveau d’urgence ;
- statistiques dynamiques sur l’état du placard ;
- calendrier des dates d’expiration ;
- rappels locaux configurables ;
- ouverture de la fiche produit depuis une notification ;
- thème clair, sombre ou synchronisé avec le système ;
- états dédiés lorsqu’aucun produit ne correspond à la vue courante.

## Logique métier

### État d’expiration

Le statut d’un produit est calculé à partir du nombre de jours séparant aujourd’hui de sa date d’expiration.

| Situation | Statut | Présentation |
| --- | --- | --- |
| Date passée | Expiré | Rouge |
| 0 ou 1 jour restant | Critique | Rouge |
| 2 à 4 jours restants | À surveiller | Jaune |
| 5 jours ou plus | Frais | Vert |

Pour les échéances longues, l’interface affiche une durée lisible en mois ou en années plutôt qu’un nombre important de jours.

### Dates et alertes

- Une date d’expiration doit obligatoirement être dans le futur.
- Les préférences d’alerte impossibles sont automatiquement indisponibles.
- Les rappels sont programmés à **9 h**, selon la préférence choisie : le jour même, 2 jours avant, 5 jours avant ou une semaine avant.
- Une date de rappel déjà passée n’est jamais programmée.

### Cycle de vie d’une notification

```text
Ajout du produit
  → enregistrement SQLite
  → programmation du rappel
  → sauvegarde du notification_id

Modification
  → annulation de l’ancien rappel
  → mise à jour SQLite
  → programmation du nouveau rappel

Suppression
  → annulation du rappel
  → suppression SQLite
```

L’autorisation n’est demandée que depuis l’onboarding ou les réglages. Si elle est accordée plus tard, Plakard tente de programmer les rappels manquants des produits existants.

## Architecture technique

Le projet sépare les routes, les composants visuels, l’état global, la persistance et les règles métier.

```text
src/
├── app/          Routes Expo Router et navigation
├── screens/      Composition des écrans principaux
├── components/   Cartes et éléments d’interface réutilisables
├── context/      Produits, notifications et thème
├── data/         Modèles, options et correspondances typées
├── database/     Migrations et repository SQLite
├── services/     Planification des notifications
├── theme/        Palettes claire et sombre
└── utils/        Calculs et formatage des dates
```

### Responsabilités principales

| Couche | Rôle |
| --- | --- |
| `ProductsContext` | Synchronise l’état React, SQLite et les notifications lors des opérations CRUD. |
| `NotificationsContext` | Gère l’autorisation, l’onboarding, la reprise de l’application et la navigation depuis un rappel. |
| `ThemeContext` | Résout le thème actif et conserve la préférence dans le stockage clé-valeur SQLite. |
| `product-repository` | Regroupe les requêtes SQL liées aux produits. |
| `migrations` | Versionne le schéma et protège les données existantes lors de son évolution. |
| `product-options` | Centralise les catégories, lieux, alertes, labels et conversions UI ↔ persistance. |

## Persistance locale

La table `products` contient notamment :

| Champ | Utilité |
| --- | --- |
| `name` | Nom du produit, limité à 80 caractères |
| `quantity` | Quantité comprise entre 1 et 999 |
| `storage` | Lieu de stockage normalisé |
| `category` | Catégorie persistante typée |
| `expiration_date` | Date locale au format `YYYY-MM-DD` |
| `alert_preference` | Décalage choisi pour le rappel |
| `notification_id` | Identifiant permettant d’annuler ou remplacer le rappel |
| `created_at` / `updated_at` | Dates techniques de création et modification |

SQLite fonctionne en mode WAL. Le schéma applique des contraintes sur les valeurs importantes et un index accélère le tri par date d’expiration.

## Fiabilité

- Une boundary Expo Router affiche un écran de secours en cas d’échec critique au démarrage.
- Les migrations SQLite normalisent les anciennes données avant d’appliquer les contraintes récentes.
- Les erreurs de programmation d’un rappel ne bloquent pas l’enregistrement d’un produit.
- Les calculs de dates et de notifications sont isolés dans des fonctions pures.
- Les correspondances entre valeurs affichées et persistées proviennent d’une source unique et typée.

## Tests et qualité

Les tests unitaires couvrent actuellement :

- le parsing des dates SQLite ;
- les années bissextiles et changements d’heure ;
- le calcul des jours restants ;
- la date et l’heure des rappels ;
- les changements de mois ;
- le rejet des rappels déjà passés.

Commandes de contrôle utilisées pendant le développement :

```bash
npm test
npm run lint
npx tsc --noEmit
```

## Technologies

- Expo SDK 57 et React Native 0.86 ;
- Expo Router ;
- TypeScript strict ;
- Expo SQLite ;
- Expo Notifications ;
- Jest avec `jest-expo` ;
- Nunito et Expo Vector Icons.

## Périmètre de la V1

Plakard privilégie actuellement une expérience locale, rapide et respectueuse des données personnelles. La synchronisation cloud, le scan de codes-barres, les photos, l’historique de consommation et les statistiques avancées restent hors du périmètre de cette première version.

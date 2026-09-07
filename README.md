# S’adapter ou devenir invisible ?

Landing page du livre blanc de Shelly Sarkar, prête pour un déploiement Vercel.

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Créer un fichier `.env.local` avec :

```dotenv
FORMSPREE_FORM_ID=
```

Pour connecter le formulaire :

1. créer un formulaire dans Formspree ;
2. configurer Shelly comme destinataire de ses notifications ;
3. récupérer le Form ID ;
4. ajouter ce Form ID aux variables d’environnement Vercel.

## Tests

```bash
npm run test
npm run test:coverage
npm run test:e2e
```

## Qualité

```bash
npm run lint
npm run typecheck
```

## Build

```bash
npm run build
```

## Déploiement

Déployer le projet sur Vercel, activer Web Analytics dans le tableau de bord et y
configurer `FORMSPREE_FORM_ID`. Le PDF est servi depuis
`/livre-blanc-shelly-sarkar.pdf`.

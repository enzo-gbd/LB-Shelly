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
RESEND_API_KEY=
RESEND_FROM_EMAIL=
LEAD_RECIPIENT_EMAIL=
```

`RESEND_FROM_EMAIL` doit correspondre à une adresse ou à un domaine correctement
autorisé dans Resend pour la production. Ne préfixer aucune de ces variables avec
`NEXT_PUBLIC_`.

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
configurer les trois variables d’environnement. Le PDF est servi depuis
`/livre-blanc-shelly-sarkar.pdf`.

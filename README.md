# Portfolio — Quentin Taranne Payet

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix). Bilingue : français (`/`) et anglais (`/en`). Pensé pour Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Pages

| FR | EN |
| --- | --- |
| `/` | `/en` |
| `/projets` · `/projets/[slug]` | `/en/projects` · `/en/projects/[slug]` |
| `/parcours` | `/en/journey` |
| `/accessibilite` | `/en/accessibility` |

## Modifier le contenu

Tout le texte est dans `src/content/`, chaque chaîne en `{ fr, en }`.

| Fichier | Contenu |
| --- | --- |
| `projects.ts` | Projets. `featured: true` = affiché sur l'accueil ; `rank` = classement en compétition ; `media` = images et vidéos |
| `profile.ts` | Identité, offres de l'accueil (`offers` : freelance, stage), disponibilité, expérience, engagement, diplôme, stack, repères du parcours |
| `accessibility.ts` | Déclaration d'accessibilité |
| `ui.ts` | Libellés de l'interface, titre et description |

- Un champ absent n'est pas affiché (`result`, `media`, `links`, `period`, `detail`, `points`).
- **Frise** (page Parcours) : calculée depuis `span` (dates « AAAA-MM ») des entrées d'expérience, d'engagement et du diplôme ; la date du jour est celle du déploiement.
- **CV** : page `/cv` (et `/en/cv`) générée depuis ces mêmes données, imprimable sur une page A4. Les PDF téléchargeables (`public/cv/`) sont générés par `npm run build && npm run cv:pdf` : **à relancer après chaque modification du contenu** (le script échoue si le CV dépasse une page). Photo : `public/media/portrait.jpg` (`profile.photo`).
- **Médias** : `public/media/`. Les images passent par `next/image` (AVIF/WebP, `srcset`) ; les vidéos sont muettes, avec bouton lecture / pause.

## Domaine

Production : **https://www.quentin-taranne.dev** (`quentin-taranne.dev` redirige vers `www`). Cette adresse est définie dans `src/lib/seo.ts` (`PRODUCTION_URL`) et sert aux canoniques, hreflang, Open Graph, sitemap et au CV. `NEXT_PUBLIC_SITE_URL` permet de la remplacer ponctuellement.

## Design system

`src/app/globals.css` : tokens « Classement » en `oklch`, thème clair par défaut (sombre au choix du visiteur), échelle typographique, animations.

- Neutres : papier et encre. Trois couleurs de surface : jaune chrono (`signal`), bleu piste (`sky`), orange (`ember`).
- Les couleurs ne sont jamais du texte : ce sont des fonds, toujours avec l'encre fixe `--signal-ink` (contraste ≥ 9,7:1). Elles ne portent jamais seules une information.
- Usage : offres de l'accueil (Freelance jaune, Stage bleu), catégorie des projets (Freelance, EDF, Compétition), repères du parcours (Expérience, Engagement, Diplôme), contact.
- Polices : Big Shoulders (titres, interlignage 1), Geist, Geist Mono.

## Structure

```
src/app/(fr)/, src/app/(en)/   layouts racines (lang) et routes
src/app/sitemap.ts, robots.ts  SEO
src/components/ui/             composants shadcn personnalisés
src/components/home/           sections de l'accueil (réutilisées par les pages)
src/components/views/          vues partagées FR/EN + métadonnées
src/lib/                       routes localisées, SEO (JSON-LD), images Open Graph
```

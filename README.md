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
| `projects.ts` | Projets. `featured: true` = affiché sur l'accueil ; `rank` = podium ; `media` = images et vidéos |
| `profile.ts` | Identité, disponibilité, expérience, engagement, diplôme, stack, repères du parcours |
| `accessibility.ts` | Déclaration d'accessibilité |
| `ui.ts` | Libellés de l'interface, titre et description |

- Un champ absent n'est pas affiché (`result`, `media`, `links`, `period`, `detail`).
- **CV** : page `/cv` (et `/en/cv`) générée depuis ces mêmes données, imprimable sur une page A4 (bouton « Imprimer / PDF »). Photo : `public/media/portrait.jpg` (`profile.photo`).
- **Médias** : `public/media/`. Les images passent par `next/image` (AVIF/WebP, `srcset`) ; les vidéos sont muettes, avec bouton lecture / pause.

## Domaine

URL du site, pour les canoniques, Open Graph et le sitemap : `NEXT_PUBLIC_SITE_URL` si définie, sinon le domaine de production fourni par Vercel (`VERCEL_PROJECT_PRODUCTION_URL`).

## Design system

`src/app/globals.css` : tokens « Classement » en `oklch`, thème sombre automatique, échelle typographique, animations.

- Neutres : papier et encre. Trois couleurs de surface : jaune chrono (`signal`), bleu piste (`sky`), orange (`ember`).
- Les couleurs ne sont jamais du texte : ce sont des fonds, toujours avec l'encre fixe `--signal-ink` (contraste ≥ 9,7:1). Elles ne portent jamais seules une information.
- Usage : podium (1er jaune, 2e bleu, 3e orange), catégorie des projets (Freelance, EDF, Compétition), bandeaux du parcours (Expérience, Engagement, Diplôme), contact.
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

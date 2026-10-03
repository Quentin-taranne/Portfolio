# Portfolio — Quentin Taranne Payet

Next.js (App Router) · TypeScript · Tailwind CSS v4. Site statique, bilingue : `/` (français) et `/en` (anglais).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # pages statiques
```

## Modifier le contenu

Tout le texte est dans `src/content/`, chaque chaîne en `{ fr, en }`.

| Fichier | Contenu |
| --- | --- |
| `src/content/projects.ts` | Projets (ligne + détail dépliable) et liste « Aussi » |
| `src/content/profile.ts` | Identité, disponibilité, expérience, engagement, formation, compétences |
| `src/content/ui.ts` | Libellés de l'interface, titre et description de la page |

- Un champ absent n'est pas affiché : `result`, `media`, `links`, `period`, `detail`.
- **CV** : déposer le PDF dans `public/`, puis `profile.links.cv = "/cv.pdf"`.
- **Médias** : dans `public/media/`. Images en JPEG déjà redimensionnées (pas d'optimiseur, le site est statique). Vidéos en MP4 muet, lues uniquement quand elles sont visibles.

## Structure

```
src/app/(fr)/          layout racine lang="fr" + page /
src/app/(en)/          layout racine lang="en" + page /en
src/app/global-not-found.tsx   404 commune (option expérimentale globalNotFound)
src/components/        HomePage, ProjectList (<details> natif), Gallery, VideoClip
src/content/           contenu bilingue
```

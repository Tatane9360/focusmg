# FocusMG — site

Vite + Tailwind CSS v4 + GSAP (ScrollTrigger) + Lenis.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # site prêt à mettre en ligne dans dist/
```

## Structure

```
*.html                  une page = un fichier (head, titre, sections propres à la page)
src/partials/           morceaux partagés, insérés avec <!-- @include fichier.html -->
  head.html header.html footer.html cta.html process.html lightbox.html
  home/  about/  oeuvres/  legal/
src/styles/
  main.css              point d'entrée (Tailwind + imports)
  theme.css             tokens du style guide → classes Tailwind (bg-ink, text-display…)
  base.css  components/  sections/
src/js/
  main.js               branche les modules
  modules/              un fichier par comportement (menu, intro, reveal, galerie…)
public/assets/img/      images, copiées telles quelles
```

## Animer un élément sans écrire de JS

| Attribut | Effet |
|---|---|
| `data-hero` (+ `.line > span`) | titre de page qui monte à l'arrivée |
| `data-hero-fade` | fondu à l'arrivée |
| `data-reveal` | titre révélé derrière un masque au scroll |
| `data-words` | les mots s'allument au fil du scroll |
| `data-rise` | apparition en cascade |
| `data-curtain` / `data-curtain="left"` | image dévoilée par un rideau |
| `data-parallax="13"` | parallaxe de l'image dans son cadre |
| `data-draw="x"` / `"y"` | ligne qui se trace |
| `data-lightbox` (bouton autour d'une image) | ouverture en grand |
| `data-copy="REF"` | copie la référence |
| `data-yt="ID"` | vidéo YouTube chargée au clic |

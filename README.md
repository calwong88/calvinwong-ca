# calvinwong.ca

Personal website for Calvin Wong — resume, project portfolio, and hobbies.
Published at [calvinwong.ca](https://calvinwong.ca) via GitHub Pages.

## Structure

- Built with Jekyll (GitHub Pages' native build engine) — no local build step required.
- `_layouts/`, `_includes/` — shared page shell, nav, footer, and the `picture.html` image helper (WebP with JPEG fallback).
- `index.html`, `resume.html`, `projects.html`, `hobbies.html`, `hobbies/*.html`, `contact.html` — site pages.
- `assets/` — CSS, images (JPEG + WebP pairs), and the downloadable resume PDF.

## Local preview

This repo has no build dependencies beyond Jekyll itself. To preview locally with Ruby/Jekyll installed:

```
bundle exec jekyll serve
```

## Updating content

Edit the relevant `.html` file and push to `main` — GitHub Pages rebuilds automatically.

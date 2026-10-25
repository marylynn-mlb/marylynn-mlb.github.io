# marylynn-mlb.github.io

Personal site: Home, Projects, POV, and long-form pages. Plain HTML and CSS, built by a small Node script and deployed by GitHub Actions.

## How it works

- `content/pages/*.md` are the long-form pages (POV, sabbatical, AI Use). Edit the text, push, done.
- `content/projects/*.md` are project files in the PROJECT.md format (see `docs/PROJECT.template.md`). They cover projects with no repo of their own, such as writing, and act as a fallback for the rest.
- Each project repo can carry its own `PROJECT.md` and the GitHub topic `brightlight-project`. The build pulls those in (daily, on every push here, or on demand with **Actions > Build and deploy site > Run workflow**). A repo's PROJECT.md wins over the local file with the same slug.
- A project gets its own page only when it has body text. Without body text its card links straight to its demo, or its repo, or nowhere.
- Home and the page layouts live in `scripts/build.mjs`. Styles are in `css/site.css`.

## Local preview

```
npm install
npm run build        # writes dist/
npx http-server dist # then open http://localhost:8080
```

## One-time GitHub setup

1. Create a **public** repo named exactly `marylynn-mlb.github.io` and push this folder to `main`.
2. Settings > Pages > Source: **GitHub Actions**.
3. The first run of the workflow publishes the site at https://marylynn-mlb.github.io/.

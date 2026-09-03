# sabachova.com

Osobní stránka Kateřiny Kočí Šabachové. Statický web, žádný build systém —
čisté HTML/CSS/vanilla JS, hostováno na GitHub Pages.

## Vývoj

```
python3 -m http.server 8000
```

a otevřít http://localhost:8000

## Deploy

Push do `main` → GitHub Pages nasadí automaticky (Settings → Pages →
Source: Deploy from branch `main`). Doména `sabachova.com` je nastavená
přes `CNAME` soubor + DNS záznamy u registrátora.

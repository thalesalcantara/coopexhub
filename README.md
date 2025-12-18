# Kratos System Hub (PWA + APK nativo via Bubblewrap)

Este Hub abre os painéis **sem iframe** (abre direto), então **login volta a funcionar**.

## Publicar no GitHub Pages
1. Suba estes arquivos na raiz do repo:
   - index.html
   - manifest.webmanifest
   - service-worker.js
   - kratos-logo.png
   - icon-192.png
   - icon-512.png
   - icon-512-maskable.png
2. Settings → Pages → Deploy from a branch → main /(root)
3. Teste: https://thalesalcantara.github.io/coopexhub/

## Gerar APK (PowerShell)
```powershell
cd C:\Users\coope\Downloads
mkdir KratosHubAPK
cd KratosHubAPK
bubblewrap init --manifest https://thalesalcantara.github.io/coopexhub/manifest.webmanifest
bubblewrap build
```

O APK final é: `app-release-signed.apk`

## Tirar a “tarja do navegador” (modo Trusted / sem barra)
Precisa publicar `assetlinks.json` no GitHub Pages:

```powershell
bubblewrap fingerprint
```

Crie no repo a pasta `/.well-known/` e coloque lá `assetlinks.json`:
`/.well-known/assetlinks.json`

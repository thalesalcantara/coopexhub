# build_capacitor.ps1
# Coopex Hub -> APK via Capacitor (WebView)
# Vantagem: dá para habilitar cookies de 3ª parte no WebView, ajudando quando os painéis ficam dentro de iframe.
#
# Requisitos:
# - Node.js LTS
# - Java JDK 17
# - Android Studio

npm init -y
npm i @capacitor/core @capacitor/cli
npx cap init "Coopex Hub" "br.com.coopex.hub" --web-dir=.

npm i @capacitor/android
npx cap add android

Write-Host "Abra o projeto Android:"
Write-Host "npx cap open android"
Write-Host ""
Write-Host "Depois, no arquivo android/app/src/main/java/.../MainActivity.java, habilite cookies 3ª parte."

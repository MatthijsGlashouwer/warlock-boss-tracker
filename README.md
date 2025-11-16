# Warlock Boss Tracker - Classic MoP

Simpele boss tracker voor warlock in Classic Mists of Pandaria.

## Features

- 🔐 Eenvoudige login beveiliging
- 📝 Boss-specifieke notities
- 💾 Automatisch opslaan in browser
- 📱 Responsive design

## Gebruik

1. Open `index.html` in je browser
2. Standaard wachtwoord: `warlock123` (wijzig in `app.js` regel 5)
3. Voeg notities toe per boss - deze worden automatisch opgeslagen

## Bosses

- **Jin'rokh the Breaker** - Affliction
- **Horridon** - Destruction

## GitHub Pages Deployment

1. Maak een nieuwe GitHub repository aan
2. Upload alle bestanden naar de repository
3. Ga naar Settings > Pages
4. Selecteer branch `main` en folder `/ (root)`
5. De site is beschikbaar op `https://[jouw-username].github.io/[repository-naam]/`

## Wachtwoord Wijzigen

Bewerk `app.js` regel 5:
```javascript
localStorage.setItem(PASSWORD_KEY, 'jouw-nieuwe-wachtwoord');
```


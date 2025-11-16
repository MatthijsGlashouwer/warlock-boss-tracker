# Warlock Boss Tracker - Classic MoP

Een simpele boss tracker applicatie voor warlock in Classic Mists of Pandaria. Houd per boss bij welke spec en talenten je moet gebruiken, plus belangrijke notities.

## Functies

- Eenvoudige login beveiliging met localStorage
- Boss-specifieke notities per encounter
- Automatisch opslaan van notities in de browser
- Responsive design voor desktop en mobiel gebruik
- Overzichtelijke interface met boss cards

## Technologie

Deze applicatie is gebouwd met:

- Pure HTML/CSS/JavaScript - Geen build tools nodig
- LocalStorage API voor het bewaren van login status en notities
- CSS Grid en Flexbox voor responsive layout
- Client-side authentication

## Lokaal gebruiken

Om de applicatie lokaal te gebruiken:

1. Open `index.html` in je browser
2. Log in met het standaard wachtwoord: `warlock123`
3. Voeg notities toe per boss - deze worden automatisch opgeslagen

## Notities opslaan

De app slaat automatisch je notities op in de browser's localStorage. Dit betekent dat:

- Je notities bewaard blijven, zelfs als je de browser sluit
- Je voortgang wordt onthouden per boss
- Alles wordt lokaal opgeslagen op het apparaat dat je gebruikt

## Bosses

Huidige bosses met standaard notities:

- **Jin'rokh the Breaker** - Affliction
  - Imp voor zelf dispell, LET OP GEEN ANDEREN DISPELLEN

- **Horridon** - Destruction
  - Talent: Kil'jaeden's Cunning dus geen fel flame amigo

## Wachtwoord wijzigen

Om het wachtwoord te wijzigen, bewerk `app.js` regel 5:

```javascript
localStorage.setItem(PASSWORD_KEY, 'jouw-nieuwe-wachtwoord');
```

Of stel het wachtwoord in voordat je voor het eerst inlogt door `app.js` te bewerken en een nieuw wachtwoord in te stellen.

## Deployen naar GitHub Pages

De applicatie is een statische site en kan eenvoudig worden gedeployed naar GitHub Pages:

1. Push de code naar een GitHub repository
2. Ga naar Settings > Pages in je repository
3. Selecteer branch `main` en folder `/ (root)`
4. Klik op Save
5. De site is beschikbaar op `https://[jouw-username].github.io/warlock-boss-tracker/`

## Licentie

Dit project is open-source software.


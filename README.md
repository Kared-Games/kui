# @kared/kui

[![Tests](https://github.com/Kared-Games/kui/actions/workflows/publish.yml/badge.svg)](https://github.com/Kared-Games/kui/actions/workflows/publish.yml)
![Coverage](https://kared-games.github.io/kui/badges/coverage.svg)
[![npm version](https://img.shields.io/npm/v/@kared/kui)](https://www.npmjs.com/package/@kared/kui)

Un design system moderne et flexible pour React, conçu spécifiquement pour les applications de Kared Dev.

Cette librairie offre une collection de composants réutilisables, accessibles et personnalisables pour garantir une cohérence visuelle et fonctionnelle à travers tous nos produits.

## Caractéristiques

- 🎨 **Thème personnalisable** - Adaptez facilement les couleurs, typographies et espacements à votre marque
- ♿ **Accessible** - Conforme aux normes WCAG pour garantir une expérience inclusive
- 📱 **Responsive** - Fonctionne parfaitement sur tous les appareils, du mobile au desktop
- 🚀 **Performant** - Optimisé pour des performances maximales avec un minimum d'impact sur le bundle
- 📦 **Modulaire** - Importez uniquement les composants dont vous avez besoin
- 🏢 **Éprouvé en production** - Utilisé quotidiennement dans les applications de Kared Dev

## Installation

```bash
npm install kui
# or
yarn add kui
```

## Usage

```jsx
import { ThemeProvider } from "kui";

function App() {
  return <ThemeProvider>{/* Your app content */}</ThemeProvider>;
}
```

## License

MIT © [Kared Dev](https://github.com/Kared-Games)

See [LICENSE](./LICENSE) for more information.

## Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/DCAlexandre">
        <img src="https://github.com/DCAlexandre.png" width="100px;" alt="Alexandre DC"/>
        <br />
        <sub><b>Alexandre DC</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/AuroreLeblois">
        <img src="https://github.com/AuroreLeblois.png" width="100px;" alt="Aurore Leblois"/>
        <br />
        <sub><b>Aurore Leblois</b></sub>
      </a>
    </td>
  </tr>
</table>

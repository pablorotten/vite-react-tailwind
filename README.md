# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Add Tailwind
https://tailwindcss.com/docs/installation/using-vite
- `npm install tailwindcss @tailwindcss/vite`
- Add to tailwind configuration
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),],
})
```
- Import in App.css
```css
@import "tailwindcss";

#root {
  max-width: 1280px;
  margin: 0 auto;
```

## Deploy in github pages

Using [gh-pages](https://github.com/tschaub/gh-pages), we will create a parallel branch with the files that Github pages need

**1. Update vite.config.ts**
   
Set base to the repo name: `vite-tailwind`
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/vite-react-tailwind/"
})
```

**2. Install gh-pages**
```sh
npm install gh-pages --save-dev
```

**3. Update package.json**
Update package.json with the following predeploy, deploy scripts and the homepage

```json
{
  "name": "vite-tailwind",
  ...
  "homepage": "https://pablorotten.github.io/vite-tailwind/",
  "scripts": {
    "predeploy" : "npm run build",
    "deploy" : "gh-pages -d dist",
    ...
  },
  ...
}
```

**4. Run Deploy**
Create the branch `gh-pages` with the github page
```sh
npm run deploy
```

**5. Setup github pages in Github**
* Go to https://github.com/pablorotten/vite-react-tailwind/settings/pages
* In Build and deployment select the branch `gh-pages` and save
* Go to https://pablorotten.github.io/vite-react-tailwind/

**6. Update the page**
Everytime you need to update the page, just
```sh
npm run deploy
```



## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

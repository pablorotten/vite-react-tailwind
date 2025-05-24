# React + TypeScript + Vite

How to setup a basic React + Vite + Tailwind in TypeScript using `npm`.

For the React tutorial [go here](Learning-React.md)

## Installation and lauch

Install `vite` with `react` 

```shell
npm create vite@latest vite-tailwind # choose React and Typescript
cd vite-tailwind
volta pin node@20
volta pin npm@bundled
npm install
npm run dev
```

## Add Tailwind
https://tailwindcss.com/docs/installation/using-vite
- `npm install tailwindcss @tailwindcss/vite`
- Add the tailwind configuration. Create a `vite.config.ts` file if doesn't exist
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

# `Who killed Abelardo` geolocated-sound-visualization

Vue visualization using [https://wavesurfer.xyz](wavesurfer.js) and [leafletjs](https://leafletjs.com/).

To embed the deployed version:
```html
<iframe src="https://bellingcat.github.io/who-killed-abelardo/" title="Who killed Abelardo" height="500" width="100%" allow="fullscreen;"></iframe>
```

To test the embedding in local development use:
```html
<iframe src="http://localhost:3000/" title="Who killed Abelardo" height="500" width="100%" allow="fullscreen; clipboard-write; "></iframe>
```

pass `?lang=es` to get the initial text displayed in Spanish.


### Development

```bash
# Project setup
yarn

# Compiles and hot-reloads for development
yarn dev

# Compiles and minifies for production
yarn build
bun run build

# Lints and fixes files
yarn lint
```
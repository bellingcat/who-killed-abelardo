
<h3 align="center">
  Visualization for `Who killed Abelardo` investigation 
</h3>

<h1 align="center">
  <p>
  <a href="https://www.bellingcat.com/news/2023/12/11/the-sound-of-bullets-the-killing-of-colombian-journalist-abelardo-liz/">Read the investigation</a> and <a href="https://www.youtube.com/watch?v=lf5uxI60juk">watch the investigation video<a/>
  </p>
  <p>
  <a href="https://es.bellingcat.com/noticias/america/2023/12/11/el-ruido-de-las-balas-quien-mato-al-periodista-abelardo-liz/">Leer la investigación</a> y <a href="https://www.youtube.com/watch?v=Bf6hbJfGxfo">mira el vídeo de la investigación<a/>
  </p>
</h1>

Visualization available in [english](https://bellingcat.github.io/who-killed-abelardo/) and [español](https://bellingcat.github.io/who-killed-abelardo/)

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

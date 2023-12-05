<template>
  <div id="map"></div>
  <div id="audio"></div>
</template>

<script setup>
import config from "../../config";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ref, watch, onMounted } from 'vue';

import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'
import Spectrogram from 'https://unpkg.com/wavesurfer.js@7/dist/plugins/spectrogram.esm.js'
import TimelinePlugin from 'https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js'


import colormap from "colormap";

let map;
const mapConfig = config.map;
const audios = config.data;

const activeAudio = ref(null)
let wavesurfer;
const markers = {};

watch(activeAudio, (after, before) => {
  console.log(`switching ${before?.audio} to ${after?.audio}`)
  wavesurfer?.destroy();

  wavesurfer = WaveSurfer.create({
    container: '#audio',
    waveColor: '#4F4A85',
    progressColor: '#383351',
    url: activeAudio.value.audio,
    autoplay: true,
    normalize: true,
    height: 100,
    plugins: [
      // https://wavesurfer.xyz/example/timeline/
      TimelinePlugin.create({
        height: 20,
        timeInterval: 0.1,
        primaryLabelInterval: 0.25,
        style: {
          fontSize: '12px',
          color: '#6A3274',
        },
      })
    ],
  })

  // Initialize the Spectrogram plugin
  wavesurfer.registerPlugin(
    Spectrogram.create({
      labels: true,
      height: 100,
      splitChannels: false, //TODO: check none has 2 channels
      // https://www.npmjs.com/package/colormap
      colorMap: colormap({
        colormap: 'density',
        nshades: 256,
        format: 'float'
      })
    }),
  )

  wavesurfer.on('ready', () => {
    wavesurfer.play()
  })
  wavesurfer.on('interaction', () => {
    wavesurfer.playPause()
  })
  wavesurfer.on('play', () => {
    markers[activeAudio.value.id].setIcon(newIcon("pause"));
  })
  wavesurfer.on('pause', () => {
    markers[activeAudio.value.id].setIcon(newIcon("play"));
  })

})

const newIcon = (shape, size) => {
  //https://fonts.google.com/icons?selected=Material+Symbols+Outlined:pause:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=pause
  size = size || 40;
  const svg = {
    "play": `<path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/>`,
    "pause": `<path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/>`,

  }[shape || "play"];

  return L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" height="${size}" fill="orange" stroke="blue" stroke-width="0" viewBox="0 -960 960 960" width="${size}">${svg}</svg>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    className: "leaflet-div-icon2"
  });
}

onMounted(() => {
  initMap();

  const icons = {
    default: newIcon(),
    selected: newIcon(48)
  }

  audios.forEach(audio => {
    console.log(audio)
    const marker = new L.marker([audio.lat, audio.lon], { icon: newIcon("play") })
      .bindTooltip(audio.label, {
        permanent: true,
        opacity: 0.5,
        direction: audio.labelDirection || "top",
      });
    let group = new L.FeatureGroup(); // used for fitBounds
    group.addLayer(marker).addTo(map);
    marker.on("click", () => {
      console.log(`Marker clicked: ${JSON.stringify(audio)}`)
      if (activeAudio.value?.id == audio.id) {
        wavesurfer?.playPause();
      } else {
        activeAudio.value = audio;
      }
    })
    markers[audio.id] = marker;
  })

})
function initMap() {
  // create a map in the "map" div, set the view to a given place and zoom
  map = L.map("map", { ...mapConfig, zoomControl: false }).setView([mapConfig.anchor.lat, mapConfig.anchor.lon], mapConfig.startZoom);

  let tileUrl = mapConfig.tiles[mapConfig.startTile](mapConfig.mapboxToken);
  L.tileLayer(tileUrl, {
    attribution:
      // tileUrl.includes("openstreetmap") ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' :
      "&copy;<a href='https://www.mapbox.com/about/maps/'>Mapbox</a> <small><strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>improve this map</a></strong></small>"
    // https://wavesurfer.xyz/
  }).addTo(map);
}

</script>

<style scoped>
#map {
  height: calc(100% - 220px);
  width: 100%;
}

#audio {
  height: 220px;
  width: 100%;
}
</style>

<template>
  <div id="map"></div>
  <div id="details">
    <div v-if="activeAudio" class="text-center">
      [<strong>{{ activeAudio?.id }}</strong>]
      {{ activeAudio?.description }} :
      <a :href="`http://www.google.com/maps/place/${activeAudio.lat},${activeAudio.lon}`">{{ activeAudio.lat }},{{
        activeAudio.lon }}</a>
      <span style="float:right">{{ currentTime }}</span>

    </div>
  </div>
  <div id="audio">
    <v-container class="fill-height">
      <v-row>
        <v-col>
          <h3 class="text-center">
            Please select a marker on the map to hear the audio from that location.
          </h3>
        </v-col>
      </v-row>
    </v-container>

  </div>
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
const colors = config.colors;

const activeAudio = ref(null)
const currentTime = ref(0)
let wavesurfer;
const markers = {};

watch(activeAudio, (after, before) => {
  console.log(`switching ${before?.audio} to ${after?.audio}`)
  wavesurfer?.destroy();
  if (!wavesurfer) {
    document.querySelector("#audio").innerHTML = "";
  }

  wavesurfer = WaveSurfer.create({
    container: '#audio',
    waveColor: colors.waveColor,
    progressColor: colors.progressColor,
    cursorColor: colors.cursorColor,
    cursorWidth: 2,
    url: activeAudio.value.audio,
    autoplay: true,
    normalize: true,
    height: 50,
    audioRate: 1,
    plugins: [
      // https://wavesurfer.xyz/example/timeline/
      TimelinePlugin.create({
        height: 16,
        timeInterval: 0.1,
        primaryLabelInterval: 0.25,
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          color: colors.timelineFontColor,
        },
      })
    ],
  })

  // Initialize the Spectrogram plugin
  wavesurfer.registerPlugin(
    Spectrogram.create({
      labels: true,
      height: 150,
      splitChannels: false,
      // https://www.npmjs.com/package/colormap
      colorMap: colormap({
        // cool, density, yignbu, salinity, temperature, velocity-blue
        colormap: 'cool',
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
    Object.values(markers).forEach(marker => marker.setIcon(newIcon("play")));
    markers[activeAudio.value.id].setIcon(newIcon("pause"));
  })
  wavesurfer.on('pause', () => {
    markers[activeAudio.value.id].setIcon(newIcon("play"));
  })
  wavesurfer.on('timeupdate', (time) => {
    currentTime.value = `${time.toFixed(3)}s`;
  });

})

const newIcon = (shape, size) => {
  //https://fonts.google.com/icons?selected=Material+Symbols+Outlined:pause:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=pause
  size = size || 35;
  const svg = {
    "play": `<path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/>`,
    "pause": `<path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/>`,

  }[shape || "play"];

  return L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" height="${size}" fill="${colors.iconColor}" stroke="blue" stroke-width="0" viewBox="0 -960 960 960" width="${size}">${svg}</svg>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    className: "leaflet-div-icon2"
  });
}

onMounted(() => {
  initMap();

  audios.forEach(audio => {
    console.log(audio)
    const tootlip = L.tooltip({
      content: audio.label,
      permanent: true,
      opacity: 0.5,
      direction: audio.labelDirection || "top",
      interactive: true,
    })
    const marker = new L.marker([audio.lat, audio.lon], { icon: newIcon("play") })
      .bindTooltip(tootlip);
    let group = new L.FeatureGroup();
    group.addLayer(marker).addTo(map);
    const clickedAudio = () => {
      // console.log(`Clicked: ${JSON.stringify(audio)}`)
      if (activeAudio.value?.id == audio.id) {
        wavesurfer?.playPause();
      } else {
        activeAudio.value = audio;
      }
    }
    tootlip.on("click", clickedAudio);
    marker.on("click", clickedAudio);
    markers[audio.id] = marker;
  })
  // activeAudio.value = audios[0]; // development

})
function initMap() {
  // create a map in the "map" div, set the view to a given place and zoom
  map = L.map("map", { ...mapConfig, zoomControl: false }).setView([mapConfig.anchor.lat, mapConfig.anchor.lon], mapConfig.startZoom);

  let tileUrl = mapConfig.tiles[mapConfig.startTile](mapConfig.mapboxToken);
  L.tileLayer(tileUrl, {
    attribution:
      // tileUrl.includes("openstreetmap") ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' :
      "&copy;<a href='https://www.mapbox.com/about/maps/'>Mapbox</a> <small><strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>improve this map</a></strong></small>",
    maxNativeZoom: 18,
    maxZoom: 22
  }).addTo(map);
}

</script>

<style scoped>
/* html, body {
  overflow: auto !important;
} */

#map {
  /* 216 from the full width content, up to  */
  height: calc(100% - 240px);
  width: 100%;
}

@media (max-width: 890px) {
  #map {
    height: calc(100% - 264px);
  }
}

@media (max-width: 465px) {
  #map {
    height: calc(100% - 288px);
  }
}


#audio {
  /* height: 220px; */
  width: 100%;
}

/* make anchors blue but not the default one material design blue */
a {
  color: #0288D1;
}

a:hover {
  color: #01579B;
}</style>

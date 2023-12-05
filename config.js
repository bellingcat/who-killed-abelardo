const config = {
  map: {
    anchor: { lat: 3.1680492399285916, lon: -76.24325716421255 },
    // maxZoom: 20,
    // maxNativeZoom: 20,
    minZoom: 4,
    startZoom: 15,
    wheelPxPerZoomLevel: 120,
    zoomSnap: 0.50,
    mapboxToken: "pk.eyJ1IjoiYmVsbGluZ2NhdC1tYXBib3giLCJhIjoiY2tleW0wbWliMDA1cTJ5bzdkbTRraHgwZSJ9.GJQkjPzj8554VhR5SPsfJg",
    startTile: 'satellite',
    tiles: {
      osm: () => `https://tile.openstreetmap.org/{z}/{x}/{y}.png`,
      satellite: (token) => `https://api.mapbox.com/styles/v1/bellingcat-mapbox/clpsadwuy018v01o95zsp9sfo/wmts?access_token=${token}`,
      custom: (token) => `https://api.mapbox.com/styles/v1/bellingcat-mapbox/cl0qnou2y003m15s8ieuyhgsy/tiles/256/{z}/{x}/{y}@2x?access_token=${token}`,
    },
  },

  colors:{
    iconColor: "#93FF00",
    waveColor: '#8C9EFF',
    progressColor: '#304FFE',
    timelineFontColor: '#558B2F'
  },
  data: [
    // 04_02_01 (3.169865,-76.244035)
    // 04_02_02 (3.170281,-76.244906)
    // 04_02_03 (3.170245,-76.244941)
    // 04_01_04 (3.170550°,-76.244705)
    // 04_01_06 (3.168388,-76.244574)
    // 04_01_07 (3.164874,-76.239899)
    {
      id: "04_02_01",
      label: "04_02_01",
      lat: 3.169865,
      lon: -76.244035,
      audio: "04_02_01_14s.wav",
      drive: "https://drive.google.com/file/d/1GVmWVu5Yn7tzzsKPHQ62qjh545C-DKO0/view",
      splitChannels: true,
      description: "Clear corresponding shockwave-muzzle blast pairs"
    },
    {
      id: "04_02_02",
      label: "04_02_02",
      labelDirection: "top",
      lat: 3.170281,
      lon: -76.244906,
      audio: "04_02_02_1s.wav",
      drive: "https://drive.google.com/file/d/1vch7FloYGuLCyeWv7cLO_WW4M5cwa3wU/view",
      description: "Clear corresponding shockwave-muzzle blast pairs"
    },
    {
      id: "04_02_03",
      label: "04_02_03",
      labelDirection: "bottom",
      lat: 3.170245,
      lon: -76.244941,
      audio: "04_02_03_0s.wav",
      drive: "https://drive.google.com/file/d/1aX7hkdO4w4nKXqarbkCoeaaHIyUOAIve/view",
      description: "Clear corresponding shockwave-muzzle blast pairs"
    },
    {
      id: "04_01_04",
      label: "04_01_04",
      lat: 3.170550,
      lon: -76.244705,
      audio: "04_01_04_52s.wav",
      drive: "https://drive.google.com/file/d/1wAPJdDo1WmuPEClEEHDhm5-CuNyAfhjt/view",
      description: "Clear corresponding shockwave-muzzle blast pairs"
    },
    {
      id: "04_01_06",
      label: "04_01_06",
      lat: 3.168388,
      lon: -76.244574,
      audio: "04_01_06_31s.wav",
      drive: "https://drive.google.com/file/d/1CUSh91sVGhxstWcro_XKcubG-TTVDnR-/view",
      description: "Clear distant muzzle blasts only. Shockwaves seem to be absent on available data"
    },
    {
      id: "04_01_07",
      label: "04_01_07",
      lat: 3.164874,
      lon: -76.239899,
      audio: "04_01_07_25s.wav",
      drive: "https://drive.google.com/file/d/1e0xcJPW4FxNPepaeaWcIVUTA2_lDGU1o/view",
      description: "Clear distant muzzle blasts only. Shockwaves seem to be absent on available data"
    }
  ]
};

export default config;

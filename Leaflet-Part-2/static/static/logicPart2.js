// Create a Leaflet map
const myMap = L.map('map', {
    center: [0, 0], // Set the initial center coordinates
    zoom: 2, // Set the initial zoom level
  });
  
  // Define different tile layer providers
  const satelliteTileLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; Google Maps',
  });
  
  const grayscaleTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    maxZoom: 19,
  });
  
  const outdoorsTileLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="https://www.opentopomap.org/about">OpenTopoMap</a> contributors',
  });
  
  // Create an object to hold the different base maps
  const baseMaps = {
    'Satellite': satelliteTileLayer,
    'Grayscale': grayscaleTileLayer,
    'Outdoors': outdoorsTileLayer,
  };
  
  // Add one of the base maps as the default layer
  satelliteTileLayer.addTo(myMap);
  
  // Use the URL of the earthquake JSON dataset
  const earthquakeURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
  
  // Use D3.js to fetch earthquake data from the API
d3.json(earthquakeURL).then(data => {
  // Loop through the earthquake data and create markers
  data.features.forEach(feature => {
    // Extract relevant information (longitude, latitude, magnitude, depth)
    const lon = feature.geometry.coordinates[0];
    const lat = feature.geometry.coordinates[1];
    const magnitude = feature.properties.mag;
    const depth = feature.geometry.coordinates[2];
  
        // Define marker size based on magnitude
        const markerSize = magnitude * 5; // Adjust the factor for the desired marker size
  
        // Define marker color based on depth
        const markerColor = getColorBasedOnDepth(depth);
  
        // Create a marker with appropriate size and color
        const marker = L.circleMarker([lat, lon], {
          radius: markerSize,
          fillColor: markerColor,
          fillOpacity: 0.7,
          color: 'black',
          weight: 1,
        });
  
        // Add a popup with additional information
        marker.bindPopup(`<strong>Magnitude:</strong> ${magnitude}<br><strong>Depth:</strong> ${depth} km`);
  
        // Add the marker to the earthquake Layer Group
        marker.addTo(earthquakeLayerGroup);
      });
    });
  
  // Use the URL of the tectonic plates GeoJSON dataset
  const tectonicPlatesURL = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json';
  
  // Fetch tectonic plates data and create a GeoJSON layer
  fetch(tectonicPlatesURL)
    .then(response => response.json())
    .then(data => {
      // Create a GeoJSON layer for tectonic plates
      const tectonicPlatesLayer = L.geoJSON(data, {
        style: {
          color: 'orange', // Customize the style of the tectonic plates layer
          weight: 2,
        },
      });
  
      // Add the tectonic plates layer to the map
      tectonicPlatesLayer.addTo(tectonicPlatesLayerGroup);
    });
  
  // Create Layer Groups for earthquakes and tectonic plates
  const earthquakeLayerGroup = L.layerGroup();
  const tectonicPlatesLayerGroup = L.layerGroup();
  
  // Define an overlay object to hold the Layer Groups
  const overlays = {
    'Earthquakes': earthquakeLayerGroup,
    'Tectonic Plates': tectonicPlatesLayerGroup,
  };
  
  // Add the layer control with separate Earthquakes and Tectonic Plates layers
  L.control.layers(baseMaps, overlays).addTo(myMap);
  
  // Function to define marker color based on depth
  function getColorBasedOnDepth(depth) {
    if (depth >= -10 && depth <= 10) {
      return 'lime'; // Depth between -10 and 10 (inclusive) is green
    } else if (depth > 10 && depth <= 30) {
      return 'greenyellow'; // Depth between 10 and 30 (inclusive) is yellow
    } else if (depth > 30 && depth <= 50) {
      return 'gold'; // Depth between 30 and 50 (inclusive) is light orange
    } else if (depth > 50 && depth <= 70) {
      return 'orange'; // Depth between 50 and 70 (inclusive) is orange
    } else if (depth > 70 && depth <= 90) {
      return 'coral'; // Depth between 70 and 90 (inclusive) is dark orange
    } else {
      return 'red'; // Depth greater than 90 is red
    }
  }
  
  // Function to create a legend
  function createLegend() {
    const legend = L.control({ position: 'bottomright' });
  
    legend.onAdd = function (map) {
      const div = L.DomUtil.create('div', 'info legend');
      const depths = [-10, 10, 30, 50, 70, 90];
      const colors = ['lime', 'greenyellow', 'gold', 'orange', 'coral', 'red'];
      const labels = [];
  
      for (let i = 0; i < depths.length; i++) {
        const from = depths[i];
        const to = depths[i + 1];
  
        labels.push(
          '<div class="legend-item">' +
          '<div class="color-box" style="background-color:' + colors[i] + '"></div>' +
          '<div class="legend-text">' + from + (to ? '&ndash;' + to : '+') + '</div>' +
          '</div>'
        );
  
        if (i < depths.length - 1) {
          // Add a line break between legend items (except for the last one)
          labels.push('<br>');
        }
      }
  
      div.innerHTML = labels.join('');
  
      return div;
    };
  
    return legend;
  }
  
  // Call the createLegend() function and add it to the map
  createLegend().addTo(myMap);
  
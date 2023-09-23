// Create a Leaflet map
const myMap = L.map('map', {
  center: [0, 0], // Set the initial center coordinates
  zoom: 2, // Set the initial zoom level
});

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use the URL of the earthquake JSON dataset
const earthquakeURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Fetch earthquake data and create markers
fetch(earthquakeURL)
  .then(response => response.json())
  .then(data => {
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
      }).addTo(myMap);

      // Add a popup with additional information
      marker.bindPopup(`<strong>Magnitude:</strong> ${magnitude}<br><strong>Depth:</strong> ${depth} km`);
    });
  });

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

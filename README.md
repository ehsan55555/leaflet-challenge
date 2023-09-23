# Earthquake Visualization

This project consists of two parts, each focusing on visualizing earthquake data on an interactive map using Leaflet and D3.js. Part 1 and Part 2 are organized into separate folders as follows:

## Part 1: Leaflet-Part-1

### Folder Structure:

- **Leaflet-Part-1/**
  - `index.html` - The HTML file for Part 1.
  - **static/**
    - **css/**
      - `style.css` - The CSS file for styling Part 1.
    - **js/**
      - `logic.js` - The JavaScript file for handling Part 1 logic.

### Part 1 Description:

In Part 1 of the project, the following tasks were accomplished:

- Created an interactive map using Leaflet.
- Loaded a TileLayer without errors.
- Connected to a geojson API using D3 without errors.
- Created markers with sizes corresponding to earthquake magnitudes.
- Implemented a legend displaying earthquake depths and their corresponding colors.
- Ensured that data points scaled with magnitude level.
- Adjusted data point colors based on depth level.
- Added tooltips to each data point, displaying the magnitude, location, and depth.
- Ensured that all data points were correctly positioned on the map.

## Part 2: Leaflet-Part-2

### Folder Structure:

- **Leaflet-Part-2/**
  - `indexPart2.html` - The HTML file for Part 2.
  - **static/**
    - **css/**
      - `style.css` - The CSS file for styling Part 2.
    - **js/**
      - `logicPart2.js` - The JavaScript file for handling Part 2 logic.

### Part 2 Description:

In Part 2 of the project, the following tasks were accomplished:

- Plotted the tectonic plates dataset on the map alongside the earthquakes.
- Added additional base maps to choose from, including satellite, grayscale, and outdoors.
- Organized each dataset into separate overlays that can be turned on and off independently.
- Added a single layer control to the map, allowing users to toggle between base maps, earthquakes, and tectonic plates.

## Getting Started

To run the visualization for Part 1, open `Leaflet-Part-1/index.html` in a web browser. Similarly, to run the visualization for Part 2, open `Leaflet-Part-2/indexPart2.html`.

Make sure you have an active internet connection as the project fetches earthquake and tectonic plate data from online sources.

## Credits

This project uses Leaflet, D3.js, and other open-source libraries. The earthquake data is sourced from the USGS Earthquake Hazards Program, and tectonic plate data is sourced from the fraxen GitHub repository.

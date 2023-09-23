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

#### Requirements (Part 1):

- TileLayer loads without error (20 points)
- Connects to geojson API using D3 without error (20 points)
- Markers with size corresponding to earthquake magnitude (10 points)
- A legend showing the depth and their corresponding color (10 points)
- Data points scale with magnitude level (10 points)
- Data points colors change with depth level (10 points)
- Each point has a tooltip with the Magnitude, the location, and depth (10 points)
- All data points load in the correct locations (10 points)

## Part 2: Leaflet-Part-2

### Folder Structure:

- **Leaflet-Part-2/**
  - `indexPart2.html` - The HTML file for Part 2.
  - **static/**
    - **css/**
      - `style.css` - The CSS file for styling Part 2.
    - **js/**
      - `logicPart2.js` - The JavaScript file for handling Part 2 logic.

#### Additional Requirements (Part 2):

- Plot the tectonic plates dataset on the map in addition to the earthquakes.
- Add other base maps to choose from.
- Put each dataset into separate overlays that can be turned on and off independently.
- Add layer controls to your map.

## Getting Started

To run the visualization for Part 1, open `Leaflet-Part-1/index.html` in a web browser. Similarly, to run the visualization for Part 2, open `Leaflet-Part-2/indexPart2.html`.

Make sure you have an active internet connection as the project fetches earthquake and tectonic plate data from online sources.

## Credits

This project uses Leaflet, D3.js, and other open-source libraries. The earthquake data is sourced from the USGS Earthquake Hazards Program, and tectonic plate data is sourced from the fraxen GitHub repository.

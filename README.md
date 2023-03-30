# D3.js GDP Bar Chart

This is a project that visualizes GDP data using a bar chart. It is a freeCodeCamp Data Visualization project and part of the [Data Visualization certification](https://www.freecodecamp.org/learn/data-visualization/).
<br />
 The chart displays each year's GDP as a blue bar. The height of each bar represents the GDP amount in billions of dollars.

## Prerequisites

This project requires d3.js library. You can download and include the library in your project by adding the following script tag to your HTML file:

```<script src="https://d3js.org/d3.v5.min.js"></script>```

## Code structure

The code is divided into several functions that perform specific tasks:

• `generateScale()`: generates the scales used to determine the position and height of the bars on the chart.
<br />
• `generateBars()`: generates the bars on the chart and attaches mouseover and mouseout events to them to display a tooltip when hovered over.
<br />
• `generateAxes()`: generates the x and y axes for the chart.
<br />
• `setupChart()`: sets the width and height of the chart.
<br />
• `req.onload()`: a callback function that is called when the JSON data is loaded. It sets up the chart, generates the scales, bars, and axes, and displays the chart.

## Data source

The data for this chart is obtained from [freeCodeCamp's GDP data repository](https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json). 
<br />
The data is in JSON format and is loaded using an XML HTTP request (XHR) in the `req.onload()` function.
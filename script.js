const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const req = new XMLHttpRequest();

let data;
let values = [];

const width = 800;
const height = 600;
const padding = 40;

let yBarsScale; // Used to determine the height of the bars
let xBarsScale; // Used to determine where the bars are placed horizontally on the canvas
let xAxisScale; // Used to create the x-asis at the bottom with the dates
let yAxisScale; // Used to create the y-axis along to the left

let tooltip = d3
  .select("body")
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", 0);

const svg = d3.select("svg");

let generateScale = () => {
  yBarsScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(values, (item) => {
        return item[1];
      }),
    ])
    .range([0, height - 2 * padding]);

  xBarsScale = d3
    .scaleLinear()
    .domain([0, values.length - 1])
    .range([padding, width - padding]);

  let datesArray = values.map((item) => {
    return new Date(item[0]);
  });

  xAxisScale = d3
    .scaleTime()
    .domain([d3.min(datesArray), d3.max(datesArray)])
    .range([padding, width - padding]);

  yAxisScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(values, (item) => {
        return item[1];
      }),
    ])
    .range([height - padding, padding]);
};

let generateBars = () => {
  svg
    .selectAll("rect")
    .data(values)
    .enter()
    .append("rect")
    .attr("fill", "blue")
    .attr("class", "bar")
    .attr("width", (width - 2 * padding) / values.length)
    .attr("data-date", (item) => {
      return item[0];
    })
    .attr("data-gdp", (item) => {
      return item[1];
    })
    .attr("height", (item) => {
      return yBarsScale(item[1]);
    })
    .attr("x", (item, index) => {
      return xBarsScale(index);
    })
    .attr("y", (item) => {
      return height - padding - yBarsScale(item[1]);
    })

    .on("mouseover", function (event, item) {
      d3.select(this).classed("hover", true);

      tooltip.transition().duration(100).style("opacity", 0.9);
      // .style('visibility', 'visible')
      tooltip
        .html(item[0] + "<br/>" + "$" + item[1] + " billions")
        .attr("data-date", item[0])
        .style("left", event.pageX + 20 + "px")
        .style("top", event.pageY - 28 + "px");
    })

    .on("mouseout", function () {
      d3.select(this).classed("hover", false);
      tooltip.transition().duration(200).style("opacity", 0);
    });
};

let generateAxes = () => {
  let xAxis = d3.axisBottom(xAxisScale);
  let yAxis = d3.axisLeft(yAxisScale);

  svg
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", "translate(0, " + (height - padding) + ")");

  svg
    .append("g")
    .call(yAxis)
    .attr("id", "y-axis")
    .attr("transform", "translate(" + padding + ", 0)");
};

let setupChart = () => {
  svg.attr("width", width);
  svg.attr("height", height);
};

req.open("GET", url, true);
req.onload = () => {
  data = JSON.parse(req.responseText);
  values = data.data;
  console.log(values);
  setupChart();
  generateScale();
  generateBars();
  generateAxes();
};
req.send();

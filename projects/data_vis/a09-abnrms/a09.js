//
// a09.js
// Hamlet Taraz <hamlet@arizona.edu>
// My implementation of CSC 444 Fall 2025 Assignment 09. This code loads
// four plots of two outlined and two filled contours of the Hurricane
// Isabel dataset.
//
// Template for CSC444 Assignment 09, Fall 2024 (?!?) was created by
// Joshua A. Levine <josh@arizona.edu>
//



////////////////////////////////////////////////////////////////////////
// Global variables, preliminaries, and helper functions

let svgSize = 490;
let bands = 49;

let xScale = d3.scaleLinear().domain([0, bands]).  range([0, svgSize]);
let yScale = d3.scaleLinear().domain([-1,bands-1]).range([svgSize, 0]);

function createSvg(sel)
{
  return sel
    .append("svg")
    .attr("width", svgSize)
    .attr("height", svgSize);
}

function createGroups(data) {
  return function(sel) {
    return sel
      .append("g")
      .selectAll("rect")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function(d) {
        return "translate(" + xScale(d.Col) + "," + yScale(d.Row) + ")";
      });
  };
}

d3.selection.prototype.callReturn = function(callable)
{
  return callable(this);
};

// This function returns the pair [min/max] for a cell d.
function gridExtent(d) {
  return [Math.min(d.NW, d.NE, d.SW, d.SE),
          Math.max(d.NW, d.NE, d.SW, d.SE)];
}



////////////////////////////////////////////////////////////////////////
// Functions for isocontouring

// Given a cell d and an isovalude value, this returns a 4-bit polarity
// signature in result.case as an integer [0,15].  Any bit that is 1
// indicates that the associate cell corner is on or above the contour.
function polarity(d, value) {
  let result = {
    NW: d.NW < value ? 0 : 1,
    NE: d.NE < value ? 0 : 1,
    SW: d.SW < value ? 0 : 1,
    SE: d.SE < value ? 0 : 1
  };
  result.case = result.NW + result.NE * 2 + result.SW * 4 + result.SE * 8;
  return result;
}

// currentContour is a global variable which stores the value
// of the contour we are currently extracting
var currentContour;

function includesOutlineContour(d) {
  let extent = gridExtent(d);
  return currentContour >= extent[0] && currentContour <= extent[1];
}

// IMPLEMENTED BY HAMLET TARAZ
// determines when a filled contour should be drawn in a square by comparing it to the current contour value
function includesFilledContour(d) {
  return currentContour >= gridExtent(d)[0];
}

// IMPLEMENTED BY HAMLET TARAZ
// generates one cell's outline contour. Called iff a contour should be drawn, and the position
// of the contour will be interpolated through the marching squares algorithm.
function generateOutlineContour(d) {
  // scales which linearly interpolate the positions of the nodes
  let wScale = d3.scaleLinear()
                 .domain([d.SW, d.NW])
                 .range([0, 10])
  let eScale = d3.scaleLinear()
                 .domain([d.SE, d.NE])
                 .range([0, 10])
  let nScale = d3.scaleLinear()
                 .domain([d.NW, d.NE])
                 .range([0, 10])
  let sScale = d3.scaleLinear()
                 .domain([d.SW, d.SE])
                 .range([0, 10])

  // marching squares cases. Cases 0 and 15 (all corners the same) are not included.
  switch (polarity(d, currentContour).case) {
    case 1:
    case 14:
      return `M 0 ${wScale(currentContour)} L ${nScale(currentContour)} 10`
    case 2:
    case 13:
      return `M ${nScale(currentContour)} 10 L 10 ${eScale(currentContour)}`
    case 3:
    case 12:
      return `M 0 ${wScale(currentContour)} L 10 ${eScale(currentContour)}`
    case 4:
    case 11:
      return `M 0 ${wScale(currentContour)} L ${sScale(currentContour)} 0`
    case 5:
    case 10:
      return `M ${sScale(currentContour)} 0 L ${nScale(currentContour)} 10`
    case 6:
    case 9:
      return `M 0 ${wScale(currentContour)} L ${sScale(currentContour)} 0 M ${nScale(currentContour)} 10 L 10 ${eScale(currentContour)}`
    case 7:
    case 8:
      return `M ${sScale(currentContour)} 0 L 10 ${eScale(currentContour)}`
    default:
      return ""
  }
}

// IMPLEMENTED BY HAMLET TARAZ
// generates one cell's filled contour. Called iff a filled contour should be drawn, and the position
// of the contour will be interpolated through the marching squares algorithm.
function generateFilledContour(d) {
  // scales which linearly interpolate the positions of the nodes
  let wScale = d3.scaleLinear()
                 .domain([d.SW, d.NW])
                 .range([0, 10])
  let eScale = d3.scaleLinear()
                 .domain([d.SE, d.NE])
                 .range([0, 10])
  let nScale = d3.scaleLinear()
                 .domain([d.NW, d.NE])
                 .range([0, 10])
  let sScale = d3.scaleLinear()
                 .domain([d.SW, d.SE])
                 .range([0, 10])

  // marching squares cases. Case 15 (all corners above the current contour value) are not included.
  switch (polarity(d, currentContour).case) {
    case 0:
      return "M 0 0 L 10 0 L 10 10 L 0 10"
    case 1:
      return `M 0 0 L 10 0 L 10 10 L ${nScale(currentContour)} 10 L 0 ${wScale(currentContour)}`
    case 14:
      return `M 0 10 L 0 ${wScale(currentContour)} L ${nScale(currentContour)} 10`
    case 2:
      return `M 10 0 L 0 0 L 0 10 L ${nScale(currentContour)} 10 L 10 ${eScale(currentContour)}`
    case 13:
      return `M 10 10 L ${nScale(currentContour)} 10 L 10 ${eScale(currentContour)}`
    case 3:
      return `M 10 0 L 0 0 L 0 ${wScale(currentContour)} L 10 ${eScale(currentContour)}`
    case 12:
      return `M 10 10 L 0 10 L 0 ${wScale(currentContour)} L 10 ${eScale(currentContour)}`
    case 4:
      return `M 10 0 L 10 10 L 0 10 L 0 ${wScale(currentContour)} L ${sScale(currentContour)} 0`
    case 11:
      return `M 0 0 L 0 ${wScale(currentContour)} L ${sScale(currentContour)} 0`
    case 5:
      return `M 10 10 L 10 0 L ${sScale(currentContour)} 0 L ${nScale(currentContour)} 10`
    case 10:
      return `M 0 10 L 0 0 L ${sScale(currentContour)} 0 L ${nScale(currentContour)} 10`
    case 6:
      return `M 0 10 L 0 ${wScale(currentContour)} L ${sScale(currentContour)} 0 L 10 0 L 10 ${eScale(currentContour)} L ${nScale(currentContour)} 10`
    case 9:
      return `M 0 0 L 0 ${wScale(currentContour)} L ${sScale(currentContour)} 0 M 10 10 L ${nScale(currentContour)} 10 L 10 ${eScale(currentContour)}`
    case 7:
      return `M 10 0 L ${sScale(currentContour)} 0 L 10 ${eScale(currentContour)}`
    case 8:
      return `M 10 10 L 0 10 L 0 0 L ${sScale(currentContour)} 0 L 10 ${eScale(currentContour)}`
    default:
      return ""
  }
}



////////////////////////////////////////////////////////////////////////
// Visual Encoding portion that handles the d3 aspects


// d3 function to compute isocontours for all cells that span given a
// range of values, [minValue,maxValues], this function produces a set
// of size "steps" isocontours to be added to the selection "sel"
function createOutlinePlot(minValue, maxValue, steps, sel)
{
  let contourScale = d3.scaleLinear().domain([1, steps]).range([minValue, maxValue]);
  for (let i=1; i<=steps; ++i) {
    currentContour = contourScale(i);
    sel.filter(includesOutlineContour).append("path")
      .attr("transform", "translate(0, 10) scale(1, -1)") // ensures that positive y points up
      .attr("d", generateOutlineContour)
      .attr("fill", "none")
      .attr("stroke", "black");
  }
}

// d3 function to compute filled isocontours for all cells that span
// given a range of values, [minValue,maxValues], this function produces
// a set of size "steps" isocontours to be added to the selection "sel".
// colorScale is used to assign their fill color.
function createFilledPlot(minValue, maxValue, steps, sel, colorScale)
{
  let contourScale = d3.scaleLinear().domain([1, steps]).range([minValue, maxValue]);
  for (let i=steps; i>=1; --i) {
    currentContour = contourScale(i);
    sel.filter(includesFilledContour).append("path")
      .attr("transform", "translate(0, 10) scale(1, -1)") // ensures that positive y points up
      .attr("d", generateFilledContour)
      .attr("fill", function(d) { return colorScale(currentContour); });
  }
}

// Compute the isocontour plots
let plot1T = d3.select("#plot1-temperature")
    .callReturn(createSvg)
    .callReturn(createGroups(temperatureCells));
let plot1P = d3.select("#plot1-pressure")
    .callReturn(createSvg)
    .callReturn(createGroups(pressureCells));

createOutlinePlot(-70, -60, 10, plot1T);
createOutlinePlot(-500, 200, 10, plot1P);

// Compute the filled isocontour plots
let plot2T = d3.select("#plot2-temperature")
    .callReturn(createSvg)
    .callReturn(createGroups(temperatureCells));
let plot2P = d3.select("#plot2-pressure")
    .callReturn(createSvg)
    .callReturn(createGroups(pressureCells));

createFilledPlot(-70, -60, 10, plot2T,
              d3.scaleLinear()
                .domain([-70, -60])
                .range(["blue", "red"]));
createFilledPlot(-500, 200, 10, plot2P,
              d3.scaleLinear()
                .domain([-500, 0, 500])
                .range(["#ca0020", "#f7f7f7", "#0571b0"]));

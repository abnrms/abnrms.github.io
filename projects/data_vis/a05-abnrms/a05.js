// 
// a05.js
// Skeleton for CSC444 Assignment 05, Fall 2025
// Joshua A. Levine <josh@arizona.edu>
//
// This file provides the skeleton code for you to write for A05.  It
// generates (using index.html and data.js) grids of 50x50 rectangles 
// to visualize the Hurricane Isabel dataset.
//
// Your main task is to complete the four color functions.
// Additionally, you may want to add additional logic to insert color
// legends for each of the four plots.  These can be inserted as new svg
// elements in the spans colorlegend-X for X=1..4 
//



//////////////////////////////////////////////////////////////////////////////
// Global variables, preliminaries to draw the grid of rectangles

var svgSize = 500;
var bands = 50;

var xScale = d3.scaleLinear().domain([0, bands]).  range([0, svgSize]);
var yScale = d3.scaleLinear().domain([-1,bands-1]).range([svgSize, 0]);

function createSvg(sel)
{
    return sel
        .append("svg")
        .attr("width", svgSize)
        .attr("height", svgSize);
}

function createRects(sel)
{
    return sel
        .append("g")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return xScale(d.Col); })
        .attr("y", function(d) { return yScale(d.Row); })
        .attr("width", 10)
        .attr("height", 10)
}

d3.selection.prototype.callAndReturn = function(callable)
{
    return callable(this);
};

//////////////////////////////////////////////////////////////////////////////
// Color functions -- Hamlet Taraz Implemented these!

/**
 * Colors the first map based on temperature, uses d3.scaleLinear(), changing
 * luminance monotonically, from blue to yellow to avoid red-green colorblind issues.
 */
function colorT1(d) {
    let scale = d3.scaleLinear()
        .domain([-70, -60])
        .range(["#0000bb", "#ffff44"])
    return scale(d.T);
}

/**
 * Colors the second map based on temperature. Same as colorT1() except its colors
 * and interpolation are defined in the LAB color space.
 */
function colorT2(d) {
    let scale = d3.scaleLinear()
        .domain([-70, -60])
        .range([d3.lab(0, 0, -100), d3.lab(120, 0, 100)])
        .interpolate(d3.interpolateLab)
    return scale(d.T);
}

/**
 * Colors the third map based on pressure using a diverging color map. Zero maps to
 * white, a neutral color with low saturation, and luminance remains symmetrical around 0.
 */
function colorP3(d) {
    let scale = d3.scaleLinear()
        .domain([-500, 0, 500])
        .range([d3.lab(40, 100, -100), d3.lab(100, 0, 0), d3.lab(80, 100, 100)])
        .interpolate(d3.interpolateLab)
    return scale(d.P);
}

/**
 * Colors the fourth map based on both temperature and pressure. Uses the LAB color space,
 * with the A and B channels corresponding to a diverging color map for pressure,
 * and L remaining to encode temperature.
 */
function colorPT4(d) {
    let scaleTtoL = d3.scaleLinear()
        .domain([-70, -60])
        .range([20, 100])
    let scalePtoA = d3.scaleLinear()
        .domain([-500, 0, 500])
        .range([100, 0, 100])
    let scalePtoB = d3.scaleLinear()
        .domain([-500, 0, 500])
        .range([-100, 0, 100])
    return d3.lab(scaleTtoL(d.T), scalePtoA(d.P), scalePtoB(d.P))
}


//////////////////////////////////////////////////////////////////////////////
// Hook up the color functions with the fill attributes for the rects


d3.select("#plot1-temperature")
    .callAndReturn(createSvg)
    .callAndReturn(createRects)
    .attr("fill", colorT1);

d3.select("#plot2-temperature")
    .callAndReturn(createSvg)
    .callAndReturn(createRects)
    .attr("fill", colorT2);

d3.select("#plot3-pressure")
    .callAndReturn(createSvg)
    .callAndReturn(createRects)
    .attr("fill", colorP3);

d3.select("#plot4-bivariate")
    .callAndReturn(createSvg)
    .callAndReturn(createRects)
    .attr("fill", colorPT4);




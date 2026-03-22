// 
// a06.js
// Skeleton for CSC444 Assignment 06, Fall 2025
// Joshua A. Levine <josh@arizona.edu>
//
// This file provides the skeleton code for you to write for A06.  It
// provides partial implementations for a number of functions you will
// implement to visualize scatteplots of the iris dataset with joint
// interactions
//
// Your main task is to complete the functions:
// (1) makeScatterplot(), which is used to generically create plots
// (2) onBrush(), which is the callback used to interact 
//
// You will also need to implement the logic for responding to selection
//



////////////////////////////////////////////////////////////////////////
// Global variables for the dataset and brushes

let data = iris;

// brush1 and brush2 will store the extents of the brushes,
// if brushes exist respectively on scatterplot 1 and 2.
//
// if either brush does not exist, brush1 and brush2 will
// hold the null value.

let brush1 = null;
let brush2 = null;


////////////////////////////////////////////////////////////////////////
// xAccessor and yAccessor allow this to be generic to different data
// fields

function makeScatterplot(sel, xAccessor, yAccessor, xLabel, yLabel) // added params for labels
{
  let width = 500;
  let height = 500;

  let svg = sel
    .append("svg")
    .attr("width", width).attr("height", height);

  // creates the scales to fit in my drawing area and color flowers using LAB space
  let xScale = d3.scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .range([60, 480])
  let yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([440, 20])
  let colScale = d3.scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica"])
    .range([d3.lab(50, -100, -100), d3.lab(80, 100, -100), d3.lab(80, -40, 100)])

  let brush = d3.brush();

  svg.append("g")
    .attr("class", "brush")
    .call(brush);

  // Creates circles
  let circles = svg.append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(xAccessor(d)))
    .attr("cy", d => yScale(yAccessor(d)))
    .attr("r", 5)
    .attr("fill", d => colScale(d.species))
    .attr("stroke-width", 2)
    .on("click", onClick);

  // Creates axes
  let xAxis = svg.append("g")
    .attr("transform", "translate(0, 450)")
    .call(d3.axisBottom(xScale));
  let yAxis = svg.append("g")
    .attr("transform", "translate(50, 0)")
    .call(d3.axisLeft(yScale));

  // Creates axis labels
  xAxis.append("text")
    .attr("fill", "black")
    .attr("x", 270)
    .attr("y", 37)
    .text(xLabel);
  yAxis.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90, -33, 230)")
    .attr("fill", "black")
    .attr("x", -33)
    .attr("y", 230)
    .text(yLabel);

  // finally, return a plot object for global use in the brushes,
  // feel free to change this interface
  return {
    svg: svg,
    brush: brush,
    xScale: xScale,
    yScale: yScale,
    circles: circles // added this for double indexing
  };
}

////////////////////////////////////////////////////////////////////////
// Setup plots

plot1 = makeScatterplot(d3.select("#scatterplot_1"),
                        function(d) { return d.sepalLength; },
                        function(d) { return d.sepalWidth; },
                        "Sepal Length",
                        "Sepal Width");

plot2 = makeScatterplot(d3.select("#scatterplot_2"),
                        function(d) { return d.petalLength; },
                        function(d) { return d.petalWidth; },
                        "Petal Length",
                        "Petal Width");

////////////////////////////////////////////////////////////////////////
// Callback when clicked (I added)

function onClick(e, d) {
    // update radii uisng a filter over the data
    plot1.circles.transition()
        .duration(1000)
        .attr("r", 5)
        .filter(d1 => d1 === d)
        .attr("r", 10)
    plot2.circles.transition()
        .duration(1000)
        .attr("r", 5)
        .filter(d1 => d1 === d)
        .attr("r", 10)

    // update text for each table entry
    d3.select("#table-sepalWidth")
        .transition() // fade out
        .duration(500)
        .ease(d3.easeCubicIn)
        .style("opacity", 0)
        .on("end", function() {
            d3.select(this)
            .text(d.sepalWidth) // update text
        })
        .transition() // fade in
        .duration(500)
        .ease(d3.easeCubicOut)
        .style("opacity", 1)

    d3.select("#table-sepalLength")
        .transition()
        .duration(500)
        .ease(d3.easeCubicIn)
        .style("opacity", 0)
        .on("end", function() {
            d3.select(this)
            .text(d.sepalLength)
        })
        .transition()
        .duration(500)
        .ease(d3.easeCubicOut)
        .style("opacity", 1)

    d3.select("#table-petalWidth")
        .transition()
        .duration(500)
        .ease(d3.easeCubicIn)
        .style("opacity", 0)
        .on("end", function() {
            d3.select(this)
            .text(d.petalWidth)
        })
        .transition()
        .duration(500)
        .ease(d3.easeCubicOut)
        .style("opacity", 1)

    d3.select("#table-petalLength")
        .transition()
        .duration(500)
        .ease(d3.easeCubicIn)
        .style("opacity", 0)
        .on("end", function() {
            d3.select(this)
            .text(d.petalLength)
        })
        .transition()
        .duration(500)
        .ease(d3.easeCubicOut)
        .style("opacity", 1)

    d3.select("#table-species")
        .transition()
        .duration(500)
        .ease(d3.easeCubicIn)
        .style("opacity", 0)
        .on("end", function() {
            d3.select(this)
            .text(d.species)
        })
        .transition()
        .duration(500)
        .ease(d3.easeCubicOut)
        .style("opacity", 1)

    // pretty flower picture :)
    drawFlower(d)
}

////////////////////////////////////////////////////////////////////////
// Callback during brushing

function onBrush() {
  let allCircles = d3.select("body").selectAll("circle");
  if (brush1 === null && brush2 === null) {
    // no circles are selected
    allCircles.attr("stroke", "none")
    return;
  }

  // Selection filter function
  function isSelected(d) {
    if (brush1 === null) {
      // if nothing in the first is selected, check the second
      return plot2.xScale.invert(brush2[0][0]) <= d.petalLength &&
             d.petalLength <= plot2.xScale.invert(brush2[1][0]) &&
             plot2.yScale.invert(brush2[1][1]) <= d.petalWidth &&
             d.petalWidth <= plot2.yScale.invert(brush2[0][1]);
    } else if (brush2 === null) {
      // vice versa
      return plot1.xScale.invert(brush1[0][0]) <= d.sepalLength &&
             d.sepalLength <= plot1.xScale.invert(brush1[1][0]) &&
             plot1.yScale.invert(brush1[1][1]) <= d.sepalWidth &&
             d.sepalWidth <= plot1.yScale.invert(brush1[0][1]);
    }
    // if both selected, check for their intersection
    return plot1.xScale.invert(brush1[0][0]) <= d.sepalLength &&
           d.sepalLength <= plot1.xScale.invert(brush1[1][0]) &&
           plot1.yScale.invert(brush1[1][1]) <= d.sepalWidth &&
           d.sepalWidth <= plot1.yScale.invert(brush1[0][1]) &&
           plot2.xScale.invert(brush2[0][0]) <= d.petalLength &&
           d.petalLength <= plot2.xScale.invert(brush2[1][0]) &&
           plot2.yScale.invert(brush2[1][1]) <= d.petalWidth &&
           d.petalWidth <= plot2.yScale.invert(brush2[0][1]);
  }

  let selected = allCircles
    .filter(isSelected);
  let notSelected = allCircles
    .filter(function(d) { return !isSelected(d); });

  // color strokes as darker versions of fill color
  let strokeScale = d3.scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica"])
    .range([d3.lab(0, -100, -100), d3.lab(20, 100, -100), d3.lab(20, -40, 100)])

  // update stroke
  selected.attr("stroke", d => strokeScale(d.species))
  notSelected.attr("stroke", "none");
}

////////////////////////////////////////////////////////////////////////
// Drawing flowers :)

// Create flower canvas and use g for centering
let flower = d3.select("#flower")
    .append("svg")
    .attr("width", 200)
    .attr("height", 200)
    .append("g")
    .attr("transform", "translate(100, 105)")

// Create three petals, transforming to rotate
let petals = flower.selectAll("path.petal")
    .data([0, 1, 2])
    .enter()
    .append("path")
    .attr("class", "petal")
    .attr("d", "M 0 0 Q 10 7 0 10 Q -10 7 0 0 ")
    .attr("transform", d => `rotate(${d * 120}) scale(0.01, 0.01)`)
    .attr("fill", "#456") // background color

// Create three sepals, transforming to rotate
let sepals = flower.selectAll("path.sepal")
    .data([0, 1, 2])
    .enter()
    .append("path")
    .attr("class", "sepal")
    .attr("d", "M 0 0 C 7 10 10 20 8 40 C 20 50 25 85 0 80 C -25 85 -20 50 -8 40 C -10 20 -7 10 0 0")
    .attr("transform", d => `rotate(${60+d * 120}) scale(0.01, 0.01)`)
    .attr("fill", "#456")

// Called on select, update the petals and sepals with an animation
function drawFlower(f) {
    // color flower like data points (inaccurate, I know)
    let colScale = d3.scaleOrdinal()
        .domain(["setosa", "versicolor", "virginica"])
        .range([d3.lab(50, -100, -100), d3.lab(80, 100, -100), d3.lab(80, -40, 100)])

    // update petals and sepals, length, width, and color.
    petals.transition()
        .duration(1000)
        .attr("transform", d => `rotate(${d * 120}) scale(${f.petalWidth}, ${f.petalLength})`)
        .attr("fill", colScale(f.species))
    sepals.transition()
        .duration(1000)
        .attr("transform", d => `rotate(${60 + d * 120}) scale(${f.sepalWidth / 3.58}, ${f.sepalLength / 8.049})`)
        .attr("fill", colScale(f.species))
}

////////////////////////////////////////////////////////////////////////
//
// d3 brush selection
//
// The "selection" of a brush is the range of values in either of the
// dimensions that an existing brush corresponds to. The brush selection
// is available in the event.selection object.
// 
//   e = event.selection
//   e[0][0] is the minimum value in the x axis of the brush
//   e[1][0] is the maximum value in the x axis of the brush
//   e[0][1] is the minimum value in the y axis of the brush
//   e[1][1] is the maximum value in the y axis of the brush
//
// The most important thing to know about the brush selection is that
// it stores values in *PIXEL UNITS*. Your logic for highlighting
// points, however, is not based on pixel units: it's based on data
// units.
//
// In order to convert between the two of them, remember that you have
// the d3 scales you created with the makeScatterplot function above.
//
// It is not necessary to use, but you might also find it helpful to
// know that d3 scales have a function to *invert* a mapping: if you
// create a scale like this:
//
//  s = d3.scaleLinear().domain([5, 10]).range([0, 100])
//
// then s(7.5) === 50, and s.invert(50) === 7.5. In other words, the
// scale object has a method invert(), which converts a value in the
// range to a value in the domain. This is exactly what you will need
// to use in order to convert pixel units back to data units.
//
//
// NOTE: You should not have to change any of the following:

function updateBrush1(event) {
  brush1 = event.selection;
  onBrush();
}

function updateBrush2(event) {
  brush2 = event.selection;
  onBrush();
}

plot1.brush
  .on("brush", updateBrush1)
  .on("end", updateBrush1);

plot2.brush
  .on("brush", updateBrush2)
  .on("end", updateBrush2);

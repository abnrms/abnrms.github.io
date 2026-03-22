//
// a07.js
// Complete implementation of Assignment 07 for CSC 444 @ University of Arizona
// Author: Hamlet Taraz <hamlet@arizona.edu>
// Template Author: Joshua A. Levine <josh@arizona.edu>
//
// This file creates a parallel coordinates plot of the Palmer Penguins dataset.
//   Colors datapoints by species, and includes three interactions: clicking the
//   axis labels, brushing on the axes, and selecting categorical features.
//



////////////////////////////////////////////////////////////////////////
// Global variables for the dataset 

let data = penguins
//this would instead work with a smaller random subset:
//let data = d3.shuffle(penguins).slice(0,50)

// dims will store the four axes in left-to-right display order
let dims = [
  "bill_length",
  "bill_depth",
  "flipper_length",
  "body_mass"
];

// mapping from dimension id to dimension name used for text labels
let dimNames = {
  "bill_length": "Bill Length",
  "bill_depth": "Bill Depth",
  "flipper_length": "Flipper Length",
  "body_mass": "Body Mass",
};




////////////////////////////////////////////////////////////////////////
// Global variables for the svg

let width = dims.length*125;
let height = 500;
let padding = 50;

let svg = d3.select("#pcplot")
  .append("svg")
  .attr("width", width).attr("height", height);




////////////////////////////////////////////////////////////////////////
// Initialize the x and y scales, axes, and brushes.  
//  - xScale stores a mapping from dimension id to x position
//  - yScales[] stores each y scale, one per dimension id
//  - axes[] stores each axis, one per id
//  - brushes[] stores each brush, one per id
//  - brushRanges[] stores each brush's event.selection, one per id

let xScale = d3.scalePoint()
  .domain(dims)
  .range([padding, width-padding]);

let yScales = {};
let axes = {};
let brushes = {};
let brushRanges = {};

// For each dimension, we will initialize a yScale, axis, brush, and
// brushRange
dims.forEach(function(dim) {
  //create a scale for each dimension
  yScales[dim] = d3.scaleLinear()
    .domain( d3.extent(data, function(datum) { return datum[dim]; }) )
    .range( [height-padding, padding] );

  //set up a vertical axis for each dimensions
  axes[dim] = d3.axisLeft()
    .scale(yScales[dim])
    .ticks(10);

  //set up brushes as a 20 pixel width band
  //we will use transforms to place them in the right location
  brushes[dim] = d3.brushY()
    .extent([[-10, padding], [+10, height-padding]]);

  //brushes will be hooked up to their respective updateBrush functions
  brushes[dim]
    .on("brush", updateBrush(dim))
    .on("end", updateBrush(dim))

  //initial brush ranges to null
  brushRanges[dim] = null;
});




////////////////////////////////////////////////////////////////////////
// Make the parallel coordinates plots 

// color scale for species
let colScaleSpecies = d3.scaleOrdinal()
    .domain(["Adelie", "Gentoo", "Chinstrap"])
    .range([d3.lab(100, 100, 100), d3.lab(60, -100, -40), d3.lab(50, 100, -100)])

// add the actual polylines for data elements, each with class "datapath"
svg.append("g")
  .selectAll(".datapath")
  .data(data)
  .enter()
  .append("path")
  .attr("class", "datapath")
  .attr("d", d => d3.line()([
    [xScale(dims[0]), yScales[dims[0]](d[dims[0]])],
    [xScale(dims[1]), yScales[dims[1]](d[dims[1]])],
    [xScale(dims[2]), yScales[dims[2]](d[dims[2]])],
    [xScale(dims[3]), yScales[dims[3]](d[dims[3]])]
  ]))
  .attr("stroke", d => colScaleSpecies(d.species))
  .attr("fill", "none")
  .attr("opacity", 0.75)

// add the axis groups, each with class "axis"
svg.selectAll(".axis")
  .data(dims)
  .enter()
  .append("g")
  .attr("class", "axis")
  .attr("transform", d => `translate(${xScale(d)}, 0)`)
  .each(function (d) { return d3.select(this).call(axes[d]) })

// add the axes labels, each with class "label"
svg.selectAll(".label")
  .data(dims)
  .enter()
  .append("text")
  .attr("class", "label")
  .attr("x", 0)
  .attr("y", 30)
  .attr("text-anchor", "middle")
  .attr("transform", d => `translate(${xScale(d)}, 0)`)
  .text(d => dimNames[d])
  .on("click", onClick)

// add the brush groups, each with class ".brush" 
svg.selectAll(".brush")
  .data(dims)
  .enter()
  .append("g")
  .attr("class", "brush")
  .attr("transform", d => `translate(${xScale(d)}, 0)`)
  .each(function (d) { return d3.select(this).call(brushes[d]) })




////////////////////////////////////////////////////////////////////////
// Interaction Callbacks

// Callback for swapping axes when a text label is clicked.
function onClick(event, d) {
  // which axes are we clicking
  let i = dims.indexOf(d)
  i = i == 3 ? 2 : i

  // swap
  let t = dims[i+1]
  dims[i+1] = dims[i]
  dims[i] = t

  // update scale
  xScale.domain(dims)

  // transition axes, labels, and brushes
  svg.selectAll(".axis")
    .transition()
    .duration(1000)
    .attr("transform", d => `translate(${xScale(d)}, 0)`)
  svg.selectAll(".label")
    .transition()
    .duration(1000)
    .attr("transform", d => `translate(${xScale(d)}, 0)`)
  svg.selectAll(".brush")
    .transition()
    .duration(1000)
    .attr("transform", d => `translate(${xScale(d)}, 0)`)

  // compute midpoints where data moves for smooth transition
  let midlinefn = function (d) {
    let pathlist = [
      [xScale(dims[0]), yScales[dims[0]](d[dims[0]])],
      [xScale(dims[1]), yScales[dims[1]](d[dims[1]])],
      [xScale(dims[2]), yScales[dims[2]](d[dims[2]])],
      [xScale(dims[3]), yScales[dims[3]](d[dims[3]])]
    ]

    // average points on swapping axes
    pathlist[i] = pathlist[i+1] = [(pathlist[i][0] + pathlist[i+1][0]) / 2,
                                   (pathlist[i][1] + pathlist[i+1][1]) / 2]

    return d3.line()(pathlist)
  }

  // update paths with cool swag animation
  svg.selectAll(".datapath")
    .transition()
    .duration(500)
    .ease(d3.easeCubicIn)
    .attr("d", midlinefn)
    .transition()
    .duration(500)
    .ease(d3.easeCubicOut)
    .attr("d", d => d3.line()([
      [xScale(dims[0]), yScales[dims[0]](d[dims[0]])],
      [xScale(dims[1]), yScales[dims[1]](d[dims[1]])],
      [xScale(dims[2]), yScales[dims[2]](d[dims[2]])],
      [xScale(dims[3]), yScales[dims[3]](d[dims[3]])]
    ]))
}

// Returns a callback function that calls onBrush() for the brush
// associated with each dimension
function updateBrush(dim) {
  return function(event) {
    brushRanges[dim] = event.selection;
    onBrush();
  };
}

// Callback when brushing to select elements in the PC plot
function onBrush() {
  let allLines = d3.selectAll(".datapath");

  function isSelected(d) {
    let result = true

    // of the selected dimensions, things that are not brushed by all of them are not selected
    for (let i = 0; i < dims.length; i++) {
      let dim = dims[i]
      let pixel = yScales[dim](d[dim])
      if (brushRanges[dim] != null && (brushRanges[dim][0] > pixel || pixel > brushRanges[dim][1]))
        result = false
    }

    return result
  }

  let selected = allLines
    .filter(isSelected);
  let notSelected = allLines
    .filter(function(d) { return !isSelected(d); });

  // Update the style of the selected and not selected data
  selected.attr("opacity", 0.75)
  notSelected.attr("opacity", 0.1)
}


/////////////////////////////////////////////////////////
// COLOR SELECTION AND LEGEND

// data to attribute to the checkboxes

let checks = [
  {
    "feature": "species", // feature to use (I don't think I reference this but that's okay!)
    "name": "Species", // to display
    "checked": true // default state
  },
  {
    "feature": "island",
    "name": "Island",
    "checked": false
  },
  {
    "feature": "sex",
    "name": "Sex",
    "checked": false
  }
]

// A bunch of scales for color

// Individual channels when both sex and species selected
let labLModScaleSex = d3.scaleOrdinal()
    .domain(["male", "female", "NA"])
    .range([-30, 20, 0])

let labLScaleSpecies = d3.scaleOrdinal()
    .domain(["Adelie", "Gentoo", "Chinstrap"])
    .range([100, 60, 50])

let labAScaleSpecies = d3.scaleOrdinal()
    .domain(["Adelie", "Gentoo", "Chinstrap"])
    .range([100, -100, 100])

let labBScaleSpecies = d3.scaleOrdinal()
    .domain(["Adelie", "Gentoo", "Chinstrap"])
    .range([100, -40, -100])

// just sex selected
let colScaleSex = d3.scaleOrdinal()
    .domain(["male", "female", "NA"])
    .range([d3.lab(40, 0, 0), d3.lab(80, 0, 0), d3.lab(60, 0, 0)])

// dasharray scale for island
let dashScaleIsland = d3.scaleOrdinal()
    .domain(["Torgersen", "Biscoe", "Dream"])
    .range(["4 4", "6 2 2 2", "2 2 2 6"])

// to be called when a checkbox is clicked, updates the color and dasharray scales
function onCheck(event, d) {
    d.checked = !d.checked

    let datapaths = d3.selectAll(".datapath")
    let legendlines = d3.selectAll(".legendline")

    if (checks[0].checked) { // species
        if (checks[2].checked) { // sex
            datapaths.transition().duration(1000)
                .attr("stroke", d => d3.lab(labLScaleSpecies(d.species) + labLModScaleSex(d.sex),
                                                 labAScaleSpecies(d.species),
                                                 labBScaleSpecies(d.species)))
        } else {
            datapaths.transition().duration(1000)
                .attr("stroke", d => colScaleSpecies(d.species))
        }
    } else {
        if (checks[2].checked) { // sex
            datapaths.transition().duration(1000)
                .attr("stroke", d => colScaleSex(d.sex))
        } else {
            datapaths.transition().duration(1000)
                .attr("stroke", d3.lab(60, 0, 0))
        }
    }

    if (checks[1].checked) { // island
        datapaths.attr("stroke-dasharray", d => dashScaleIsland(d.island))
    } else {
        datapaths.attr("stroke-dasharray", "none")
    }
}

// create checkbox divs, labels and inputs
d3.select("#checkboxes")
  .selectAll(".checkbox")
  .data(checks)
  .enter()
  .append("div")
  .attr("class", "checkbox")
  .each(function (d) {
    d3.select(this).append("label").text(d.name)
    let inp = d3.select(this).append("input")
      .attr("type", "checkbox")
      .attr("name", d.feature)
      .on("click", onCheck)
    if (d.checked)
      inp.attr("checked", true)
  })

///////////////////////////////////////
// LEGEND SETUP

// create svg
let legend_svg = d3.select("#legend")
  .append("svg")
  .attr("width", 250).attr("height", 150)

// data for legend
let legendlines = [
    {
        "label": "Adelie",
        "x1": 25,
        "y": 75,
        "stroke": colScaleSpecies("Adelie"),
        "dasharray": "none"
    },
    {
        "label": "Gentoo",
        "x1": 100,
        "y": 75,
        "stroke": colScaleSpecies("Gentoo"),
        "dasharray": "none"
    },
    {
        "label": "Chinstrap",
        "x1": 175,
        "y": 75,
        "stroke": colScaleSpecies("Chinstrap"),
        "dasharray": "none"
    },
    {
        "label": "Male",
        "x1": 25,
        "y": 25,
        "stroke": colScaleSex("male"),
        "dasharray": "none"
    },
    {
        "label": "N/A",
        "x1": 100,
        "y": 25,
        "stroke": colScaleSex("NA"),
        "dasharray": "none"
    },
    {
        "label": "Female",
        "x1": 175,
        "y": 25,
        "stroke": colScaleSex("female"),
        "dasharray": "none"
    },
    {
        "label": "Torgersen",
        "x1": 25,
        "y": 125,
        "stroke": d3.lab(60, 0, 0),
        "dasharray": dashScaleIsland("Torgersen")
    },
    {
        "label": "Biscoe",
        "x1": 100,
        "y": 125,
        "stroke": d3.lab(60, 0, 0),
        "dasharray": dashScaleIsland("Biscoe")
    },
    {
        "label": "Dream",
        "x1": 175,
        "y": 125,
        "stroke": d3.lab(60, 0, 0),
        "dasharray": dashScaleIsland("Dream")
    },
]

// create labels with data
legend_svg.selectAll(".legendlabel")
    .data(legendlines)
    .enter()
    .append("text")
    .attr("class", "legendlabel")
    .attr("x", d => d.x1 + 25)
    .attr("y", d => d.y)
    .attr("text-anchor", "middle")
    .text(d => d.label)

// create lines with data
legend_svg.selectAll(".legendline")
    .data(legendlines)
    .enter()
    .append("line")
    .attr("class", "legendline")
    .attr("x1", d => d.x1)
    .attr("y1", d => d.y + 10)
    .attr("x2", d => d.x1 + 50)
    .attr("y2", d => d.y + 10)
    .attr("stroke", d => d.stroke)
    .attr("stroke-dasharray", d => d.dasharray)
    .attr("stroke-width", 2)

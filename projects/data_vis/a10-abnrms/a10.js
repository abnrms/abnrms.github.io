//
// a10.js
// Author: Hamlet Taraz
//
// This implements an editable transfer function to be used in concert
// with the volume renderer defined in volren.js. Generates an svg line
// graph where the user can drag and drop points on the line to customize
// the opacity of the transfer function. The color scheme can be changed
// using three buttons at the top.
//
// It expects a div with id 'tfunc' to place the d3 transfer function
// editor
//


////////////////////////////////////////////////////////////////////////
// Global variables and helper functions

// colorTF and opacityTF store a list of transfer function control
// points.  Each element should be [k, val] where k is a the scalar
// position and val is either a d3.rgb or opacity in [0,1]
let colorTF = [];
let opacityTF = [];

// D3 layout variables
let size = 500;
let svg = null;

// Variables for the scales
let xScale = null;
let yScale = null;
let colorScale = null;

// opacity scale, to be used to draw the filled area under the curve
let osDomain = [];
let osRange = [];
let opacityScale = null;

// an array of 1 pixel x values to be used to draw the color bar and area under graph
let colorbarLines = []
for (let i = 60; i < 480; i++) {
  colorbarLines.push(i)
}

////////////////////////////////////////////////////////////////////////
// Visual Encoding portion that handles the d3 aspects

// Function to create the d3 objects
function initializeTFunc() {
  svg = d3.select("#tfunc")
    .append("svg")
    .attr("width", size)
    .attr("height", size);

  //Initialize the axes
  svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0, 370)")
    .append("text")
    .attr("x", 270)
    .attr("y", 40)
    .attr("text-anchor", "middle")
    .text("Data Value")

  svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(50, 0)")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -190)
    .attr("y", -35)
    .attr("text-anchor", "middle")
    .text("Opacity")

  //Create gradient area under bar
  svg.append("g")
    .attr("class", "area")
    .selectAll("line")
    .data(colorbarLines)
    .enter()
    .append("line")
    .attr("x1", d => d)
    .attr("x2", d => d)
    .attr("y1", 370)
    .attr("y2", 370)
    .attr("stroke-width", 1)

  //After initializing, set up anything that depends on the TF arrays
  //Initialize path for the opacity TF curve
  svg.append("g")
    .attr("class", "lines")
    .selectAll("path")
    .data(opacityTF)
    .enter()
    .append("line")
    .attr("index", (d,i) => i)
    .style("stroke", "black")
    .style("stroke-width", 2)

  //Initialize circles for the opacity TF control points
  let drag = d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);

  svg.append("g")
    .attr("class", "points")
    .selectAll("circle")
    .data(opacityTF)
    .enter()
    .append("circle")
    .attr("index", (d,i) => i)
    .style('cursor', 'pointer')
    .call(drag);

  //Create the color bar to show the color TF
  svg.append("g")
    .attr("class", "colorbar")
    .selectAll("line")
    .data(colorbarLines)
    .enter()
    .append("line")
    .attr("x1", d => d)
    .attr("x2", d => d)
    .attr("y1", 440)
    .attr("y2", 480)
    .attr("stroke-width", 2)
  svg.select(".colorbar")
    .append("text")
    .attr("x", 30)
    .attr("y", 465)
    .attr("text-anchor", "middle")
    .text("Color")

  // colorbar axis
  svg.append("g")
    .attr("id", "colorbar-axis")
    .attr("transform", "translate(0, 440)")

  updateTFunc();
}

// Call this function whenever a new dataset is loaded or whenever
// colorTF and opacityTF change

function updateTFunc() {
  //update scales
  xScale = d3.scaleLinear()
    .domain([dataRange[0], dataRange[1]])
    .range([60, 480])

  yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([360, 20])

  //hook up axes to updated scales
    d3.select("#x-axis")
      .call(d3.axisBottom(xScale))

    d3.select("#y-axis")
      .call(d3.axisLeft(yScale))

    d3.select("#colorbar-axis")
      .call(d3.axisTop(xScale))

  //update opacity curves
  d3.select(".points")
    .selectAll("circle")
    .data(opacityTF)
    .attr("cx", (d, i) => xScale(opacityTF[i][0]))
    .attr("cy", (d, i) => yScale(opacityTF[i][1]))
    .attr("r", 5)

  d3.select(".lines")
    .selectAll("line")
    .data(opacityTF)
    .attr("x1", d => xScale(d[0]))
    .attr("y1", d => yScale(d[1]))
    .attr("x2", (d, i) => i+1 == opacityTF.length ? xScale(d[0]) : xScale(opacityTF[i+1][0]))
    .attr("y2", (d, i) => i+1 == opacityTF.length ? yScale(d[1]) : yScale(opacityTF[i+1][1]))

  //update colorbar
  d3.select(".colorbar")
    .selectAll("line")
    .data(colorbarLines)
    .attr("stroke", d => colorScale(xScale.invert(d)))

  //update area under curve
  d3.select(".area")
    .selectAll("line")
    .data(colorbarLines)
    .attr("stroke", d => colorScale(xScale.invert(d)))
    .attr("opacity", d => opacityScale(xScale.invert(d)))
    .attr("y1", d => yScale(opacityScale(xScale.invert(d))))
}


// To start, let's reset the TFs and then initialize the d3 SVG canvas
// to draw the default transfer function

resetTFs();
initializeTFunc();


////////////////////////////////////////////////////////////////////////
// Interaction callbacks

// Will track which point is selected
let selected = null;

// Called when mouse down
function dragstarted(event,d) {
  selected = parseInt(d3.select(this).attr("index"));
}

// Called when mouse drags
function dragged(event,d) {
  if (selected != null) {
    let pos = [];
    pos[0] = xScale.invert(event.x);
    pos[1] = yScale.invert(event.y);

    //based on pos and selected, update opacityTF

    // clamp x values
    if (selected == 0)
        pos[0] = dataRange[0]
    else if (selected == opacityTF.length - 1)
        pos[0] = dataRange[1]
    else if (pos[0] < opacityTF[selected - 1][0])
        pos[0] = opacityTF[selected - 1][0] + 0.001
    else if (pos[0] > opacityTF[selected + 1][0])
        pos[0] = opacityTF[selected + 1][0] - 0.001

    // clamp y values
    if (pos[1] < 0)
        pos[1] = 0
    else if (pos[1] > 1)
        pos[1] = 1

    // update TF and scale
    opacityTF[selected] = pos;
    osDomain[selected] = pos[0]
    osRange[selected] = pos[1]
    opacityScale
      .domain(osDomain)
      .range(osRange)

    //update TF window
    updateTFunc();

    //update volume renderer
    updateVR(colorTF, opacityTF);
  }
}

// Called when mouse up
function dragended() {
  selected = null;
}




////////////////////////////////////////////////////////////////////////
// Function to read data

// Function to process the upload
function upload() {
  if (input.files.length > 0) {
    let file = input.files[0];
    console.log("You chose", file.name);

    let fReader = new FileReader();
    fReader.readAsArrayBuffer(file);

    fReader.onload = function(e) {
      let fileData = fReader.result;

      //load the .vti data and initialize volren
      initializeVR(fileData);

      //upon load, we'll reset the transfer functions completely
      resetTFs();

      //Update the tfunc canvas
      updateTFunc();

      //update the TFs with the volren
      updateVR(colorTF, opacityTF, false);
    }
  }
}

// Attach upload process to the loadData button
var input = document.getElementById("loadData");
input.addEventListener("change", upload);



////////////////////////////////////////////////////////////////////////
// Functions to respond to buttons that switch color TFs

function resetTFs() {
  makeSequential();
  makeOpacity();
}

// Make a default opacity TF and scale
function makeOpacity() {
  let nstep = 5
  let nScale = d3.scaleLinear()
    .domain([0, nstep - 1])
    .range([dataRange[0], dataRange[1]])

  opacityTF = []
  osDomain = []
  osRange = []
  for (let i = 0; i < nstep; i++) {
    opacityTF[i] = [nScale(i), i / (nstep-1)]
    osDomain[i] = opacityTF[i][0]
    osRange[i] = opacityTF[i][1]
  }

  opacityScale = d3.scaleLinear()
    .domain(osDomain)
    .range(osRange)
}

// Make a sequential color TF and color scale
function makeSequential() {
  colorScale = d3.scaleSequential(d3.interpolateViridis)
    .domain([dataRange[0], dataRange[1]])

  let nstep = 10
  let nScale = d3.scaleLinear()
    .domain([0, nstep - 1])
    .range([dataRange[0], dataRange[1]])
  colorTF = []
  for (let i = 0; i < nstep; i++) {
    colorTF[i] = [nScale(i), d3.color(colorScale(nScale(i)))]
  }
}

// Make a diverging color TF and color scale
function makeDiverging() {
  colorScale = d3.scaleDiverging(d3.interpolatePiYG)
    .domain([dataRange[0], (dataRange[0] + dataRange[1]) / 2, dataRange[1]])

  let nstep = 5
  let nScale = d3.scaleLinear()
    .domain([0, nstep - 1])
    .range([dataRange[0], dataRange[1]])
  colorTF = []
  for (let i = 0; i < nstep; i++) {
    colorTF[i] = [nScale(i), d3.color(colorScale(nScale(i)))]
  }
}

// Make a categorical color TF and quantized color scale
function makeCategorical() {
  let nstep = 10
  let nScale = d3.scaleLinear()
    .domain([0, nstep - 1])
    .range([dataRange[0], dataRange[1]])

  colorScale = d3.scaleQuantize()
    .domain([dataRange[0], dataRange[1]])
    .range(d3.schemeCategory10.slice(0, nstep))

  colorTF = []
  for (let i = 0; i < nstep; i++) {
    colorTF[i] = [nScale(i), d3.color(colorScale(nScale(i)))]
  }
}

// Configure callbacks for each button
d3.select("#sequential").on("click", function() {
  makeSequential();
  updateTFunc();
  updateVR(colorTF, opacityTF, false);
});

d3.select("#diverging").on("click", function() {
  makeDiverging();
  updateTFunc();
  updateVR(colorTF, opacityTF, false);
});

d3.select("#categorical").on("click", function() {
  makeCategorical();
  updateTFunc();
  updateVR(colorTF, opacityTF, true);
});


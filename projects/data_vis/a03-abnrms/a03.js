/*
 * File: a03.js
 * Author: Hamlet Taraz
 * Purpose: draws four charts when included in an html file. Expects that
 * the page has 4 divs of id "div1" through "div4". The first three charts
 * replicate lecture 4's iteration 8, and the last replicates the data
 * portion of my assignment 02's scatteprlot 2.
 */

// ------------------- HELPER FUNCTIONS ----------------------
/*
 * These functions were given in lecture 4's iteration 8 from Joshua Levine, and I am including them here!
 */

function clamp(v) {
    return Math.floor(Math.max(0, Math.min(255, v)));
}

function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}

function color(count) {
    // count = 2500 -> rgb(0, 127, 127) (dark cyan)
    // count = 0 -> rgb(255, 255, 255) (cyan)

    var amount = (2500 - count) / 2500 * 255;
    var s = clamp(amount), s2 = clamp(amount / 2 + 127), s3 = clamp(amount / 2 + 127);

    return rgb(s, s2, s3);
}

// -------------------------- CHART 1 --------------------------

// create the svg element
let chart1 = d3.select("#div1")
               .append("svg")
               .attr("id", "chart1")
               .attr("width", 600)
               .attr("height", 300)

// add and describe rectangles
chart1.selectAll("rect")
      .data(ukDriverFatalities)
      .enter()
      .append("rect")
      .attr("x", row => Math.ceil(600 / (1984 - 1969 + 1)) * (row.year - 1969))
      .attr("y", row => Math.ceil(300 / 12) * (11 - row.month))
      .attr("width", Math.ceil(600 / (1984 - 1969 + 1)))
      .attr("height", Math.ceil(300 / 12))
      .style("fill", row => color(row.count))

// -------------------------- CHART 2 --------------------------

// create the svg element
let chart2 = d3.select("#div2")
               .append("svg")
               .attr("id", "chart2")
               .attr("width", 600)
               .attr("height", 300)

// add and describe circles
chart2.selectAll("circle")
      .data(ukDriverFatalities)
      .enter()
      .append("circle")
      .attr("cx", row => Math.ceil(600 / (1984 - 1969 + 1)) * (row.year - 1969 + 0.5))
      .attr("cy", row => Math.ceil(300 / 12) * (11 - row.month + 0.5))
      .attr("r", row => row.count / 500 * 3)
      .style("fill", "blue")
      .style("stroke", "white")

// -------------------------- CHART 3 --------------------------

// create the svg element
let chart3 = d3.select("#div3")
               .append("svg")
               .attr("id", "chart3")
               .attr("width", 600)
               .attr("height", 300)

// add and describe rectangles
chart3.selectAll("rect")
      .data(ukDriverFatalities)
      .enter()
      .append("rect")
      .attr("x", (row, i) => i * 600 / ukDriverFatalities.length)
      .attr("y", row => 300 - (row.count / 2500 * 300))
      .attr("width", Math.ceil(600 / ukDriverFatalities.length))
      .attr("height", row => row.count / 2500 * 300)
      .style("fill", "#bbb")

// --------------------- A02 SCATTERPLOT 2 ---------------------

// create the svg element
let scatterplot2 = d3.select("#div4")
               .append("svg")
               .attr("id", "scatterplot2")
               .attr("width", 500)
               .attr("height", 500)

// add and describe circles
scatterplot2.selectAll("circle")
            .data(scores)
            .enter()
            .append("circle")
            .attr("cx", row => (row.GPA - 1.7) * 480 / 2.3 + 10)
            .attr("cy", row => 490 - (row.ACT - 15) * 480 / 20)
            .attr("r", row => row.SATV / 80)
            .style("fill", row => rgb((1 - (row.SATM - 370) / 430) * 256, ((row.SATM - 370) / 430) * 256, 0))

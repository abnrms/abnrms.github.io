/*
 * File: a04.js
 * Author: Hamlet Taraz
 * Purpose: Renders a plot of the Calvin College test scores, with customizable color, size, x, and y.
 * I made it way too complicated, using dropdowns instead of buttons and whatnot.
 */

/*
 * Generates a d3 scale with a given range and key function for the scores dataset.
 *
 * Parameters:
 *  - statFunc: d => d.[STAT], determines the domain of values to map from.
 *  - range: list of two or more values determining the range of the scale.
 *  - scaleFunc: the d3 scale to generate, defaults to linear.
 *  - includeMean: boolean, creates a 3 value domain using the mean instead of just 2.
 */
function generateScale(statFunc, range, scaleFunc = d3.scaleLinear, includeMean) {
    let domain = [d3.min(scores, statFunc), d3.max(scores, statFunc)]
    if (includeMean)
        domain = [d3.min(scores, statFunc), d3.mean(scores, statFunc), d3.max(scores, statFunc)]

    let scale = scaleFunc()
        .domain(domain)
        .range(range)

    return scale
}

// ----------------------- CHART & AXES -----------------------

// Creates svg element
let svg = d3.select("#div1")
    .append("svg")
    .attr("id", "scatterplot1")
    .attr("width", 500)
    .attr("height", 500)

// Generate default scales (Meeting the requirements!)
let cxScale = generateScale(d => d.SATV, [80, 480])
let cyScale = generateScale(d => d.ACT, [420, 20])
let rScale = generateScale(d => d.SATM, [2, 12], d3.scaleSqrt)
let fillScale = generateScale(d => d.GPA, ["blue", "red"])

// Adds every circle with default scheme
svg.selectAll("circle")
    .data(scores)
    .enter()
    .append("circle")
    .attr("cx", d => cxScale(d.SATV))
    .attr("cy", d => cyScale(d.ACT))
    .attr("r", d => rScale(d.SATM))
    .attr("fill", d => fillScale(d.GPA))

// X axis
let gx = svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0, 440)")
    .call(d3.axisBottom(generateScale(d => d.SATV, [80, 480])))

// X axis label
let gxText = gx.append("text")
    .attr("fill", "black")
    .attr("x", 280)
    .attr("y", 45)
    .attr("text-anchor", "middle")
    .attr("opacity", 1)
    .text("SATV Score")

// Y axis
let gy = svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(60, 0)")
    .call(d3.axisLeft(generateScale(d => d.ACT, [420, 20])))

// Y axis label
let gyText = gy.append("text")
    .attr("fill", "black")
    .attr("x", -220)
    .attr("y", -37)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .attr("opacity", 1)
    .text("ACT Score")

// ----------------------- DATA FOR DROPDOWNS ----------------------

// List of features and key functions which determine their value.
let featureList = [
    {
        value: "SATV",
        text: "SATV Score",
        statFunc: d => d.SATV
    },
    {
        value: "SATM",
        text: "SATM Score",
        statFunc: d => d.SATM
    },
    {
        value: "cumSAT",
        text: "Cumulative SAT Score",
        statFunc: d => d.SATV + d.SATM
    },
    {
        value: "ACT",
        text: "ACT Score",
        statFunc: d => d.ACT
    },
    {
        value: "GPA",
        text: "GPA",
        statFunc: d => d.GPA
    },
]

// List of color schemes, and scale functions which generate their color scales.
let schemeList = [
    {
        value: "red-blue",
        text: "Blue to Red",
        scaleFunc: statFunc => generateScale(statFunc, ["blue", "red"])
    },
    {
        value: "cont-ryb",
        text: "Continuous RYB",
        scaleFunc: statFunc => generateScale(statFunc, ["#2c7bb6", "#ffffbf", "#d7191c"], d3.scaleLinear, true)
    },
    {
        value: "quantized-ryb",
        text: "Quantized RYB",
        scaleFunc: statFunc => generateScale(statFunc, ["#2c7bb6", "#abd9e9", "#ffffbf", "#fdae61", "#d7191c"], d3.scaleQuantize)
    },
    {
        value: "flower",
        text: "Flower",
        scaleFunc: statFunc => generateScale(statFunc, ["green", "hotpink"])
    },
    {
        value: "grayscale",
        text: "Grayscale",
        scaleFunc: statFunc => generateScale(statFunc, ["#222", "#ddd"])
    },
    {
        value: "rainbow",
        text: "Rainbow",
        scaleFunc: statFunc => generateScale(statFunc, ["#f22", "#f82", "#fd2", "#2d2", "#04f", "#b0f"], d3.scaleQuantize)
    },
    {
        value: "cont-rgb",
        text: "RGB",
        scaleFunc: statFunc => generateScale(statFunc, ["#f00", "#0f0", "#00f"], d3.scaleLinear, true)
    },
]

// -------------------------- DROPDOWN FUNCTIONS -------------------------

/*
 * Updates the x axis to reflect the dropdown-selected feature of scores.
 * Pulls from the <select> element with id selectX and featureList to
 * determine the current value.
 */
function changeX() {
    let xFeat = d3.select("#selectX").property("value") // selectX defined later
    for (i in featureList) {
        let feat = featureList[i]
        if (feat.value == xFeat) {
            // Create corresponding x scale
            let scale = generateScale(feat.statFunc, [80, 480])

            // apply scale to circles
            svg.selectAll("circle")
                .transition()
                .duration(1500)
                .attr("cx", d => scale(feat.statFunc(d)))

            // Update x axis
            gx.transition()
                .duration(1500)
                .call(d3.axisBottom(scale).tickFormat(d3.format("~s"))) // reads 1.5k instead of 1500

            // Update x axis label - fade out, then change text, then fade back in.
            gxText.transition()
                .duration(750)
                .ease(d3.easeCubicIn)
                .attr("opacity", 0)
                .on("end", function() {
                    d3.select(this)
                    .text(feat.text)
                })
                .transition()
                .duration(750)
                .ease(d3.easeCubicOut)
                .attr("opacity", 1)
        }
    }
}

/*
 * Updates the y axis to reflect the dropdown-selected feature of scores.
 * Pulls from the <select> element with id selectY and featureList to
 * determine the current value.
 */
function changeY() {
    let yFeat = d3.select("#selectY").property("value") // selectY defined later
    for (i in featureList) {
        let feat = featureList[i]
        if (feat.value == yFeat) {
            // Create corresponding y scale
            let scale = generateScale(feat.statFunc, [420, 20])

            // apply scale to circles
            svg.selectAll("circle")
                .transition()
                .duration(1500)
                .attr("cy", d => scale(feat.statFunc(d)))

            // Update y axis
            gy.transition()
                .duration(1500)
                .call(d3.axisLeft(scale).tickFormat(d3.format("~s"))) // reads 1.5k instead of 1500

            // Update y axis label - fade out, then change text, then fade back in.
            gyText.transition()
                .duration(750)
                .ease(d3.easeCubicIn)
                .attr("opacity", 0)
                .on("end", function() {
                    d3.select(this)
                    .text(feat.text)
                })
                .transition()
                .duration(750)
                .ease(d3.easeCubicOut)
                .attr("opacity", 1)
        }
    }
}

/*
 * Updates the color scheme to reflect the dropdown-selected feature of
 * color and the current color scheme.
 * Pulls from the <select> elements with id selectColorFeat and selectColorScheme,
 * along with featureList to determine the current value.
 */
function changeColor() {
    let colScheme = d3.select("#selectColorScheme").property("value")
    let colFeat = d3.select("#selectColorFeat").property("value") // Both defined later

    // Get current feature's stat Function
    let statFunc
    for (i in featureList)
        if (featureList[i].value == colFeat)
            statFunc = featureList[i].statFunc

    for (i in schemeList) {
        let scheme = schemeList[i]
        if (scheme.value == colScheme) {
            // Create corresponding color scale using scheme and feature
            let scale = scheme.scaleFunc(statFunc)

            // apply scale to circles
            svg.selectAll("circle")
                .transition()
                .duration(1500)
                .attr("fill", d => scale(statFunc(d)))
        }
    }
}

/*
 * Updates the radius to reflect the dropdown-selected feature of scores.
 * Pulls from the <select> element with id selectR and featureList to
 * determine the current value.
 */
function changeR() {
    let rFeat = d3.select("#selectR").property("value") // selectR defined later

    // Constant case
    if (rFeat == "constant") {
        svg.selectAll("circle")
            .transition()
            .duration(1500)
            .attr("r", 7)
        return;
    }

    // Otherwise, which feature is it
    for (i in featureList) {
        let feat = featureList[i]
        if (feat.value == rFeat) {
            // Create corresponding r scale
            let scale = generateScale(feat.statFunc, [2, 12], d3.scaleSqrt)

            // apply scale to circles
            svg.selectAll("circle")
                .transition()
                .duration(1500)
                .attr("r", d => scale(feat.statFunc(d)))
        }
    }
}

// ------------------- DROPDOWN CREATION -------------------

// - - - - - X AXIS - - - - -

let xdiv = d3.select("#controls")
    .append("div")
    .attr("class", "control")

xdiv.append("h3")
    .text("X axis")

// create dropdown from featureList
xdiv.append("select")
    .attr("id", "selectX")
    .on("change", event => changeX())
    .selectAll("option")
    .data(featureList)
    .enter()
    .append("option")
    .attr("value", d => d.value)
    .text(d => d.text)

// set default value
d3.select("#selectX").property("value", "SATV")

// - - - - - Y AXIS - - - - -

let ydiv = d3.select("#controls")
    .append("div")
    .attr("class", "control")

ydiv.append("h3")
    .text("Y axis")

// create dropdown from featureList
ydiv.append("select")
    .attr("id", "selectY")
    .on("change", event => changeY())
    .selectAll("option")
    .data(featureList)
    .enter()
    .append("option")
    .attr("value", d => d.value)
    .text(d => d.text)

// set default value
d3.select("#selectY").property("value", "ACT")

// - - - - - RADIUS - - - - -

let rdiv = d3.select("#controls")
    .append("div")
    .attr("class", "control")

rdiv.append("h3")
    .text("Size feature")

// create dropdown from featureList
rdiv.append("select")
    .attr("id", "selectR")
    .on("change", event => changeR())
    .selectAll("option")
    .data(featureList)
    .enter()
    .append("option")
    .attr("value", d => d.value)
    .text(d => d.text)

// add constant selection
d3.select("#selectR").append("option").attr("value", "constant").text("Constant")

// set default value
d3.select("#selectR").property("value", "SATM")

// - - - - - COLOR FEATURE - - - - -

let coldiv = d3.select("#controls")
    .append("div")
    .attr("class", "control")

coldiv.append("h3")
    .text("Color feature")

// create dropdown from featureList
coldiv.append("select")
    .attr("id", "selectColorFeat")
    .on("change", event => changeColor())
    .selectAll("option")
    .data(featureList)
    .enter()
    .append("option")
    .attr("value", d => d.value)
    .text(d => d.text)

// set default value
d3.select("#selectColorFeat").property("value", "GPA")

// - - - - - COLOR SCHEME - - - - -

let colschemediv = d3.select("#controls")
    .append("div")
    .attr("class", "control")

colschemediv.append("h3")
    .text("Color scheme")

// create dropdown from schemeList
colschemediv.append("select")
    .attr("id", "selectColorScheme")
    .on("change", event => changeColor())
    .selectAll("option")
    .data(schemeList)
    .enter()
    .append("option")
    .attr("value", d => d.value)
    .text(d => d.text)

// set default value
d3.select("#selectColorScheme").property("value", "red-blue")

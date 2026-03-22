
/*
 * Plots the axes of a plot on a 500x500 svg, given dimensions of the data,
 * labels, and a list of tickmarks. The bounding box of the data will be 420
 * pixels, from (60, 20) to (480, 440).
 *
 * If xexp is true, the x-axis will be exponential. If active, will draw
 * ticks and gridlines at 2 ** x rather than x.
 *
 * Parameters:
 *   svg - SVG element to draw to
 *   xmin, xmax, ymin, ymax - dimensions of the data
 *   xticks, yticks - lists of data values where you want tick marks
 *   xlab, ylab - labels for the axes
 *   xexp - boolean, whether the x-axis is exponential.
 */
function plotAxes(svg, xmin, xmax, ymin, ymax, xticks, yticks, xlab, ylab, xexp) {
    // calculate ranges of data
    let xrange
    if (xexp)
        xrange = 2 ** xmax - 2 ** xmin // exponential
    else
        xrange = xmax - xmin // normal

    let yrange = ymax - ymin

    // axes
    svg.appendChild(make("line", {x1: 50, y1: 10, x2: 50, y2: 450, "class": "axis"}))
    svg.appendChild(make("line", {x1: 50, y1: 450, x2: 490, y2: 450, "class": "axis"}))

    // x ticks, gridlines, and text
    for (let i in xticks) {
        let tx // drawn x
        if (xexp)
            tx = (2 ** xticks[i] - 2 ** xmin) * 420 / xrange + 60 // exponential
        else
            tx = (xticks[i] - xmin) * 420 / xrange + 60 // normal

        svg.appendChild(make("line", {x1: tx, y1: 450, x2: tx, y2: 455, "class": "tick"}))
        svg.appendChild(make("line", {x1: tx, y1: 10, x2: tx, y2: 450, "class": "gridline"}))
        svg.appendChild(make("text", {text: xticks[i], x: tx, y: 470, "text-anchor": "middle"}))
    }

    // y ticks, gridlines, and text
    for (let i in yticks) {
        let ty = 440 - (yticks[i] - ymin) * 420 / yrange; // drawn y

        svg.appendChild(make("line", {x1: 45, y1: ty, x2: 50, y2: ty, "class": "tick"}))
        svg.appendChild(make("line", {x1: 50, y1: ty, x2: 490, y2: ty, "class": "gridline"}))
        svg.appendChild(make("text", {text: yticks[i], x: -ty, y: 40, transform: "rotate(-90)", "text-anchor": "middle"}))
    }

    // labels
    svg.appendChild(make("text", {text: xlab, x: 270, y: 490, "text-anchor": "middle"}))
    svg.appendChild(make("text", {text: ylab, x: -230, y: 20, transform: "rotate(-90)", "text-anchor": "middle"}))
}

/*
 * ----------------- SCATTERPLOT 1 -----------------
 */

let scatterplot1 = make("svg", {id: "scatterplot1", width: 500, height: 500})
document.getElementById("div1").appendChild(scatterplot1)

plotAxes(scatterplot1, 280, 800, 370, 800, [300, 400, 500, 600, 700, 800], [400, 500, 600, 700, 800], "SATV score", "SATM score")
plotAll(scatterplot1, scores, "circle",
           {cx: (row) => (row["SATV"] - 280) * 420 / 520 + 60,
            cy: (row) => 440 - (row["SATM"] - 370) * 420 / 430,
            r: () => 4,
            fill: () => rgb(0.4, 0.4, 0.4)})

/*
 * ----------------- SCATTERPLOT 2 -----------------
 */

let scatterplot2 = make("svg", {id: "scatterplot2", width: 500, height: 500})
document.getElementById("div2").appendChild(scatterplot2)

plotAxes(scatterplot2, 1.7, 4, 15, 35, [2, 2.5, 3, 3.5, 4], [15, 20, 25, 30, 35], "GPA", "ACT score")
plotAll(scatterplot2, scores, "circle",
           {cx: (row) => (row["GPA"] - 1.7) * 420 / 2.3 + 60,
            cy: (row) => 440 - (row["ACT"] - 15) * 420 / 20,
            r: (row) => row["SATV"] / 100,
            fill: (row) => rgb(1 - (row["SATM"] - 370) / 430, (row["SATM"] - 370) / 430, 0)})

// Legends
scatterplot2.appendChild(make("rect", {x: 335, y: 350, width: 150, height: 90, stroke: "black", fill: "white"}))

// Color legend - SATM score
scatterplot2.appendChild(make("text", {text: "SATM score", x: 410, y: 365, "text-anchor": "middle", "font-size": 12}))
scatterplot2.appendChild(make("text", {text: "370", x: 360, y: 370, "text-anchor": "middle", "font-size": 12}))
scatterplot2.appendChild(make("text", {text: "800", x: 460, y: 370, "text-anchor": "middle", "font-size": 12}))

// Gradient bar
scatterplot2.appendChild(make("rect", {x: 350, y: 375, width: 120, height: 20, stroke: "black"}))
for (let i = 1; i < 120; i++) {
    scatterplot2.appendChild(make("line", {x1: 350 + i, y1: 375, x2: 350 + i, y2: 395, stroke: rgb(1 - i / 120, i / 120, 0)}));
}

// Size legend - SATV score
scatterplot2.appendChild(make("text", {text: "SATV score", x: 410, y: 410, "text-anchor": "middle", "font-size": 12}))
scatterplot2.appendChild(make("text", {text: "280", x: 360, y: 417, "text-anchor": "middle", "font-size": 12}))
scatterplot2.appendChild(make("text", {text: "800", x: 460, y: 412, "text-anchor": "middle", "font-size": 12}))

// Circles to show scale
for (let i = 0; i <= 6; i++) {
    scatterplot2.appendChild(make("circle", {cx: 360 + i * 100 / 6, cy: 425, r: 2.8 + i * 5.2 / 6}))
}

/*
 * - - - - - - - - - SCATTERPLOT 2b - - - - - - - - -
 */

let scatterplot2b = make("svg", {id: "scatterplot2b", width: 500, height: 500})
document.getElementById("div2b").appendChild(scatterplot2b)

plotAxes(scatterplot2b, 1.7, 4, 15, 35, [2, 2.5, 3, 3.5, 4], [15, 20, 25, 30, 35], "GPA", "ACT score", true)
plotAll(scatterplot2b, scores, "circle",
           {cx: (row) => (2 ** row["GPA"] - 2 ** 1.7) * 420 / (2 ** 4 - 2 ** 1.7) + 60,
            cy: (row) => 440 - (row["ACT"] - 15) * 420 / 20,
            r: (row) => row["SATV"] / 80,
            fill: function (row) {
                let scaled = (row["SATM"] - 370) / 430
                if (scaled * 3 < 1) {
                    return rgb(1, scaled * 2.5, 0)
                } else if (scaled * 3 < 2) {
                    return rgb(2 - scaled * 3, 5/6, 0)
                } else {
                    return rgb(0, 11/6 - scaled * 1.5, scaled * 3 - 2)
                }
            },
            stroke: () => "black",
            "fill-opacity": (row) => (45 - row["ACT"]) / 30})

// Legends
scatterplot2b.appendChild(make("rect", {x: 335, y: 350, width: 150, height: 90, stroke: "black", fill: "white"}))

// Color legend - SATM score
scatterplot2b.appendChild(make("text", {text: "SATM score", x: 410, y: 365, "text-anchor": "middle", "font-size": 12}))
scatterplot2b.appendChild(make("text", {text: "370", x: 360, y: 370, "text-anchor": "middle", "font-size": 12}))
scatterplot2b.appendChild(make("text", {text: "800", x: 460, y: 370, "text-anchor": "middle", "font-size": 12}))

// Gradient bar
scatterplot2b.appendChild(make("rect", {x: 350, y: 375, width: 120, height: 20, stroke: "black"}))
for (let i = 1; i < 120; i++) {
    let scaled = i / 120
    if (scaled * 3 < 1) {
        scatterplot2b.appendChild(make("line", {x1: 350 + i, y1: 375, x2: 350 + i, y2: 395, stroke: rgb(1, scaled * 2.5, 0)}));
    } else if (scaled * 3 < 2) {
        scatterplot2b.appendChild(make("line", {x1: 350 + i, y1: 375, x2: 350 + i, y2: 395, stroke: rgb(2 - scaled * 3, 5/6, 0)}));
    } else {
        scatterplot2b.appendChild(make("line", {x1: 350 + i, y1: 375, x2: 350 + i, y2: 395, stroke: rgb(0, 11 / 6 - scaled * 1.5, scaled * 3 - 2)}));
    }
}

// Size legend - SATV score
scatterplot2b.appendChild(make("text", {text: "SATV score", x: 410, y: 410, "text-anchor": "middle", "font-size": 12}))
scatterplot2b.appendChild(make("text", {text: "280", x: 360, y: 417, "text-anchor": "middle", "font-size": 12}))
scatterplot2b.appendChild(make("text", {text: "800", x: 460, y: 412, "text-anchor": "middle", "font-size": 12}))

// Circles to show scale
for (let i = 0; i <= 5; i++) {
    scatterplot2b.appendChild(make("circle", {cx: 360 + i * 100 / 5, cy: 425, r: (280 + i / 5 * 520) / 80}))
}

// Justification

let p1 = document.createElement("p")
p1.appendChild(document.createTextNode(`
Looking at scatterplot 2, the biggest problem with it is that it is hard to discern points near the top-right of the graph from one another. In cases like this, I know it's good to spread that area out by transforming the graph. I log-scaled the GPA axis by modifying my x getter and tweaking my drawAxis function. None of the overlap came from the y axis, so there was no point in transforming it. Now, the data is much more spread out.
`))
document.getElementById("div2b").appendChild(p1)

let p2 = document.createElement("p")
p2.appendChild(document.createTextNode(`
To further discern the points, I added a black stroke around them and added transparency to the nodes with a higher ACT score, where most of the overlap occurs. However, it seemed necessary to increase the radius a bit now that they were see-through in order to see the outlines better through the transparency, so I did. I also wanted a more discernable and pleasant color scheme than red-green, particularly due to the vague browns in the middle. I split the color function into thirds, going in the order: red (1, 0, 0) to yellow (1, 5/6, 0) to green (0, 5/6, 0) to blue (0, 1/3, 1). I originally maximized the rgbs for the yellow and green, but I disliked the colors.
`))
document.getElementById("div2b").appendChild(p2)

/*
 * ----------------- SCATTERPLOT 3 -----------------
 */

let scatterplot3 = make("svg", {id: "scatterplot3", width: 500, height: 500})
document.getElementById("div3").appendChild(scatterplot3)

plotAxes(scatterplot3, 720, 1600, 1.7, 4, [800, 1000, 1200, 1400, 1600], [2, 2.5, 3, 3.5, 4], "Combined SAT score", "GPA")
plotAll(scatterplot3, scores, "circle",
           {cx: (row) => (row["SATV"] + row["SATM"] - 720) * 420 / 900 + 60,
            cy: (row) => 440 - (row["GPA"] - 1.7) * 420 / 2.3,
            r: () => 4,
            fill: (row) => rgb(1 - (row["ACT"] - 15) / 20, (row["ACT"] - 15) / 20, 0)})

// Legends
scatterplot3.appendChild(make("rect", {x: 335, y: 390, width: 150, height: 55, stroke: "black", fill: "white"}))

// Color legend - ACT score
scatterplot3.appendChild(make("text", {text: "ACT score", x: 410, y: 405, "text-anchor": "middle", "font-size": 12}))
scatterplot3.appendChild(make("text", {text: "15", x: 355, y: 410, "text-anchor": "middle", "font-size": 12}))
scatterplot3.appendChild(make("text", {text: "35", x: 465, y: 410, "text-anchor": "middle", "font-size": 12}))

// Gradient bar
scatterplot3.appendChild(make("rect", {x: 350, y: 415, width: 120, height: 20, stroke: "black"}))
for (let i = 1; i < 120; i++) {
    scatterplot3.appendChild(make("line", {x1: 350 + i, y1: 415, x2: 350 + i, y2: 435, stroke: rgb(1 - i / 120, i / 120, 0)}));
}

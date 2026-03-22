Assignment 07
------------

Author: Hamlet Taraz [hamlet@arizona.edu](mailto:hamlet@arizona.edu)  
Date: November 5, 2025

## Notes

In this assignment, I followed Joshua Levine's template to construct an interactive parallel coordinates visualization of the Palmer Penguins Dataset.

To view this visualization, open index.html in a modern browser window (I use Chrome) while all files are in the same directory.

A multitude of parallel coordinates are shown, colored by their species (see included legend). Brushing on any of the axes will only show the selected coordinates as highlighted. If multiple axes are brushed, their intersection is highlighted.

Clicking on the label above any axis will swap it with the axis to the right. Clicking the last axis will switch with its left neighbor. This will include a 1-second transition; If eligible for extra credit, please notice that the data points transition fluidly with the axis transitions, as I calculated the midpoints and adjusted the easing for that transition.

I also added a set of checkboxes to the right of the canvas which allow the user to customize which categorical variables are shown. In essence, species determines the hue, sex determines the luminance, and island determines the pattern of the line drawn. Unfortunately, it appears that the brush logic combined with these (specifically island) causes a bit of lag (at least on my device). Also unfortunately, I can acknowledge some design oversight trying to implement a multivariate color/texturemap. I think that the features clash, and it's hard to tell what is what.

## Included files

* README.md - This file
* index.html - The HTML file containing the structure of the page, calls the scripts.
* a07.js - The JS file which uses D3 to construct the visualization
* style.css - The CSS stylesheet for index.html
* d3.js - The D3 library code
* penguins.js - The JS files containing the Palmer Penguins Dataset.

## References

Joshua Levine - Provided d3.js, penguins.js, and a template for a07.js, index.html, and README.md.

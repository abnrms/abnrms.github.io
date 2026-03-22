A06 Hamlet Taraz
------------

Author: Hamlet Taraz [hamlet@arizona.edu](mailto:hamlet@arizona.edu)  
Date: Oct 20, 2025


## Notes

To run this program, simply open index.html in a modern browser (I use Chrome) while all files are in the same directory.

This webpage displays two scatterplots, both of the Iris flower dataset, with two disjoint pairs of features as their keys. Points are colored based on species, using the LAB color space to make a visually appealing scheme.

When either plot is brushed over, any points within the selection are outlined. If both are brushed over, only the intersection of the two are outlined. Outline color is based on species as well.

When a point is selected in either plot, that datapoint on both plots is enlarged. In addition, the exact stats for that datapoint are shown in a tabular form. Finally (FOR EXTRA CREDIT IF YOU LIKE IT!), when you select a datapoint, the same data is shown in a graphical form; a loose depiction of the flower it represents using svg path elements. The color is based on the species of flower, but it is not accurate to how they really look.

Additionally, d3 transitions are used throughout the different interactions to make it smoother to navigate.

## Included files

* README.md - This file
* index.html - The html file containing the layout of the page
* a06.js - The code which generates the graphics and handles interaction in index.html
* style.css - The stylesheet containing the style for index.html
* d3.js - The D3 library used for generating and interacting with the graphics
* iris.js - The data for use in a06.js

## References

Joshua Levine - Provided skeletons for README.md, index.html, and a06.js, along with the full code in d3.js and iris.js.

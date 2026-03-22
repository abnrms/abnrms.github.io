Assignment 04
------------

Author: Hamlet Taraz [hamlet@arizona.edu](mailto:hamlet@arizona.edu)  
Date: October 1, 2025

## Notes

To run this program, simply open index.html in a modern browser (I used Chrome) with all files in the same directory.

To use the website, rather than clicking buttons, click the fun lovely dropdowns to change the features corresponding to different dimensions. The first two are the x and y axes, the third is the radius/size (with a constant option!), and the fourth is the feature corresponding to color. The last dropdown is which color scheme you would like to show.

One issue with this implementation is that you must wait for the transition to finish before changing a different feature. For example, if you change Y axis in the middle of the X axis's transition, the X axis will freeze inaccurately.

I pursued extra credit with the ability to move the datapoints along the x axis to their "Cumulative SAT" value and back, but clearly I pursued more, using dropdowns to allow for further customization than just 5 buttons. Specifically, you can customize all four dimensions of the graph with an intuitive structure.

Due to this, I don't have buttons fitting the ids requested in the spec. Specifically, there is no "colormap-button-x," "SATV," or "SAT-cumulative" ids. But I talked to Joshua Levine, and he said it was fine. Please have mercy.

## Included files

* README.md - This file
* index.html - The HTML file to open, including all other files but this one
* a04.js - The javascript file generating most everything in the HTML file
* style.css - The CSS stylesheet used in index.html
* calvinScores.js & d3.js - From Joshua Levine, the data and library used in a04.js

## References

* Joshua Levine provided calvinScores.js, d3.js, and a template for this file and index.html. Also, he provided some code for generating buttons using d3 data joins which I adapted in a04.js to work with select elements.

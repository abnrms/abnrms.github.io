Template for A02
------------

Author: Hamlet Taraz [hamlet@arizona.edu](mailto:hamlet@arizona.edu)  
Date: September 17, 2025

## Notes

To run this program, simply open index.html in a modern browser (I used Chrome). The html file loads all 3 .js files and the style.css, so do not break the directory structure.

I decided to pursue both suggested extra credit opportunities: I added tick marks, grid lines, and labels to all the scatterplots. I created a plotAxes function which takes in the parameters necessary to fit the data. With the axes, the data is all drawn in a 420x420 box, from (60, 20) to (480, 440).

I also created scatterplot 2b as a log-transformed and visually modified version of scatterplot 2. The overplotting is handled much better by the graph transformation, borders, and opacity.

In addition, I pursued an additional unlisted extra credit - color and size legends for scatterplots 2, 2b, and 3. For scatterplots 2 and 2b, I combined a color legend in the form of a gradient bar (119 1-pixel-wide lines drawn next to each other) with a size legend in the form of several circles showing the change in size. I included only the gradient in scatterplot 3. In all cases, I had to be sure that the legend didn't cover any data points on the plot.

## Included files

* README.md - this file
* index.html - the html file which loads all the others and lays out the main structure of the page
* a02.js - the javascript code that generates the plots using the data from scores.js
* style.css - the css style for the webpage
* scores.js and svg.js - provided by you!

## References

scores.js and svg.js - provided by Josh Levine

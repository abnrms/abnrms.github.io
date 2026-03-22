Assignment 10 | Hamlet Taraz
------------

Author: Hamlet Taraz [hamlet@arizona.edu](mailto:hamlet@arizona.edu)  
Date: December 8, 2025

## Notes

This program visualizes any VTK .vti scalar field in a volume renderer through HTML. It has a customizable opacity and color transfer function which will update the image live as the user edits it.

To run it, simply open index.html in a modern browser (I use Chrome) while all files are in the same directory. You can choose any of the .vti files in the datasets/ directory or pick your own using the file upload on the webpage. After uploading, you can interact with the volume rendering on the left, modify the color using th ebuttons on the top, and edit the opacity using the interactive line plot.

If the colored area under the graph can be considered for extra credit, I would greatly appreciate it.

## Included files

* README.md - This file
* index.html - The html file containing the layout of the page, to be modified by a10.js and volren.js
* a10.js - The js file using d3.js which creates the transfer function used to interact with the volume rendering
* volren.js - The js file which generates the volume rendering using VTK
* style.css - The stylesheet used to style index.html
* datasets/ - A directory containing .vti files to be used in the rendering
* d3.js & vtk.js - Libraries used in the .js files

## References

Joshua Levine - provided templates (at least) for all files except style.css and datasets/gradient\_cube.vti


//
// a08.js
// Author: Hamlet Taraz
// My implementation of Assignment 08 for CSC 444 Fall 2025 with Dr. Joshua Levine.
//   This program draws a treemap of the flare dataset provided by Jeff Heer. It has
//   four buttons on the top right which allow for the treemap to be drawn in different
//   ways, using count or size and choosing to draw the rectangles vertically or horizontally
//   by either their level or dimension.
//
// Template for CSC444 Assignment 08, Fall 2025
//   provided by Joshua A. Levine <josh@arizona.edu>
//


////////////////////////////////////////////////////////////////////////
// Global variables for the dataset

// HINT: Start with one of the smaller test datesets included in
// test-cases.js instead of the larger tree in flare.js
//let data = test_1;
//let data = test_2;
let data = flare;



////////////////////////////////////////////////////////////////////////
// Tree related helper functions

function setTreeSize(tree)
{
  if (tree.children !== undefined) {
    let size = 0;
    for (let i=0; i<tree.children.length; ++i) {
      size += setTreeSize(tree.children[i]);
    }
    tree.size = size;
  }
  if (tree.children === undefined) {
    // do nothing, tree.size is already defined for leaves
  }
  return tree.size;
};

function setTreeCount(tree)
{
  if (tree.children !== undefined) {
    let count = 0;
    for (let i=0; i<tree.children.length; ++i) {
      count += setTreeCount(tree.children[i]);
    }
    tree.count = count;
  }
  if (tree.children === undefined) {
    tree.count = 1;
  }
  return tree.count;
}

// Implemented by Hamlet Taraz, determined the depth of a tree node and sets an attribute accordingly.
function setTreeDepth(tree, depth)
{
  tree.depth = depth;
  let maxDepth = depth;
  if (tree.children !== undefined) {
    for (let i=0; i<tree.children.length; ++i) {
      maxDepth = Math.max(maxDepth, setTreeDepth(tree.children[i], depth + 1));
    }
  }
  return maxDepth;
};


// Initialize the size, count, and depth variables within the tree
setTreeSize(data);
setTreeCount(data);
let maxDepth = setTreeDepth(data, 0);



////////////////////////////////////////////////////////////////////////
// Main Code for the Treemapping Technique

// Partially implemented by Hamlet Taraz
function setRectangles(rect, tree, attrFun, chooseBestDir = false) // for best selection
{
  tree.rect = rect;

  if (tree.children !== undefined) {
    let cumulativeSizes = [0];
    for (let i=0; i<tree.children.length; ++i) {
      cumulativeSizes.push(cumulativeSizes[i] + attrFun(tree.children[i]));
    }

    let rectWidth = rect.x2 - rect.x1;
    let rectHeight = rect.y2 - rect.y1;
    let border = 5;

    let scale = d3.scaleLinear()
                  .domain([0, cumulativeSizes[cumulativeSizes.length-1]])

    // determine how to draw rectangles (Implemented by Hamlet Taraz)
    let x1f, x2f, y1f, y2f;
    if (!chooseBestDir && tree.depth % 2 == 0 || chooseBestDir && rectWidth >= rectHeight) {
        scale.range([0, rectWidth - 2 * border])
        x1f = i => rect.x1 + border + scale(cumulativeSizes[i])
        x2f = i => rect.x1 + border + scale(cumulativeSizes[i+1])
        y1f = i => rect.y1 + border
        y2f = i => rect.y2 - border
    } else {
        scale.range([0, rectHeight - 2 * border])
        x1f = i => rect.x1 + border
        x2f = i => rect.x2 - border
        y1f = i => rect.y1 + border + scale(cumulativeSizes[i])
        y2f = i => rect.y1 + border + scale(cumulativeSizes[i+1])
    }

    // draw rectangles
    for (let i=0; i<tree.children.length; ++i) {
      let newRect = { x1: x1f(i), x2: x2f(i), y1: y1f(i), y2: y2f(i) };
      setRectangles(newRect, tree.children[i], attrFun, chooseBestDir);
    }
  }
}

// initialize the tree map
let winWidth = window.innerWidth;
let winHeight = window.innerHeight;

// compute the rectangles for each tree node
setRectangles(
  {x1: 0, y1: 0, x2: winWidth, y2: winHeight}, data,
  function(t) { return t.size; }
);

// make a list of all tree nodes;
function makeTreeNodeList(tree, lst)
{
  lst.push(tree);
  if (tree.children !== undefined) {
    for (let i=0; i<tree.children.length; ++i) {
      makeTreeNodeList(tree.children[i], lst);
    }
  }
}

let treeNodeList = [];
makeTreeNodeList(data, treeNodeList);



////////////////////////////////////////////////////////////////////////
// Visual Encoding portion

// d3 selection to draw the tree map
let gs = d3.select("#svg")
           .attr("width", winWidth)
           .attr("height", winHeight)
           .selectAll("g")
           .data(treeNodeList)
           .enter()
           .append("g");

// Implemented by Hamlet Taraz - Color scale for the nodes
let colDepthScale = d3.scaleLinear()
                      .domain([0, maxDepth+1])
                      .range([d3.lab(40, -10, -20), d3.lab(110, -10, -20)])
                      .interpolate(d3.interpolateLab)

// Filled in by Hamlet Taraz
function setAttrs(sel) {
  sel.attr("width", function(treeNode) { return treeNode.rect.x2 - treeNode.rect.x1 })
     .attr("height", function(treeNode) { return treeNode.rect.y2 - treeNode.rect.y1 })
     .attr("x", function(treeNode) { return treeNode.rect.x1 })
     .attr("y", function(treeNode) { return treeNode.rect.y1 })
     .attr("fill", function(treeNode) { return colDepthScale(treeNode.depth) })
     .attr("stroke", function(treeNode) { return "black" })
}

gs.append("rect").call(setAttrs);



////////////////////////////////////////////////////////////////////////
// Callbacks for buttons

d3.select("#size").on("click", function() {
  setRectangles(
    {x1: 0, x2: winWidth, y1: 0, y2: winHeight}, data,
    function(t) { return t.size; }
  );
  d3.selectAll("rect").transition().duration(1000).call(setAttrs);
});

d3.select("#count").on("click", function() {
  setRectangles(
    {x1: 0, x2: winWidth, y1: 0, y2: winHeight}, data,
    function(t) { return t.count; }
  );
  d3.selectAll("rect").transition().duration(1000).call(setAttrs);
});

// Implemented by Hamlet Taraz - chooses to shape rectangles by dimension
d3.select("#best-size").on("click", function() {
  setRectangles(
    {x1: 0, x2: winWidth, y1: 0, y2: winHeight}, data,
    function(t) { return t.size; }, true
  );
  d3.selectAll("rect").transition().duration(1000).call(setAttrs);
});

d3.select("#best-count").on("click", function() {
  setRectangles(
    {x1: 0, x2: winWidth, y1: 0, y2: winHeight}, data,
    function(t) { return t.count; }, true
  );
  d3.selectAll("rect").transition().duration(1000).call(setAttrs);
});

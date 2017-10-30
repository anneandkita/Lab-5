function Level(plan) {
  // Use the length of a single row to set the width of the level
  this.width = plan[0].length;
  // Use the number of rows to set the height
  this.height = plan.length;

  // Store the individual tiles in our own, separate array
  this.grid = [];

  // Loop through each row in plan, creating an array in grid
  for (var y=0; y<this.height; y++)
  {
    var line = plan[y], gridLine = [];

    // Loop through each array element in the inner array for the type of tile
    for (var x=0; x<this.width; x++)
    {
      // Get the type from the character in the string. It can be
      // 'x', '!', or ' '
      // if the character is ' ', assign null
      var ch = line[x], fieldType = null;

      if (ch == 'x')
      {
        fieldType = 'wall';
      }
      else if (ch == '!')
      {
        fieldType = 'lava';
      }
      else if (ch == 'y')
      {
        fieldType = 'floater';
      }

      // Push the fieldType onto the gridLine array (at the end)
      gridLine.push(fieldType);
    }
    // Push the entire row onto the array of rows
    this.grid.push(gridLine);
  }
}

function elt(name, className) {
    var elt = document.createElement(name);
    if (className) {
      elt.className = className;
    }

    return elt;
}

function DOMDisplay(parent, level)
{
  this.wrap = parent.appendChild(elt('div', 'game'));
  this.level = level;

  this.wrap.appendChild(this.drawBackground());
}

var scale = 20;
DOMDisplay.prototype.drawBackground = function () {
  var table = elt('table', 'background');
  table.style.width = this.level.width * scale + 'px';

  // Assign a class to new row element directly from the string
  // from each tile in grid
  for (var i=0; i<this.level.grid.length; i++)
  {
    var rowElt = table.appendChild(elt('tr'));
    rowElt.style.height = scale + 'px';

    for (var j=0; j<this.level.grid[i].length; j++)
    {
      rowElt.appendChild(elt('td', this.level.grid[i][j]));
    }
  }
  return table;
}

function runLevel(level) {
  var display = new DOMDisplay(document.body, level);
}

function runGame(plans) {
  function startLevel(n) {
    // Create a new level using the nth element in array plans
    runLevel(new Level(plans[n]));
  }
  startLevel(0);
}

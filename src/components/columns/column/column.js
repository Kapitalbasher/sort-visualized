import randomID from "./../../randomid.js";

class Column {
  constructor(width, index) {
    this.width = width;
    this.height = null;
    this.setHeight = null;
    this.setSelected = null;
    this.selected = null;
    this.blink = null;
    this.index = index;
    this.id = randomID();
  }
  getColumnByIndexDOM(index) {
    return document.querySelector(`[index="${index}"]`);
  }
  getColumnByIndex(arr, index) {
    for (let v of arr) {
      if (v.index === index) {
        return v;
      }
    }
    return null;
  }
  _animate(direction = "left") {
    const column = this.getColumnByIndexDOM(this.index);
    // since the real width may actually differ the correct one is got here
    const width = column.getBoundingClientRect().width;
    let keyframes = null;

    if (direction === "left") {
      // move column left by using the width's negative value
      keyframes = [
        { transform: `translateX(0px)` },
        { transform: `translateX(${width - width * 2}px)` },
        { transform: `translateX(${width - width * 2}px)` },
      ];
    } else {
      keyframes = [
        { transform: `translateX(0px)` },
        { transform: `translateX(${width}px)` },
        { transform: `translateX(${width}px)` },
      ];
    }
    let animation = column.animate(keyframes, {
      // timing options
      duration: 1000,
      iterations: 1,
    });
    this.setSelected(true);
    animation.finished.then(() => {
      this.setSelected(false);
    });
    animation.pause();
    return animation;
  }
  switch(c1, c2) {
    // for whatever reason the function got called with an invalid object so i just filtered it out
    if (c1.height === null) {
      return;
    }
    let temp = c1.height;
    c1.setHeight(c2.height);
    c2.setHeight(temp);
  }
}

//const sort = new sortAlgorithms.bubble([5, 10, 1, 9, 2, 8, 3, 7, 4, 6], 1);
//console.log(sort.sort());
function possibleColumns(width) {
  return (window.innerWidth - window.innerWidth / 5) / width;
}
function getColumns(width) {
  // get amout of columns that fit in 80% with the specified width
  const columnAmout = possibleColumns(width);
  var columnList = [];
  for (let i = 0; i < columnAmout; i++) {
    columnList.push(new Column(width, i));
  }
  return columnList;
}

export { Column, possibleColumns, getColumns };

import { getColumns } from "./column/column.js";
(function () {
  var timeouts = [];
  var messageName = "zero-timeout-message";

  // Like setTimeout, but only takes a function argument.  There's
  // no time argument (always zero) and no arguments (you have to
  // use a closure).
  function setZeroTimeout(fn) {
    timeouts.push(fn);
    window.postMessage(messageName, "*");
  }

  function handleMessage(event) {
    if (event.source === window && event.data === messageName) {
      event.stopPropagation();
      if (timeouts.length > 0) {
        var fn = timeouts.shift();
        fn();
      }
    }
  }

  window.addEventListener("message", handleMessage, true);

  // Add the one thing we want added to the window object.
  window.setZeroTimeout = setZeroTimeout;
})();
class Sort {
  constructor() {
    this.array = null;
    this.speed = 1;
    this.width = window.innerWidth / 25; //25 Columns (-20%)
    this.animations = [];
    this.sorting = false;
    this.sorted = false;
    this.setSorting = null;
    this.currentSort = this.bubble;
    this.setInformation = null;
    this.setFreezed = null;
    this.currentAlgorithmName = "bubble";
    this.algorithms = [
      {
        bigO: "O(n^2)",
        description:
          "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.",

        source: "https://www.geeksforgeeks.org/bubble-sort/",
        name: "bubble",
        function: this.bubble,
      },
      {
        bigO: " O(n^2)",
        description:
          "Insertion Sort is one of the simpler sorting algorithms. It's highly intuitive, stable, in-place, and of comparison-type.",
        name: "insertion",
        source: "https://stackabuse.com/insertion-sort-in-javascript/",
        function: this.insertion,
      },
      {
        bigO: " O(!n)",
        description:
          "In computer science, bogosort[1][2] (also known as permutation sort, stupid sort,[3] slowsort,[4] shotgun sort, random sort, monkey sort, bobosort or shuffle sort) is a highly inefficient sorting algorithm based on the generate and test paradigm.",
        name: "bogo",
        source: "https://en.wikipedia.org/wiki/Bogosort",
        function: this.bogo,
      },
    ];
  }
  checkSorted() {
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i + 1] === undefined) return true;
      if (this.array[i].height <= this.array[i + 1].height) {
        continue;
      } else {
        return false;
      }
    }
  }
  switch(c1, c2) {
    const speed = this.speed;
    return new Promise((resolve, reject) => {
      // this.array includes the prototype of the Column class
      let column1 = this.array[0].getColumnByIndex(this.array, c1);
      let column2 = this.array[0].getColumnByIndex(this.array, c2);
      // if width below a certain number the freeze works with callback because the animation is not used anymore
      if (column1.width < 5) {
        window.setZeroTimeout(() => {
          if (this.sorting === false) return;
          this.array[0].switch(column1, column2);
          if (this.freezed) {
            this.freezeCallback = () => {
              resolve(true);
            };
          } else {
            return resolve(true);
          }
        });
      } else {
        var animation1 = column1._animate("left");
        var animation2 = column2._animate("right");
        animation1.playbackRate = speed;
        animation2.playbackRate = speed;
        animation1.play();
        animation2.play();
        this.animations = [animation1, animation2];
        animation2.onfinish = () => {
          this.array[0].switch(column1, column2);
          if (this.sorting === false) return;
          return resolve(true);
        };
      }
    });
  }
  changePlaybackRate(rate) {
    for (let animation of this.animations) {
      animation.playbackRate = rate;
    }
  }
  pauseAnimations() {
    for (let animation of this.animations) {
      animation.pause();
    }
  }
  continueAnimations() {
    for (let animation of this.animations) {
      animation.play();
    }
  }
  abruptStop() {
    this.sorting = false;
    this.pauseAnimations();
    this.setSorting(false);
    this.animations = [];
  }
  stop() {
    return new Promise((resolve, reject) => {
      this.sorting = false;

      this.setSorting(false);
      if (this.animations.length < 1) resolve(false);
      this.animations[0].onfinish = () => {
        resolve(true);
      };
    });
  }
  // high level wrapper for a switch of columns in the Columns Class
  // animates and switches height

  switchSort(algorithm) {
    this.currentSort = algorithm;
  }
  endSort() {
    this.sorting = false;
    this.sorted = true;
    for (let v of this.array) {
      v.setBlink(true);
    }
    setTimeout(() => {
      if (this.loop === true) {
        this.setColumnList(getColumns(this.width));
        this.currentSort();
      }
    }, 1500);
  }
  async sort() {
    return await this.currentSort();
  }
  async bubble() {
    this.sorting = true;
    let arr = this.array;
    for (let j = 0; j < arr.length; j++) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i + 1] === undefined) continue;
        if (arr[i].height > arr[i + 1].height) {
          if (this.sorting === false) return;
          await this.switch(i, i + 1);
        }
      }
    }

    this.endSort();
    return arr;
  }
  bogo() {
    let array = this.array;
    // let heights = array.map((val) => {
    //   return val.height;
    // });
    let heights = [];
    let temp = [...array];
    for (let i of temp) {
      heights.push(i.height);
    }
    let randomHeight = 0;
    array.map((val, index) => {
      randomHeight = heights[Math.floor(Math.random() * heights.length)];
      val.setHeight(randomHeight);
    });
  }
  insertion() {
    let n = this.array.length;
    let inputArr = this.array;
    for (let i = 1; i < n; i++) {
      // Choosing the first element in our unsorted subarray
      let current = inputArr[i].height;
      // The last element of our sorted subarray
      let j = i - 1;
      while (j > -1 && current < inputArr[j].height) {
        inputArr[j + 1].height = inputArr[j].height;
        j--;
      }
      inputArr[j + 1].height = current;
    }
    return inputArr;
  }
}
export default Sort;

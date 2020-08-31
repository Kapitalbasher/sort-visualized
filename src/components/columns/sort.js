//switches the column to the specified _new index and puts the existing one in the index of that the switched element had before, and animates it

class Sort {
  constructor(array, speed) {
    this.speed = speed;
    this.array = array;
  }
  switch(_new) {}

  animate() {}
}

class Bubble extends Sort {
  // constructor(array, speed) {
  //   super(array, speed);
  // }
  sort() {
    let arr = this.array;
    for (let j = 0; j < arr.length; j++) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i + 1]) {
          var temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
      }
    }
    return arr;
  }
}

const sortAlgorithms = { bubble: Bubble };

export default sortAlgorithms;

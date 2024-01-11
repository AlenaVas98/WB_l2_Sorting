const container = document.getElementById("container");

const numBars = document.getElementById("numBars");
const speed = document.getElementById("speed");

const initButton = document.getElementById("init");
const playButton = document.getElementById("play");

const shell = document.getElementById("shell");
const comb = document.getElementById("comb");
const cycle = document.getElementById("cycle");
const sample = document.getElementById("sample");
const bubble = document.getElementById("bubble");

let speedBox = document.getElementById("speedBox");
let numBarsBox = document.getElementById("numBarsBox");
let playBox = document.getElementById("playBox");
let pBars = document.createElement("p");
let pSpeed = document.createElement("p");
let pPlay = document.createElement("p");

numBars.disabled = true;
speed.disabled = true;

let NUMBERS_COUNT = 0;
let speedBars = 0;
let numbers = [];
let sorts;
/// выбор сортировки
shell.addEventListener("click", () => {
  sorts = "shell";
  shell.classList.add("active");
  bubble.classList.remove("active");
  comb.classList.remove("active");
  cycle.classList.remove("active");
  sample.classList.remove("active");

  numBars.disabled = false;
  speed.disabled = false;
});
bubble.addEventListener("click", () => {
  sorts = "bubble";
  bubble.classList.add("active");
  shell.classList.remove("active");
  comb.classList.remove("active");
  sample.classList.remove("active");
  cycle.classList.remove("active");
  numBars.disabled = false;
  speed.disabled = false;
});
comb.addEventListener("click", () => {
  sorts = "comb";
  comb.classList.add("active");
  bubble.classList.remove("active");
  shell.classList.remove("active");
  sample.classList.remove("active");
  cycle.classList.remove("active");
  numBars.disabled = false;
  speed.disabled = false;
});
cycle.addEventListener("click", () => {
  sorts = "cycle";
  cycle.classList.add("active");
  bubble.classList.remove("active");
  comb.classList.remove("active");
  shell.classList.remove("active");
  sample.classList.remove("active");
  numBars.disabled = false;
  speed.disabled = false;
});
sample.addEventListener("click", () => {
  sorts = "sample";
  sample.classList.add("active");
  bubble.classList.remove("active");
  comb.classList.remove("active");
  shell.classList.remove("active");
  cycle.classList.remove("active");
  numBars.disabled = false;
  speed.disabled = false;
});
// создание массива
numBars.addEventListener("input", () => {
  numbers = [];
  NUMBERS_COUNT = numBars.value;
  for (let i = 1; i <= NUMBERS_COUNT; i++) {
    numbers.push(i);
  }
});
//  выбор скорости
speed.addEventListener("input", () => {
  speedBars = speed.value;
});

// отрисовка
function init() {
  pBars.innerHTML = "";
  pSpeed.innerHTML = "";
  pPlay.innerHTML = "";
  numbers.sort(() => Math.random() - 0.5);
  showBars();
}
// запуск анимации
function play() {
  pPlay.innerHTML = "";
  const copy = [...numbers];
  let moves;
  if (sorts === "shell") {
    moves = shellSort(copy);
  } else if (sorts === "bubble") {
    moves = bubbleSort(copy);
  } else if (sorts === "comb") {
    moves = combSort(copy);
  } else if (sorts === "cycle") {
    moves = cycleSort(copy);
  } else if (sorts === "sample") {
    moves = sampleSort(copy);
  }
  animate(moves);
}

function animate(moves) {
  if (moves.length == 0) {
    showBars();
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type === "swap") {
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  showBars(move);
  setTimeout(function () {
    animate(moves);
  }, speedBars);
}

// Сортировки
///==============================================  1
function bubbleSort(arr) {
  const moves = [];
  do {
    var swapped = false;
    for (let i = 0; i < arr.length; i++) {
      moves.push({ indices: [i - 1, i], type: "comp" });
      if (arr[i - 1] > arr[i]) {
        swapped = true;
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        moves.push({ indices: [i - 1, i], type: "swap" });
      }
    }
  } while (swapped);
  return moves;
}
///==============================================  2
function sampleSort(arr) {
  const moves = [];
  for (let n = 0; n < arr.length - 1; n++) {
    let max = -Infinity;
    let index = null;
    for (let i = 0; i < arr.length - n; i++) {
      if (arr[i] > max) {
        moves.push({ indices: [index, arr.length - 1 - n], type: "comp" });
        max = arr[i];
        index = i;
      }
    }
    const buff = arr[arr.length - 1 - n];
    arr[arr.length - 1 - n] = max;
    arr[index] = buff;
    moves.push({ indices: [index, arr.length - 1 - n], type: "swap" });
  }
  return moves;
}
///==============================================  3

function cycleSort(arr) {
  let moves = [];
  for (let cycleStart = 0; cycleStart < arr.length; cycleStart++) {
    let value = arr[cycleStart];
    let position = cycleStart;
    moves.push({ indices: [position, cycleStart], type: "comp" });

    for (let i = cycleStart + 1; i < arr.length; i++) {
      if (arr[i] < value) {
        position++;
      }
    }
    if (position === cycleStart) {
      continue;
    }
    while (value === arr[position]) {
      position++;
    }

    const oldValue = arr[position];
    arr[position] = value;
    value = oldValue;
    while (position !== cycleStart) {
      moves.push({ indices: [position, cycleStart], type: "swap" });
      position = cycleStart;
      for (let i = cycleStart + 1; i < arr.length; i++) {
        if (arr[i] < value) {
          position++;
        }
      }
      while (value === arr[position]) {
        position++;
      }
      const oldValueCycle = arr[position];
      arr[position] = value;
      value = oldValueCycle;
    }
  }
  return moves;
}
///==============================================  4
function shellSort(array) {
  const moves = [];
  for (
    let step = Math.floor(array.length / 2);
    step > 0;
    step = Math.floor(step / 2)
  ) {
    for (let pass = step; pass < array.length; pass++) {
      for (
        let replacment = pass - step;
        replacment >= 0 && array[replacment] > array[replacment + step];
        replacment -= step
      ) {
        moves.push({ indices: [replacment, replacment + step], type: "comp" });
        let tmp = array[replacment];
        array[replacment] = array[replacment + step];
        array[replacment + step] = tmp;
        moves.push({ indices: [replacment, replacment + step], type: "swap" });
      }
    }
  }
  return moves;
}
///==============================================  5

function getNextGap(gap) {
  gap = parseInt((gap * 10) / 13, 10);
  if (gap < 1) return 1;
  return gap;
}

function combSort(arr) {
  let moves = [];
  let n = arr.length;

  let gap = n;

  let swapped = true;

  while (gap != 1 || swapped == true) {
    gap = getNextGap(gap);

    swapped = false;

    for (let i = 0; i < n - gap; i++) {
      if (arr[i] > arr[i + gap]) {
        moves.push({ indices: [i + gap, i], type: "comp" });
        let temp = arr[i];
        arr[i] = arr[i + gap];
        arr[i + gap] = temp;

        moves.push({ indices: [i + gap, i], type: "swap" });
        swapped = true;
      }
    }
  }
  return moves;
}
//============================

// визуализация столбцов

function showBars(move) {
  container.innerHTML = " ";
  for (let b = 0; b < numbers.length; b++) {
    let div = document.createElement("div");
    div.style.height = numbers[b] * 10 + "px";
    div.classList.add("bar");
    if (move && move.indices.includes(b)) {
      div.style.backgroundColor = move.type == "swap" ? "red" : "blue";
    }
    container.appendChild(div);
  }
}

initButton.addEventListener("click", () => {
  if (speed.value === "" || numBars.value === "") {
    pSpeed.innerHTML = "Введите скорость";
    pBars.innerHTML = "Введите количество столбцов";

    pBars.style.color = "red";
    pSpeed.style.color = "red";

    numBarsBox.appendChild(pBars);
    speedBox.appendChild(pSpeed);
  } else if (numBars.value === "") {
    pBars.innerHTML = "Введите количество столбцов";
    pBars.style.color = "red";

    numBarsBox.appendChild(pBars);
  } else if (speed.value === "") {
    pSpeed.innerHTML = "Введите скорость";
    pSpeed.style.color = "red";
    speedBox.appendChild(pSpeed);
  } else {
    init();
  }
});
const isSorted = (numbers) => numbers.every((v, i, a) => !i || a[i - 1] <= v);

playButton.addEventListener("click", () => {
  if (speed.value === "" && numBars.value === "") {
    pPlay.innerHTML = "Сначала создайте массив";
    pPlay.style.color = "red";
    playBox.appendChild(pPlay);
  } else if (isSorted(numbers) === true) {
    console.log(isSorted);
    pPlay.innerHTML = "Сначала новый массив";
    pPlay.style.color = "red";
    playBox.appendChild(pPlay);
  } else {
    play();
  }
});

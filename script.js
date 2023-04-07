const imgEl = document.querySelector(".img");
const titleEl = document.querySelector(".title");
const authorEl = document.querySelector(".author");
const durationActualEl = document.querySelector(".duration__actual");
const durationLengthEl = document.querySelector(".duration__length");
const backwardBtnEl = document.querySelector("#backward");
const playOrPauseBtnEl = document.querySelector("#playOrPause");
const forwardBtnEl = document.querySelector("#forward");
const audioEl = document.querySelector("#audio");
const playerEl = document.querySelector(".player-container");

const musicData = {
  0: {
    title: "Abstract Fashion Pop",
    author: "QubeSounds",
    img: "jacinto-1",
  },
  1: {
    title: "Ambient Classical Guitar",
    author: "William King",
    img: "jacinto-2",
  },
  2: {
    title: "Taking Our Time",
    author: "Alex Grohl",
    img: "jacinto-3",
  },
};

let musicId = 0;
let playStatus = false;

const titleLength = function () {
  musicData[musicId].title.length <= 16
    ? (playerEl.style.cssText = `padding: 22rem 5rem 5rem 5rem`)
    : (playerEl.style.cssText = `padding: 20rem 5rem 5rem 5rem`);
};

(function () {
  imgEl.setAttribute("src", "./img/jacinto-0.jpg");
  titleEl.textContent = `${musicData[0].title}`;
  authorEl.textContent = `${musicData[0].author}`;
  titleLength();
})();

const playAudio = function () {
  audioEl.play();
  playOrPauseBtnEl.children[0].setAttribute(
    "href",
    `./sprites/solid.svg#pause`
  );
};

const pauseAudio = function () {
  audioEl.pause();
  playOrPauseBtnEl.children[0].setAttribute("href", `./sprites/solid.svg#play`);
};

const playorPauseAudio = function () {
  !playStatus ? playAudio() : pauseAudio();
  playStatus = !playStatus;
};

const chooseAudio = function (idNumber) {
  musicId = idNumber;
  imgEl.setAttribute("src", `./img/jacinto-${musicId}.jpg`);
  titleEl.textContent = `${musicData[musicId].title}`;
  authorEl.textContent = `${musicData[musicId].author}`;
  audioEl.setAttribute(
    "src",
    `./music/${musicData[musicId].title.split(" ").join("-").toLowerCase()}.mp3`
  );
  playAudio();
  playStatus = true;
  titleLength();
};

const playNextAudio = function () {
  musicId === Object.keys(musicData).length - 1
    ? chooseAudio(0)
    : chooseAudio(musicId + 1);
};

const playPreviousAudio = function () {
  musicId === 0
    ? chooseAudio(Object.keys(musicData).length - 1)
    : chooseAudio(musicId - 1);
};

playOrPauseBtnEl.addEventListener("click", playorPauseAudio);
backwardBtnEl.addEventListener("click", playPreviousAudio);
forwardBtnEl.addEventListener("click", playNextAudio);

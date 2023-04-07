const imgEl = document.querySelector(".img");
const titleEl = document.querySelector(".title");
const authorEl = document.querySelector(".author");
const durationCurrentEl = document.querySelector(".duration__current");
const durationEl = document.querySelector(".duration");
const backwardBtnEl = document.querySelector("#backward");
const playOrPauseBtnEl = document.querySelector("#playOrPause");
const forwardBtnEl = document.querySelector("#forward");
const audioEl = document.querySelector("#audio");
const playerEl = document.querySelector(".player-container");
const progressBarEl = document.querySelector(".progress-bar");
const progressBarCurrentEl = document.querySelector(".progress-bar__current");

const musicData = {
  0: {
    title: "Abstract Fashion Pop",
    author: "QubeSounds",
  },
  1: {
    title: "Ambient Classical Guitar",
    author: "William King",
  },
  2: {
    title: "Taking Our Time",
    author: "Alex Grohl",
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
  audioEl.setAttribute("src", `./music/abstract-fashion-pop.mp3`);
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
  playStatus = true;
};

const pauseAudio = function () {
  audioEl.pause();
  playOrPauseBtnEl.children[0].setAttribute("href", `./sprites/solid.svg#play`);
  playStatus = false;
};

const playorPauseAudio = function () {
  !playStatus ? playAudio() : pauseAudio();
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

const showTimeUpdate = function () {
  const { duration, currentTime } = this;
  if (duration) {
    let minutes = Math.trunc(currentTime / 60);
    let seconds = Math.trunc(this.currentTime % 60)
      .toString()
      .padStart(2, "0");
    durationCurrentEl.textContent = `${minutes}:${seconds}`;
    progressBarCurrentEl.style.width = `${(currentTime / duration) * 100}%`;
  }
};

const audioFinished = function () {
  durationCurrentEl.textContent = `0:00`;
  progressBarCurrent.style.width = `0%`;
  playStatus = false;
  playOrPauseBtnEl.children[0].setAttribute("href", `./sprites/solid.svg#play`);
};

const chooseAudioProgress = function (e) {
  let progressBarCurrent = (e.offsetX / this.clientWidth) * audioEl.duration;
  audioEl.currentTime = progressBarCurrent;
  playAudio();
};

const setAudioDuration = function () {
  durationEl.textContent = `${Math.trunc(this.duration / 60)}:${Math.trunc(
    this.duration % 60
  )}`;
};

playOrPauseBtnEl.addEventListener("click", playorPauseAudio);
backwardBtnEl.addEventListener("click", playPreviousAudio);
forwardBtnEl.addEventListener("click", playNextAudio);
audioEl.addEventListener("loadeddata", setAudioDuration);
audioEl.addEventListener("timeupdate", showTimeUpdate);
audioEl.addEventListener("ended", audioFinished);
progressBarEl.addEventListener("click", chooseAudioProgress);

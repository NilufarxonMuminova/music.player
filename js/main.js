const bars = document.querySelector(".bars");
const modal = document.querySelector(".modal");
const x = document.querySelector(".x");
const title = document.querySelector(".title");
const audio = document.querySelector(".audio");
const main_img = document.querySelector(".main_img");
const previous = document.querySelector(".previous");
const play = document.querySelector(".stop");
const next = document.querySelector(".next");
const img = document.querySelector(".img");
const line = document.querySelector(".line");
const start = document.querySelector(".start");
const end = document.querySelector(".end");
const chiziq = document.querySelector(".continue");
const player = document.querySelector(".player");
const volume = document.querySelector(".volume");
const musicModal = document.querySelectorAll(".music");
const list = document.querySelector(".list");

var musics = ["Devonasan", "Gibran_Alcocer", "Jony", "Miyagi"];

bars.addEventListener("click", () => {
  modal.classList.add("active");
});
x.addEventListener("click", () => {
  modal.classList.remove("active");
});


var index = 0;
const loadsong = (index) => {
  main_img.setAttribute("src", `./Muzik Pley♪🔇/imgs/${musics[index]}.jpg`);
  title.textContent = musics[index];
  audio.setAttribute("src", `./Muzik Pley♪🔇/musics/${musics[index]}.mp3`);
};
loadsong(index);

const selected = (index) => {
  loadsong(index);
  audio.play();
  img.classList.add("active");
  modal.classList.remove("active");
  play.innerHTML = `<i class="fa-solid fa-pause"></i> `;
};

previous.addEventListener("click", () => {
  if (index <= 0) {
    index = musics.length - 1;
    loadsong(index);
  } else if (index <= musics.length - 1) {
    index--;
    loadsong(index);
  }
  img.classList.add("active");
  play.innerHTML = `<i class="fa-solid fa-pause"></i> `;
  audio.play();
});

play.addEventListener("click", () => {
  img.classList.toggle("active");
  if (img.classList.contains("active")) {
    play.innerHTML = `<i class="fa-solid fa-pause"></i> `;
    audio.play();
  } else {
    play.innerHTML = `<i class="fa-solid fa-play"></i>`;
    audio.pause();
  }
});

const nextMusic = () => {
  if (index < musics.length - 1) {
    index++;
    loadsong(index);
  } else {
    index = 0;
    loadsong(index);
  }
  img.classList.add("active");
  play.innerHTML = `<i class="fa-solid fa-pause"></i> `;
  audio.play();
};
next.addEventListener("click", () => {
  nextMusic();
});

const progress = (e) => {
  var curTime = e.srcElement.currentTime;
  var duration = e.srcElement.duration;
  var percent = (curTime * 100) / duration;
  line.style = ` width: ${percent}%;`;
  var endMinute = Math.floor(duration / 60);
  var endSecond = Math.floor(duration % 60);

  if (endMinute && endSecond) {
    end.innerHTML = `${endMinute < 10 ? "0" + endMinute : endMinute} : ${
      endSecond < 10 ? "0" + endSecond : endSecond
    }`;
  } else {
    end.innerHTML = `00: 00`;
  }

  var startMinute = Math.floor(curTime / 60);
  var startSecond = Math.floor(curTime % 60);
  start.innerHTML = `${startMinute < 10 ? "0" + startMinute : startMinute}:${
    startSecond < 10 ? "0" + startSecond : startSecond
  }`;
};

audio.addEventListener("timeupdate", (e) => {
  progress(e);
});

musics.forEach((item, index) => {
  list.innerHTML += `
  <button onclick = "selected(${index})" class="music">
  <i class="fa-solid fa-music"></i>
  <div class="name1">
      ${item}
  </div>           
  </button>
  `;
});

chiziq.addEventListener("click", (e) => {
  audio.currentTime = (e.offsetX * audio.duration) / chiziq.clientWidth;
});

audio.addEventListener("ended", () => {
  nextMusic();
});

volume.addEventListener("input", () => {
  audio.volume = volume.value / 100;
});

document.addEventListener("keydown", (e) => {
  if (e.keyCode==39) {
    nextMusic()
  }
  // else if (e.keyCode==) {
    
  // }
});

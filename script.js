// Get the "return to top" button element
var returnToTopButton = document.getElementById('returnToTop');

// Function to scroll to the top of the page
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}


// Function to toggle the visibility of the "return to top" button
function toggleReturnToTopButton() {
  if (window.scrollY > 200) {
    returnToTopButton.classList.add('active');
  } else {
    returnToTopButton.classList.remove('active');
  }
}

// Add event listeners
window.addEventListener('scroll', toggleReturnToTopButton);
returnToTopButton.addEventListener('click', scrollToTop);

//! dark mode

const header = document.querySelector(".header");
const toggle = document.querySelector(".toggle-mode");
const body = document.querySelector("body");
const paragraph = document.querySelector("p");
const links = document.querySelectorAll(".nav-link");
const title = document.querySelectorAll("h2");
const para = document.querySelectorAll(".para");
const pcol = document.querySelector(".col-2 p");
if (localStorage.getItem("dark-mode") == "true") {
  body.classList.add("dark-mode");
  header.classList.add("header-dark-mode");
  paragraph.classList.add("header-dark-mode");
  links.forEach(function (e) {
    e.classList.add("header-dark-mode");
  });
  document.querySelector(`.sun`).style.display = "inline-block";
  document.querySelector(`.moon`).style.display = "none";
  title.forEach(function (e) {
    e.classList.add("dark-mode");
  });
}

toggle.addEventListener("click", function (e) {
  const nextIcon = e.target.getAttribute("data-set");
  e.target.style.display = "none";
  console.log(nextIcon);
  //   document.querySelector("")
  if (nextIcon === "sun") {
    body.classList.add("dark-mode");
    header.classList.add("header-dark-mode");
    paragraph.classList.add("header-dark-mode");
    pcol.style.color="white";
    links.forEach(function (e) {
      e.classList.add("header-dark-mode");
    });
    document.querySelector(`.${nextIcon}`).style.display = "inline-block";
    title.forEach(function (e) {
      e.classList.add("dark-mode");
    });
    localStorage.setItem("dark-mode", true);
  } else {
    body.classList.remove("dark-mode");
    header.classList.remove("header-dark-mode");
    paragraph.classList.remove("header-dark-mode");
    pcol.style.color="black";
    links.forEach(function (e) {
      e.classList.remove("header-dark-mode");
    });
    document.querySelector(`.${nextIcon}`).style.display = "inline-block";
    title.forEach(function (e) {
      e.classList.remove("dark-mode");
    });
    localStorage.setItem("dark-mode", false);
  }
});


// Script for to get Github contributors list
const contributors = document.getElementById("contributors");
const repo = "Engineering-Notes-Website";
const owner = "NageshMandal";
const apiURL = `https://api.github.com/repos/${owner}/${repo}/contributors`;


function displayContributors(contributorsList) {
  contributorsList.forEach((contributor) => {
    // create anchor tag and set relevant attributes
    const link = document.createElement("a");
    link.setAttribute("href", contributor.html_url);
    link.setAttribute("target", "_blank");

    // create image element and set relevant attributes
    const avatar = document.createElement("img");
    avatar.setAttribute("class", "avatar");
    avatar.setAttribute("src", contributor.avatar_url);
    avatar.setAttribute("title", contributor.login);
    avatar.setAttribute("alt", contributor.login);

    link.appendChild(avatar);
    contributors.appendChild(link);
  });
}

// get contributors list  from github API
async function getContributorsList() {
  try {
    const response = await fetch(apiURL);
    const contributors = await response.json();
    displayContributors(contributors);
  } catch (error) {
    console.log(error);
  }
}


getContributorsList();

// Search bar functionality
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchTerm = searchInput.value.toLowerCase();
  searchContributors(searchTerm);
});

function searchContributors(searchTerm) {
  const contributorLinks = contributors.getElementsByTagName("a");
  for (const link of contributorLinks) {
    const username = link.getAttribute("title").toLowerCase();
    if (username.includes(searchTerm)) {
      link.style.display = "inline-block";
    } else {
      link.style.display = "none";
    }
  }
}

function randomInteger(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generate_default(item) {
  return `let <span style="color:#f3f3f3">domElement</span> = document.<span style="color: #f3f3f3">getElementById("<span style="color: #009926">elementId</span>")</span>;<br>
          <span style="color:#f3f3f3">domElement</span>.${item}();`;
}

function generate_code(item, time = 600) {
  return `let <span style="color:#f3f3f3">domElement</span> = document.<span style="color: #f3f3f3">getElementById("<span style="color: #009926">elementId</span>")</span>;<br>
          <span style="color:#f3f3f3">domElement</span>.${item}(<span style="color: #009926">${time}</span>);`;
}

function get_animator() {
  return 'let <span style="color:#f3f3f3">domElement</span> = document.<span style="color: #f3f3f3">getElementById("<span style="color: #009926">elementId</span>")</span>;<br>' +
      '<span style="color:#f3f3f3">domElement</span>.animator(<span style="color: #009926">FancyAnimation.moveIn, FancyAnimation.rubberBand, 600</span>)'
}

function display_code(code) {
  code_text.innerHTML = code;
  code_text.style.display = "";
}

let CURRENT = "";

let anim = document.getElementById("anim");
let code_text = $("#generate_code")[0];

$("#time").click(function () {
  let time_value = document.getElementById("time_duration").value;
  if (time_value !== "") {
      if (CURRENT !== "") {
          RANDOM_ANIM[CURRENT](parseInt(time_value));
          display_code(generate_code(CURRENT, time_value));
      } else {
          anim.animator();
          display_code(get_animator());
      }
  } else {
      if (CURRENT !== "") {
          RANDOM_ANIM[CURRENT]();
          display_code(generate_default(CURRENT))
      } else {
          anim.animator();
          display_code(get_animator());
      }
  }
});

$('.dropdown')
  .dropdown({
      onChange: function (value, text, $selectedItem) {
          let getValue = String(text).replace('<i class="html5 icon yellow"></i>', "");
          //console.log(getValue);
          CURRENT = getValue.replace(" ", "");
          let time_value = document.getElementById("time_duration").value;
          if (time_value !== "") {
              RANDOM_ANIM[CURRENT](parseInt(time_value));
              display_code(generate_code(CURRENT, time_value));
          } else {
              RANDOM_ANIM[CURRENT]();
              display_code(generate_default(CURRENT))
          }
      }
  })
;

let RANDOM_ANIM = {
  bounce: (time = 600) => {
      anim.bounce(time);
  }, flash: (time = 600) => {
      anim.flash(time);
  }, pulse: (time = 600) => {
      anim.pulse(time);
  }, headShake: (time = 600) => {
      anim.headShake(time);
  }, wobble: (time = 600) => {
      anim.wobble(time);
  }, jello: (time = 600) => {
      anim.jello(time);
  }, bounceIn: (time = 600) => {
      anim.bounceIn(time);
  }, bounceInDown: (time = 600) => {
      anim.bounceInDown(time);
  }, bounceInLeft: (time = 600) => {
      anim.bounceInLeft(time);
  }, bounceInRight: (time = 600) => {
      anim.bounceInRight(time);
  }, bounceInUp: (time = 600) => {
      anim.bounceInUp(time);
  }, bounceOut: (time = 600) => {
      anim.bounceOut(time);
  }, bounceOutDown: (time = 600) => {
      anim.bounceOutDown(time);
  }, bounceOutUp: (time = 600) => {
      anim.bounceOutUp(time);
  }, fadeIn: (time = 600) => {
      anim.fadeIn(time);
  }, fadeInDown: (time = 600) => {
      anim.fadeInDown(time);
  }, fadeInDownBig: (time = 600) => {
      anim.fadeInDownBig(time);
  }, fadeInLeft: (time = 600) => {
      anim.fadeInLeft(time);
  }, fadeInLeftBig: (time = 600) => {
      anim.fadeInLeftBig(time);
  }, fadeInRight: (time = 600) => {
      anim.fadeInRight(time);
  }, fadeInRightBig: (time = 600) => {
      anim.fadeInRightBig(time);
  }, fadeInUp: (time = 600) => {
      anim.fadeInUp(time);
  }, fadeInUpBig: (time = 600) => {
      anim.fadeInUpBig(time);
  }, fadeOutDown: (time = 600) => {
      anim.fadeOutDown(time);
  }, fadeOutDownBig: (time = 600) => {
      anim.fadeOutDownBig(time);
  }, fadeOutLeftBig: (time = 600) => {
      anim.fadeOutLeftBig(time);
  }, fadeOutRightBig: (time = 600) => {
      anim.fadeOutRightBig(time);
  }, fadeOutUp: (time = 600) => {
      anim.fadeOutUp(time);
  }, fadeOutUpBig: (time = 600) => {
      anim.fadeOutUpBig(time);
  }, flipInX: (time = 600) => {
      anim.flipInX(time);
  }, flipInY: (time = 600) => {
      anim.flipInY(time);
  }, flipOutX: (time = 600) => {
      anim.flipOutX(time);
  }, flipOutY: (time = 600) => {
      anim.flipOutY(time);
  }, lightSpeedIn: (time = 600) => {
      anim.lightSpeedIn(time);
  }, lightSpeedOut: (time = 600) => {
      anim.lightSpeedOut(time);
  }, rotateIn: (time = 600) => {
      anim.rotateIn(time);
  }, rotateInDownLeft: (time = 600) => {
      anim.rotateInDownLeft(time);
  }, rotateInDownRight: (time = 600) => {
      anim.rotateInDownRight(time);
  }, rotateInUpLeft: (time = 600) => {
      anim.rotateInUpLeft(time);
  }, rotateInUpRight: (time = 600) => {
      anim.rotateInUpRight(time);
  }, rotateOut: (time = 600) => {
      anim.rotateOut(time);
  }, rotateOutDownLeft: (time = 600) => {
      anim.rotateOutDownLeft(time);
  }, rotateOutDownRight: (time = 600) => {
      anim.rotateOutDownRight(time);
  }, rotateOutUpLeft: (time = 600) => {
      anim.rotateOutUpLeft(time);
  }, rotateOutUpRight: (time = 600) => {
      anim.rotateOutUpRight(time);
  }, jackInTheBox: (time = 600) => {
      anim.jackInTheBox(time);
  }, rollIn: (time = 600) => {
      anim.rollIn(time);
  }, rollOut: (time = 600) => {
      anim.rollOut(time);
  }, zoomInDown: (time = 600) => {
      anim.zoomInDown(time);
  }, zoomInLeft: (time = 600) => {
      anim.zoomInLeft(time);
  }, zoomInRight: (time = 600) => {
      anim.zoomInRight(time);
  }, zoomInUp: (time = 600) => {
      anim.zoomInUp(time);
  }, zoomOutDown: (time = 600) => {
      anim.zoomOutDown(time);
  }, zoomOutLeft: (time = 600) => {
      anim.zoomOutLeft(time);
  }, zoomOutRight: (time = 600) => {
      anim.zoomOutRight(time);
  }, zoomOutUp: (time = 600) => {
      anim.zoomOutUp(time);
  }, slideInDown: (time = 600) => {
      anim.slideInDown(time);
  }, slideInLeft: (time = 600) => {
      anim.slideInLeft(time);
  }, slideInRight: (time = 600) => {
      anim.slideInRight(time);
  }, slideInUp: (time = 600) => {
      anim.slideInUp(time);
  }, slideOutDown: (time = 600) => {
      anim.slideOutDown(time);
  }, slideOutLeft: (time = 600) => {
      anim.slideOutLeft(time);
  }, slideOutRight: (time = 600) => {
      anim.slideOutRight(time);
  }, slideOutUp: (time = 600) => {
      anim.slideOutUp(time);
  }, heartBeat: (time = 600) => {
      anim.heartBeat(time);
  }, rollOutRight: (time = 600) => {
      anim.rollOutRight(time);
  }, rollOutLeft: (time = 600) => {
      anim.rollOutLeft(time);
  }, rubberBand: (time = 600) => {
      anim.rubberBand(time);
  }, zoomOut: (time = 600) => {
      anim.zoomOut(time);
  }, zoomIn: (time = 600) => {
      anim.zoomIn(time);
  }, fadeOut: (time = 600) => {
      anim.fadeOut(time);
  }, fadeOutRight: (time = 600) => {
      anim.fadeOutRight(time);
  }, fadeOutLeft: (time = 600) => {
      anim.fadeOutLeft(time);
  }, fadeOutTop: (time = 600) => {
      anim.fadeOutTop(time);
  }, fadeOutBottom: (time = 600) => {
      anim.fadeOutBottom(time);
  }, horizontalFlip: (time = 600) => {
      anim.horizontalFlip(time);
  }, verticalFlip: (time = 600) => {
      anim.verticalFlip(time);
  }, bounceOutBottom: (time = 600) => {
      anim.bounceOutBottom(time);
  }, bounceOutTop: (time = 600) => {
      anim.bounceOutTop(time);
  }, bounceOutLeft: (time = 600) => {
      anim.bounceOutLeft(time);
  }, bounceOutRight: (time = 600) => {
      anim.bounceOutRight(time);
  }, rotateClockwise: (time = 600) => {
      anim.rotateClockwise(time);
  }, rotateAntiClockwise: (time = 600) => {
      anim.rotateAntiClockwise(time);
  }, tada: (time = 600) => {
      anim.tada(time);
  }, moveIn: (time = 600) => {
      anim.moveIn(time);
  }, moveOut: (time = 600) => {
      anim.moveOut(time);
  }, swing: (time = 600) => {
      anim.swing(time);
  }, shake: (time = 600) => {
      anim.shake(time);
  }, hinge: (time = 600) => {
      anim.hinge(time);
  }
};

function play(){
    var audio = new Audio('riri.mp3')
    audio.play();
}

// DRAG AND DROP GAME
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("image_id", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var image_id = event.dataTransfer.getData("image_id");
    var image = document.getElementById(image_id);
    event.target.appendChild(image);
}

function checkUni() {
    var correctUniversities = ["Harvard", "MIT", "Stanford"];
    var resultText = "Correct";

    for (var i = 1; i <= 3; i++) {
        var uniCell = document.getElementById("uni" + i);
        var image = uniCell.querySelector("img");
        if (!image || image.getAttribute("data-university") !== correctUniversities[i - 1]) {
            resultText = "Incorrect";
            break;
        }
    }

    document.getElementById("result").innerText = resultText;
}

// = = = = = == Scroll Smooth on Entire Page   = = = = = = //

var html = document.documentElement;
var body = document.body;

var scroller = {
  target: document.querySelector("#scroll-container"),
  ease: 0.05, // <= scroll speed
  endY: 0,
  y: 0,
  resizeRequest: 1,
  scrollRequest: 0,
};

var requestId = null;

TweenLite.set(scroller.target, {
  rotation: 0.01,
  force3D: true
});

window.addEventListener("load", onLoad);

function onLoad() {
  updateScroller();
  window.focus();
  window.addEventListener("resize", onResize);
  document.addEventListener("scroll", onScroll);
}

function updateScroller() {

  var resized = scroller.resizeRequest > 0;

  if (resized) {
    var height = scroller.target.clientHeight;
    body.style.height = height + "px";
    scroller.resizeRequest = 0;
  }

  var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

  scroller.endY = scrollY;
  scroller.y += (scrollY - scroller.y) * scroller.ease;

  if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
    scroller.y = scrollY;
    scroller.scrollRequest = 0;
  }

  TweenLite.set(scroller.target, {
    y: -scroller.y
  });

  requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
}

function onScroll() {
  scroller.scrollRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}

function onResize() {
  scroller.resizeRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}



// = = = = = = Typing Running Effect on Hero Sec  = = = = = = //

const texts = [
  "Exchange Solution",
  "Exchange Solution",
];

const typingSpeed = 120; // Adjust the speed as needed
const textElement = document.querySelector(".typing-text");
let textIndex = 0;

function typeText() {
  const text = texts[textIndex];
  let charIndex = 0;
  textElement.innerHTML = "";

  function typeChar() {
    if (charIndex < text.length) {
      textElement.innerHTML += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, typingSpeed);
    } else {
      setTimeout(() => {
        textIndex = (textIndex + 1) % texts.length;
        typeText();
      }, 1600); // Adjust the delay between texts as needed
    }
  }

  typeChar();
}

typeText();


// = = = = = = Accordion  = = = = = = //

let faqQues = document.querySelectorAll(".faq_que");
let faqAns = document.querySelectorAll(".faq_ans");

faqQues.forEach((que, index) => {
  que?.addEventListener("click", () => {
    que.classList.toggle("open");
    let ansHeight = faqAns[index].scrollHeight;
    if (que.classList.contains("open")) {
      faqAns[index].setAttribute("style", `height:${ansHeight + 15}px`)
    }
    else {
      faqAns[index].setAttribute("style", "height:0px")
    }
    setTimeout(onResize, 1001);
  })
})



// = = = = = = View Full or Less Development Process  = = = = = = //

let devProcessBox = document.querySelector(".development_process");
let devSec = document.querySelector(".development_process_sec");
let viewFullBtn = document.querySelector(".development_btn_full .btn");
let viewLessBtn = document.querySelector(".development_btn_less .btn");

viewFullBtn.addEventListener("click", () => {
  devSec.classList.add("viewFull");
  if (devSec.classList.contains("viewFull")) {
    let boxHeight = devProcessBox.scrollHeight;
    devProcessBox.setAttribute("style", `height:${boxHeight}px`);
    setTimeout(onResize, 1001);
    viewLessBtn.addEventListener("click", () => {
      devProcessBox.setAttribute("style", `height:700px`);
      devSec.classList.remove("viewFull");
      setTimeout(onResize, 1001);
    })
  }
})



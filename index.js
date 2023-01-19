
let btn = document.querySelector(".add")
let wrapper = document.querySelector(".cards")
let dlt  = document.querySelector(".dlt")

let prevScroll = 0;
let left= 200;
let tp = 60;
let prevLine = document.querySelector("#cardOne");
let num =2;

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  direction: 'vertical', // vertical, horizontal
  gestureDirection: 'vertical', // vertical, horizontal, both
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
  wrapper:window,
  content:document.body
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
function addCard (){
  let innerHtml  = `
  <span>${num}</span>
  <p>Example text for card</p>`;
  let div = document.createElement("div");
  div.innerHTML = innerHtml;
  div.classList = [ "cardOne"]
  div.style.left = `${left}px`;
  div.style.top = `${tp}px`;
  wrapper.appendChild(div);
  setTimeout(() => {
    console.log(prevLine.childNodes[3])
    prevLine.childNodes[3].style.filter = "blur(8px)";
    prevLine = div;
  }, 1700);
  num++
  left += 100;
  tp += 10;
}
function removeCard() {
  let cards = document.querySelector(".cards");
  let len = cards.childNodes.length-1;
  console.log(len)
  let ele = cards.childNodes[len];
  ele.classList = ["cardTwo"]
  console.log(cards.childNodes)
  setTimeout(() => {
    if(len <= 7){
      prevLine =  cards.childNodes[1]
      cards.childNodes[1].childNodes[3].style.filter = "none";
    }else{
      prevLine =  cards.childNodes[len-1]
      cards.childNodes[len-1].childNodes[3].style.filter = "none";
    }
    
    cards.removeChild(ele)
  }, 1500);
  num--;
  left -= 100;
  tp -= 10;
}



lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
  if(scroll > prevScroll+500){
    addCard()
    prevScroll = scroll
  }
  if(scroll < prevScroll-500){
    removeCard()
    prevScroll = scroll
  }

})


btn.addEventListener("click",()=>{
  addCard()
})

dlt.addEventListener("click",()=>{
  removeCard()
})


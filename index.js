
let btn = document.querySelector(".add")
let wrapper = document.querySelector(".cards")
let dlt  = document.querySelector(".dlt")

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

let prevScroll = 0;
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

let left= 200;
let tp = 60;
let prev = document.querySelector("#cardOne");
let num =2;

btn.addEventListener("click",()=>{
  addCard()
})

dlt.addEventListener("click",()=>{
  removeCard()
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
    console.log(prev.childNodes[3])
    prev.childNodes[3].style.filter = "blur(8px)";
    prev = div;
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
      prev =  cards.childNodes[1]
      cards.childNodes[1].childNodes[3].style.filter = "none";
    }else{
      prev =  cards.childNodes[len-1]
      cards.childNodes[len-1].childNodes[3].style.filter = "none";
    }
    
    cards.removeChild(ele)
  }, 1500);
  num--;
  left -= 100;
  tp -= 10;
}

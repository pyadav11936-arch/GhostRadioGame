// GHOST RADIO - Main JavaScript Logic
let power = 100;
let time = 0;
let currentCam = 1;
let hauntedCam = 0;
let gameOver = false;

const radioMsgs = [
  "Whispering... Hallway B me...",
  "Cold spot detected CAM 03...",
  "Entity moving... left side...",
  "Don't look away... its here...",
  "Static... CAM...",
  "I hear breathing on radio..."
];

function selectCam(n){
  document.querySelectorAll('.cam').forEach(c=>c.classList.remove('active'));
  document.getElementById('cam'+n).classList.add('active');
  currentCam = n;
  console.log("Selected CAM: "+n); // debug ke liye
}

function hauntRandom(){
  if(gameOver) return;
  
  // purana ghost hatao
  document.querySelectorAll('.cam').forEach(c=>c.classList.remove('haunted'));
  
  // naya ghost random cam…
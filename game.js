let power = 100, time = 0, currentCam = 1, hauntedCam = 0, gameOver = false;
const radioMsgs = [
  "Whispering... Hallway B...",
  "Cold spot CAM 03...",
  "Entity moving... Don't look...",
  "Breathing near CAM...",
  "Static... It's watching...",
  "I hear footsteps... CAM 06"
];

function selectCam(n){
  document.querySelectorAll('.cam').forEach(c=>c.classList.remove('active'));
  document.getElementById('cam'+n).classList.add('active');
  currentCam = n;
}

function playScarySound(){
  try{
    let ctx = new (window.AudioContext||window.webkitAudioContext)();
    let osc = ctx.createOscillator();
    let gain = ctx.createGain();
    osc.type='sawtooth'; 
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(400, ctx.currentTime+0.5);
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime+0.8);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime+0.8);
  }catch(e){}
}

function hauntRandom(){
  if(gameOver) return;
  document.querySelectorAll('.cam').forEach(c=>c.classList.remove('haunted'));
  hauntedCam = Math.floor(Math.random()*6)+1;
  let cam = document.getElementById('cam'+hauntedCam);
  cam.classList.add('haunted');
  cam.querySelector('.ghost').innerHTML = "☠️ GHOST HERE ☠️<br>CHECK NOW!";
  document.getElementById('radio').innerText = "Ghost Radio: " + radioMsgs[Math.floor(Math.random()*radioMsgs.length)] + " [CAM 0"+hauntedCam+"]";
  
  playScarySound();
  document.body.classList.add('shake');
  setTimeout(()=>document.body.classList.remove('shake'),500);

  setTimeout(()=>{
    if(hauntedCam!=0 && !gameOver){
      document.getElementById('jumpscare').style.display='flex';
      playScarySound();
      gameOver = true;
      setTimeout(()=>{ 
        alert("GAME OVER! Bhoot ne pakad liya! 👁️"); 
        location.reload(); 
      },1000);
    }
  },5000);
}

function checkCurrentCam(){
  if(gameOver) return;
  if(hauntedCam==currentCam){
    document.getElementById('msg').innerText = "✓ Ghost bhaga diya! +15 Power";
    power = Math.min(100, power+15);
    document.getElementById('cam'+hauntedCam).classList.remove('haunted');
    hauntedCam=0;
  }else{
    document.getElementById('msg').innerText = "✗ Galat cam! Jaldi dhoondo! -8 Power";
    power -=8;
    playScarySound();
    document.body.classList.add('shake');
    setTimeout(()=>document.body.classList.remove('shake'),300);
  }
  document.getElementById('power').innerText = power;
}

setInterval(()=>{
  if(gameOver) return;
  power--; 
  time++;
  document.getElementById('power').innerText = power;
  let h = (12 + Math.floor(time/60)) % 12; if(h==0) h=12;
  let m = (time%60).toString().padStart(2,'0');
  document.getElementById('time').innerText = h+":"+m+" AM";
  if(power<=0){ alert("Power khatam! Andhere me mar gaye!"); location.reload(); }
  if(time>=360){ alert("YOU SURVIVED 6AM! YOU WIN! 🎉"); location.reload(); }
},1000);

setInterval(hauntRandom, 6000);
selectCam(1);

document.addEventListener('keydown', (e)=>{
  if(e.code==='Space') checkCurrentCam();
  if(e.key>='1' && e.key<='6') selectCam(parseInt(e.key));
});
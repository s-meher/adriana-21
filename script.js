// -------- CONFIG --------
const BIG_NAME = "Adriana";
const FROM_NAME = "Shree";
const TARGET_ISO = "2025-10-07T17:30:00-05:00";

// Photos - local assets
const PHOTOS = [
  "assets/IMG_0390.jpg",
  "assets/IMG_0391.jpg",
  "assets/IMG_0392.jpg",
  "assets/IMG_0394.jpg",
  "assets/IMG_0395.jpg",
  "assets/IMG_0396.jpg",
  "assets/IMG_0397.jpg",
  "assets/IMG_0398.jpg",
  "assets/IMG_0399.jpg",
  "assets/IMG_0400.jpg",
  "assets/IMG_0401.jpg",
  "assets/IMG_0402.jpg",
  "assets/IMG_0403.jpg",
  "assets/IMG_0404.jpg",
  "assets/IMG_0405.jpg",
  "assets/IMG_0406.jpg",
  "assets/IMG_0407.jpg",
  "assets/IMG_0408.jpg",
  "assets/IMG_0409.jpg",
  "assets/IMG_0410.jpg",
  "assets/IMG_0411.jpg",
  "assets/IMG_0412.jpg",
  "assets/IMG_0413.PNG",
  "assets/IMG_0414.jpg",
  "assets/IMG_0415.jpg",
  "assets/IMG_0416.jpg",
  "assets/IMG_0417.jpg",
  "assets/IMG_0418.jpg",
  "assets/IMG_0419.jpg",
  "assets/IMG_0420.jpg",
  "assets/IMG_0421.jpg",
  "assets/IMG_0422.jpg",
  "assets/IMG_0423.jpg",
  "assets/IMG_0424.jpg",
  "assets/IMG_0425.jpg",
  "assets/IMG_0426.jpg",
  "assets/IMG_0427.jpg",
  "assets/IMG_0428.jpg",
  "assets/IMG_0429.jpg",
  "assets/IMG_0430.jpg",
  "assets/IMG_0431.jpg",
  "assets/IMG_0432.jpg",
  "assets/IMG_0433.jpg",
  "assets/IMG_0434.jpg"
];

const NOTES = [
  { who: "Didi", msg: "Happy Birthday my dearest little! I hope 21 treats you so well! I love you so much, you are such a gem in this world and I’m so happy to not have only met you but also be blessed by your presence every day. I love you so much and I hope you have an amazing birthday and all your wishes come true!! Love your big, Didi <3" },
  { who: "Mia F", msg: "Happy birthday Adriana!! You always make my day a little better whenever I see you and have the best sense of humor :) I hope you have the best 21st and get to live it up this weekend! :heartpulse: - Mia" },
  { who: "Becca", msg: "happy birthday, Adriana! i love you so much and i'm so happy we've gotten to be best friends. you're like an actual sister to me and i couldn't be more grateful for you. i'll always be here for you no matter what the future has in store for us, i'll always be your sister <3 i love you! 21 is your year, have a drink or two for me 😽" },
  { who: "Shree", msg: "Happy birthday Adriana!! Happy 21! I hope you have the best day ever and an even better year ahead! I love you so much! I am so grateful to have you in my life as a friend and as the best big i could have hoped for. You may have not been the reason i joined ASA but you are the reason I stayed and now call it home <3. I can't wait to see you grow to become the amazingly amazing, smart, kind and intelligent woman I know you are. Again, happy birthday and i love you xoxo" }
];

// -------- DOM HELPERS --------
const byId = id => document.getElementById(id);

// Populate gallery
(function renderGallery(){
  const grid = byId("galleryGrid");
  if(!grid) return;
  PHOTOS.forEach((src, i) => {
    const fig = document.createElement("figure");
    fig.className = "figure" + (i % 6 === 0 ? " featured" : "");
    const img = document.createElement("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.src = src; 
    img.alt = "Memory " + (i+1);
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = `Memory ${i+1}`;
    fig.appendChild(img);
    fig.appendChild(label);
    grid.appendChild(fig);
  });
})();

// Populate notes
(function renderNotes(){
  const wrap = byId("notesList");
  if(!wrap) return;
  NOTES.forEach(n => {
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = `<div class="msg">“${n.msg}”</div><div class="who">- ${n.who}</div>`;
    wrap.appendChild(div);
  });
})();

// Confetti
function burstConfetti(durationMs=1800, count=80){
  const root = byId("confetti");
  if(!root) return;
  for(let i=0;i<count;i++){
    const p = document.createElement("span");
    p.className = "confetti-piece";
    p.style.left = Math.random()*100 + "%";
    p.style.top = "-8%";
    const colors = ["#ff7518","#ff9a4d","#7a3cff","#a37dff","#1dd3b0","#ff4d6d"];
    p.style.background = colors[i % colors.length];
    p.style.animationDelay = (Math.random()*0.6).toFixed(2)+"s";
    root.appendChild(p);
    setTimeout(()=> p.remove(), durationMs + 800);
  }
}

// Countdown gate
(function startCountdown(){
  const gate = byId("gate");
  const dEl = byId("d"), hEl = byId("h"), mEl = byId("m"), sEl = byId("s");
  if(!gate) return;
  gate.classList.remove("hidden");

  function update(){
    const now = new Date();
    const target = new Date(TARGET_ISO);
    const diff = target.getTime() - now.getTime();

    if(diff <= 0){
      // Unlock
      gate.remove();
      burstConfetti(2200, 120);
      return;
    }
    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor((diff / (1000*60*60)) % 24);
    const m = Math.floor((diff / (1000*60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    dEl.textContent = String(d).padStart(2,"0");
    hEl.textContent = String(h).padStart(2,"0");
    mEl.textContent = String(m).padStart(2,"0");
    sEl.textContent = String(s).padStart(2,"0");
  }

  update();
  const t = setInterval(update, 1000);
})();

// Pre confetti button
document.addEventListener("click", e=>{
  if(e.target && e.target.id === "preConfetti"){
    burstConfetti();
  }
});

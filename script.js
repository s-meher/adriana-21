// -------- CONFIG --------
const BIG_NAME = "Adriana";
const FROM_NAME = "Shree";
const TARGET_ISO = "2025-10-31T19:00:00-05:00"; // change to your exact party time
// Photos and notes - add your real URLs and names
const PHOTOS = [
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514516430034-c0f44a0c6ed4?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop"
];
const NOTES = [
  { who: "Sarah", msg: "Adriana, you are the funniest person I know. Can’t wait to celebrate your 21st!" },
  { who: "Emma", msg: "Happy birthday to the kindest soul. You light up every room you enter!" },
  { who: "Olivia", msg: "21 and finally legal. Let’s make this Halloween unforgettable. Love you!" },
  { who: "Mia", msg: "You are a gem. Here is to the best year yet!" }
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
    img.src = src; img.alt = "Memory " + (i+1);
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

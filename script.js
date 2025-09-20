document.addEventListener("DOMContentLoaded", () => {
  const startDate = new Date(2025, 8, 25); // 25 Sep 2025
  const today = new Date();
  const diffTime = today - startDate;
  const dayIndex = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const habits = [
    "Drink 6–8 glasses of water 💧",
    "Smile in the mirror for 1 minute 😊",
    "Listen to your favorite song 🎶",
    "Write one thing you love about yourself ✍️",
    "Take a 10 min walk/stretch 🚶‍♀️",
    "Send me a heart emoji ❤️",
    "Sleep 15 mins earlier 😴",
    "Eat one healthy fruit 🍎",
    "Compliment yourself loudly 🪞",
    "Do 5 deep breaths 🌬️",
    "Read 2 pages of any book 📖",
    "Dance to your favorite song 💃",
    "Think about one happy memory of us 💖",
    "Watch sunset or look at sky 🌇",
    "Write down one dream/goal 🌟",
    "Drink lemon water 🍋",
    "Meditate for 5 minutes 🧘‍♀️",
    "No social media for 30 min 📵",
    "Write one thing you love about me 😏",
    "Take a cute selfie 😘",
    "Laugh out loud 😂",
    "Hug yourself tightly 🤗",
    "Drink warm milk/herbal tea 🥛🍵",
    "Listen to a calm song 🎧",
    "Plan your perfect date in your mind 🌌",
    "Close eyes & imagine me 💑",
    "Write one word that describes “us” 🥰",
    "Sleep early (before 11 pm) 🌙",
    "Whisper “I love you” before sleeping 💕",
    "Think about our future together ✨"
  ];

  const habitTitle = document.getElementById("habit-title");
  const habitDesc = document.getElementById("habit-desc");
  const markDoneBtn = document.getElementById("mark-done");
  const photoInput = document.getElementById("photo-input");
  const noteMessage = document.getElementById("note-message");
  const progress = document.getElementById("progress");
  const galleryPhotos = document.getElementById("gallery-photos");
  const calendar = document.getElementById("calendar");
  const installBtn = document.getElementById("install-btn");
  const confettiCanvas = document.getElementById("confetti-canvas");
  const confettiCtx = confettiCanvas.getContext('2d');

  // Resize confetti canvas
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  // Build calendar
  for (let i = 0; i < 30; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("calendar-day");
    dayDiv.textContent = i + 1;
    if (i === dayIndex) dayDiv.classList.add("today");
    if (localStorage.getItem("habit-" + i)) dayDiv.classList.add("completed");
    calendar.appendChild(dayDiv);
  }

  // Show today's habit
  habitTitle.textContent = `Day ${dayIndex + 1} Habit`;
  habitDesc.textContent = habits[dayIndex];

  // Load gallery
  function loadGallery() {
    galleryPhotos.innerHTML = "";
    const photos = JSON.parse(localStorage.getItem("proof-gallery") || "[]");
    photos.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      galleryPhotos.appendChild(img);
    });
  }
  loadGallery();

  // Update progress
  function updateProgress() {
    let completed = 0;
    for (let i = 0; i < 30; i++) {
      if (localStorage.getItem("habit-" + i)) completed++;
    }
    progress.style.width = ((completed / 30) * 100) + "%";
  }
  updateProgress();

  // Confetti animation
  function triggerConfetti() {
    const confetti = [];
    const colors = ['#ff4081','#ff85b1','#ffe3ec','#ffd1e3'];
    for(let i=0;i<150;i++){
      confetti.push({
        x: Math.random()*window.innerWidth,
        y: Math.random()*window.innerHeight- window.innerHeight,
        r: Math.random()*6+2,
        d: Math.random()*50+10,
        color: colors[Math.floor(Math.random()*colors.length)],
        tilt: Math.floor(Math.random()*10)-10,
      });
    }

    let angle = 0;
    function draw(){
      confettiCtx.clearRect(0,0,window.innerWidth,window.innerHeight);
      confetti.forEach(c=>{
        confettiCtx.beginPath();
        confettiCtx.lineWidth = c.r;
        confettiCtx.strokeStyle = c.color;
        confettiCtx.moveTo(c.x + c.tilt + c.r/2, c.y);
        confettiCtx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r/2);
        confettiCtx.stroke();
        c.y += 2;
        if(c.y>window.innerHeight) c.y= -10;
      });
      angle += 0.01;
      requestAnimationFrame(draw);
    }
    draw();
    setTimeout(()=>{ confettiCtx.clearRect(0,0,window.innerWidth,window.innerHeight); },3000);
  }

  // Mark done
  markDoneBtn.addEventListener("click", () => photoInput.click());

  photoInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      // Save photo
      const photos = JSON.parse(localStorage.getItem("proof-gallery") || "[]");
      photos.push(reader.result);
      localStorage.setItem("proof-gallery", JSON.stringify(photos));

      // Mark today complete
      localStorage.setItem("habit-" + dayIndex, "true");

      // Update UI
      loadGallery();
      updateProgress();
      calendar.children[dayIndex].classList.add("completed");
      noteMessage.textContent = "✨ Habit completed! Great job jaan 💖";

      // Trigger confetti
      triggerConfetti();

      // Weekly bonus
      const weekStart = Math.floor(dayIndex / 7) * 7;
      let weekComplete = true;
      for(let i=weekStart;i<weekStart+7 && i<30;i++){
        if(!localStorage.getItem("habit-"+i)) weekComplete=false;
      }
      if(weekComplete) setTimeout(()=>{ alert("🎁 Weekly bonus unlocked! 💌"); }, 400);

      // Month-end bonus
      if(dayIndex===29) setTimeout(()=>{ alert("💖 Congratulations! 30-day challenge complete! 😘"); },500);
    };
    reader.readAsDataURL(file);
  });

  // Add to Home Screen
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e)=>{
    e.preventDefault();
    deferredPrompt=e;
    installBtn.style.display="block";
  });

  installBtn.addEventListener('click',()=>{
    installBtn.style.display="none";
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice=>{
      deferredPrompt=null;
    });
  });
});

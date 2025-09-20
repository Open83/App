document.addEventListener("DOMContentLoaded", () => {
  // Set the start date (September 25, 2025)
  const startDate = new Date(2025, 8, 20); // Month is 0-indexed, so 8 = September
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Calculate days since start
  const diffTime = today - startDate;
  const dayIndex = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  
  console.log('Start Date:', startDate.toDateString());
  console.log('Today:', today.toDateString());
  console.log('Day Index:', dayIndex);

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
    "Write one word that describes 'us' 🥰",
    "Sleep early (before 11 pm) 🌙",
    "Whisper 'I love you' before sleeping 💕",
    "Think about our future together ✨"
  ];

  const habitTitle = document.getElementById("habit-title");
  const habitDesc = document.getElementById("habit-desc");
  const markDoneBtn = document.getElementById("mark-done");
  const photoInput = document.getElementById("photo-input");
  const noteMessage = document.getElementById("note-message");
  const progress = document.getElementById("progress");
  const progressText = document.getElementById("progress-text");
  const galleryPhotos = document.getElementById("gallery-photos");
  const calendar = document.getElementById("calendar");
  const installBtn = document.getElementById("install-btn");
  const confettiCanvas = document.getElementById("confetti-canvas");
  const confettiCtx = confettiCanvas.getContext('2d');
  const popup = document.getElementById("popup");
  const modal = document.getElementById("modal");
  const habitCard = document.getElementById("habit-card");

  // Set canvas size
  function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Helper functions
  function showPopup(message) {
    popup.textContent = message;
    popup.style.display = 'block';
    setTimeout(() => popup.style.display = 'none', 3000);
  }

  function showModal(title, msg) {
    modal.innerHTML = `<h2>${title}</h2><p>${msg}</p><button onclick="hideModal()">Close</button>`;
    modal.classList.remove('hidden');
  }

  window.hideModal = function() {
    modal.classList.add('hidden');
  }

  // Create calendar with actual dates
  function createCalendar() {
    calendar.innerHTML = '';
    for (let i = 0; i < 30; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("calendar-day");
      
      // Calculate the actual date for this day
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dayNumber = currentDate.getDate();
      
      dayDiv.textContent = dayNumber;
      dayDiv.title = currentDate.toLocaleDateString();
      
      if (i === dayIndex) {
        dayDiv.classList.add("today");
      }
      
      if (localStorage.getItem(`habit-${i}`)) {
        dayDiv.classList.add("completed");
      }
      
      if (i > dayIndex) {
        dayDiv.classList.add("locked");
      }
      
      calendar.appendChild(dayDiv);
    }
  }

  // Set current habit
  function setCurrentHabit() {
    if (dayIndex >= 30) {
      habitTitle.textContent = "Challenge Complete! 🎉";
      habitDesc.textContent = "You've completed all 30 days! Amazing job! 💖";
      markDoneBtn.style.display = 'none';
    } else {
      habitTitle.textContent = `Day ${dayIndex + 1} Habit`;
      habitDesc.textContent = habits[dayIndex] || "Keep going strong! 💪";
      
      if (localStorage.getItem(`habit-${dayIndex}`)) {
        markDoneBtn.textContent = "Already Done ✅";
        markDoneBtn.disabled = true;
        markDoneBtn.style.background = "#4caf50";
      }
    }
  }

  // Load gallery
  function loadGallery() {
    galleryPhotos.innerHTML = "";
    const photos = JSON.parse(localStorage.getItem("proof-gallery") || "[]");
    photos.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Proof ${index + 1}`;
      img.onclick = () => {
        // Show image in modal
        showModal("📸 Proof Photo", `<img src="${src}" style="max-width: 90%; max-height: 70vh; border-radius: 15px; margin-top: 15px;">`);
      };
      galleryPhotos.appendChild(img);
    });
    
    if (photos.length === 0) {
      galleryPhotos.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No photos yet. Complete tasks to add proof! 📸</p>';
    }
  }

  // Update progress
  function updateProgress() {
    let completed = 0;
    for (let i = 0; i < 30; i++) {
      if (localStorage.getItem(`habit-${i}`)) {
        completed++;
      }
    }
    const percentage = (completed / 30) * 100;
    progress.style.width = percentage + "%";
    progressText.textContent = `${completed}/30 days (${Math.round(percentage)}%)`;
  }

  // Confetti animation (SHORT DURATION - 2 seconds only)
  function triggerConfetti() {
    const confettiArray = [];
    const colors = ['#e91e63', '#f06292', '#ba68c8', '#ab47bc', '#ff4081'];
    let animationId;
    
    for (let i = 0; i < 150; i++) {
      confettiArray.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight - window.innerHeight,
        r: Math.random() * 6 + 4,
        d: Math.random() * 50 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
      });
    }

    function draw() {
      confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      confettiArray.forEach(confetti => {
        confettiCtx.beginPath();
        confettiCtx.lineWidth = confetti.r / 2;
        confettiCtx.strokeStyle = confetti.color;
        confettiCtx.moveTo(confetti.x + confetti.tilt + confetti.r, confetti.y);
        confettiCtx.lineTo(confetti.x + confetti.tilt, confetti.y + confetti.tilt + confetti.r);
        confettiCtx.stroke();
        
        confetti.tiltAngle += confetti.tiltAngleIncremental;
        confetti.y += (Math.cos(confetti.d) + 3 + confetti.r / 2) / 2; // Faster falling
        confetti.tilt = Math.sin(confetti.tiltAngle - confetti.r / 2) * confetti.r / 2;
        
        if (confetti.y > window.innerHeight) {
          confetti.y = -10;
        }
      });
      
      animationId = requestAnimationFrame(draw);
    }
    
    draw();
    
    // Stop confetti after exactly 2 seconds
    setTimeout(() => {
      cancelAnimationFrame(animationId);
      confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }, 2000);
  }

  // Mark habit as done
  markDoneBtn.addEventListener("click", () => {
    if (dayIndex >= 30 || localStorage.getItem(`habit-${dayIndex}`)) {
      return;
    }
    photoInput.click();
  });

  photoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const photos = JSON.parse(localStorage.getItem("proof-gallery") || "[]");
      photos.push(reader.result);
      localStorage.setItem("proof-gallery", JSON.stringify(photos));
      localStorage.setItem(`habit-${dayIndex}`, "true");
      
      loadGallery();
      updateProgress();
      createCalendar();
      
      // Update button
      markDoneBtn.textContent = "Already Done ✅";
      markDoneBtn.disabled = true;
      markDoneBtn.style.background = "#4caf50";
      
      // Show completion message
      const messages = [
        "✨ Amazing job, jaan! You're doing great! 💖",
        "🌟 So proud of you! Keep going! 😘",
        "💕 You're incredible! Love you! 🥰",
        "🎉 Another step closer to our goal! 💪",
        "❤️ You make me so happy! Well done! 😊"
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      noteMessage.textContent = randomMessage;
      
      // Trigger confetti for only 2 seconds
      triggerConfetti();

      // Check for weekly bonus
      const weekStart = Math.floor(dayIndex / 7) * 7;
      let weekComplete = true;
      for (let i = weekStart; i < weekStart + 7 && i < 30; i++) {
        if (!localStorage.getItem(`habit-${i}`)) {
          weekComplete = false;
          break;
        }
      }
      
      if (weekComplete) {
        setTimeout(() => {
          showPopup("🎁 Weekly bonus unlocked! You're amazing! 💌");
        }, 500);
      }

      // Check for month completion
      if (dayIndex === 29) {
        setTimeout(() => {
          showModal("💖 30-Day Challenge Complete! 💖", "Jaan, you did it! I'm so proud of you! You're absolutely amazing! 😘❤️✨");
        }, 700);
      }
    };
    
    reader.readAsDataURL(file);
  });

  // Initialize
  createCalendar();
  setCurrentHabit();
  loadGallery();
  updateProgress();

  // PWA Install
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = "block";
  });

  installBtn.addEventListener('click', () => {
    installBtn.style.display = "none";
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((result) => {
        if (result.outcome === 'accepted') {
          showPopup("🎉 App installed successfully!");
        }
        deferredPrompt = null;
      });
    }
  });

  // Service Worker Registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
          console.log('Service Worker registered successfully');
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    });
  }


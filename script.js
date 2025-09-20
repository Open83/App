document.addEventListener("DOMContentLoaded", () => {
  const startDate = new Date(2025, 8, 25); // September = 8 (0-based)
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

  // Load progress
  function updateProgress() {
    let completed = 0;
    for (let i = 0; i < 30; i++) {
      if (localStorage.getItem("habit-" + i)) completed++;
    }
    progress.style.width = ((completed / 30) * 100) + "%";
  }
  updateProgress();

  // Mark done
  markDoneBtn.addEventListener("click", () => {
    photoInput.click();
  });

  photoInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      // Save to localStorage
      const photos = JSON.parse(localStorage.getItem("proof-gallery") || "[]");
      photos.push(reader.result);
      localStorage.setItem("proof-gallery", JSON.stringify(photos));

      // Mark today habit complete
      localStorage.setItem("habit-" + dayIndex, "true");

      // Show popup note
      noteMessage.textContent = "✨ Habit completed! Great job jaan 💖";

      // Update gallery & progress & calendar
      loadGallery();
      updateProgress();
      calendar.children[dayIndex].classList.add("completed");

      // Weekly bonus check
      const weekStart = Math.floor(dayIndex / 7) * 7;
      let weekComplete = true;
      for (let i = weekStart; i < weekStart + 7 && i < 30; i++) {
        if (!localStorage.getItem("habit-" + i)) weekComplete = false;
      }
      if (weekComplete) {
        setTimeout(() => {
          alert("🎁 Weekly bonus unlocked! Check your special message 💌");
        }, 300);
      }

      // Month-end check
      if (dayIndex === 29) {
        setTimeout(() => {
          alert("💖 Congratulations! You completed the 30-day challenge! Here's your special final note 😘");
        }, 500);
      }
    };
    reader.readAsDataURL(file);
  });
});

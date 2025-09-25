// Cloudinary Config
const cloudinaryConfig = {
  cloudName: 'drgwv8k5m', // Replace with your cloud name if needed
  apiKey: '219634793157291',
  apiSecret: 'siaDrAtZR5d_B6SAsNZXApkVDsI'
};

// Initialize local storage for database functionality
const localDB = {
  getItem: (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// --- 30-Day Habits ---
const habits = [
  "Drink 6–8 glasses of water 💧",
  "Smile in the mirror for 1 minute 😊", 
  "Listen to your favorite song 🎶",
  "Write one thing you love about yourself ✍️",
  "Take a 10 min walk/stretch 🚶‍♀️",
  "Send a heart emoji ❤️ to someone special",
  "Meditate for 5 minutes 🧘‍♀️",
  "Compliment yourself in mirror 💖",
  "Read a motivational quote 📖",
  "Drink a healthy smoothie 🥤",
  "Do a 5-minute dance session 💃",
  "Write down 3 things you're grateful for 🙏",
  "Draw or doodle something fun 🎨",
  "Take 10 deep breaths 🌬️",
  "Text a friend you love 💌",
  "Make your bed neatly 🛏️",
  "Try a new healthy snack 🍎",
  "Watch a short funny video 😂",
  "Plan your next day 📝",
  "Give yourself a small treat 🍫",
  "Do a 5-min stretch or yoga 🧘",
  "Sing your favorite song aloud 🎤",
  "Take 5 min to relax with eyes closed 🌸",
  "Write down a happy memory 💌",
  "Say 'I love you' to yourself 💖",
  "Organize your desk or room 🧹",
  "Drink a cup of herbal tea 🍵",
  "Compliment someone today 🌹",
  "Write a short poem or note ✍️",
  "Reflect on your week & smile 😊"
];

// --- 30-Day Appreciation Messages ---
const appreciationMessages = [
  "Day 1: You're amazing, keep shining! 🌸",
  "Day 2: Keep spreading your beautiful light! 🌟", 
  "Day 3: Today was beautiful because of you 🌹",
  "Day 4: You're my sunshine, always! ☀️",
  "Day 5: Your smile makes my day brighter! 😍",
  "Day 6: You're absolutely incredible 💖",
  "Day 7: First week done! You rock! 💝",
  "Day 8: Another beautiful day with you! 💖",
  "Day 9: Your energy is so infectious! ⚡",
  "Day 10: You're doing amazing, love! 💖",
  "Day 11: You're glowing today! ✨",
  "Day 12: Another step forward, proud of you! 💖",
  "Day 13: Your positivity is amazing! 💌",
  "Day 14: Two weeks of awesomeness! 💝",
  "Day 15: Halfway through the month! 💖",
  "Day 16: Keep being fabulous, queen! 🌹",
  "Day 17: You're absolutely amazing! 💖",
  "Day 18: You did it again! So proud! 👏",
  "Day 19: You're a bright shining star! ✨",
  "Day 20: You absolutely rock! 💝",
  "Day 21: Three weeks done! Champion! 🎉",
  "Day 22: Keep shining bright, love! 💖",
  "Day 23: You're truly incredible! 💌",
  "Day 24: Almost there, keep going! 🌹",
  "Day 25: Stay awesome, beautiful! 💌",
  "Day 26: Keep shining so bright! ✨",
  "Day 27: Almost at the finish line! 🌟",
  "Day 28: Last few days, you're amazing! 💝",
  "Day 29: Almost there, my love! 🌹",
  "Day 30: Month complete! You're my queen! 🎉"
];

// --- Weekly bonus messages ---
const bonusMessages = {
  1: { type:"text", content:"💝 First week done! I love you infinitely, meri jaan!" },
  2: { type:"audio", content:"bonus/week2.mp3" },
  3: { type:"video", content:"bonus/week3.mp4" },
  4: { type:"text", content:"🌹 You're my eternal queen. Forever proud of you!" }
};

// --- Elements ---
const calendar = document.getElementById("calendar");
const taskSection = document.getElementById("task-section");
const taskTitle = document.getElementById("task-title");
const taskDesc = document.getElementById("task-desc");
const markDoneBtn = document.getElementById("mark-done");
const proofUpload = document.getElementById("proof-upload");
const pointsDisplay = document.getElementById("points");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const loadingDiv = document.getElementById("loading");

// Show loading initially
loadingDiv.classList.remove("hidden");

// Popup
function showPopup(content){
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popup-content");
  popupContent.innerHTML = content;
  popup.classList.remove("hidden");
  popupContent.classList.add("fade-in");
}
document.getElementById("close-popup").addEventListener("click", ()=>{
  document.getElementById("popup").classList.add("hidden");
});

// Calculate current day based on start time
function getCurrentDay() {
  const startTime = localStorage.getItem('habitStartTime');
  if (!startTime) {
    // First time user - set start time
    const now = new Date().getTime();
    localStorage.setItem('habitStartTime', now);
    return 1;
  }
  
  const start = parseInt(startTime);
  const now = new Date().getTime();
  const daysPassed = Math.floor((now - start) / (24 * 60 * 60 * 1000)) + 1;
  return Math.min(daysPassed, 30); // Max 30 days
}

// Initialize or load progress data
function initializeProgress() {
  try {
    let data = localDB.getItem("progress_saniya");
    
    if (!data) {
      // First time - create initial data
      data = { 
        proofs: [], 
        points: 0,
        startTime: new Date().getTime(),
        completedDays: []
      };
      localDB.setItem("progress_saniya", data);
      // Set start time in localStorage
      localStorage.setItem('habitStartTime', data.startTime.toString());
    } else {
      // Sync localStorage with stored start time
      if (data.startTime) {
        localStorage.setItem('habitStartTime', data.startTime.toString());
      }
    }
    
    // Use requestAnimationFrame for smoother calendar rendering
    requestAnimationFrame(() => {
      loadingDiv.classList.add("hidden");
      updateCalendar(data);
    });
  } catch (error) {
    console.error("Error initializing progress:", error);
    requestAnimationFrame(() => {
      loadingDiv.classList.add("hidden");
      // Fallback to empty data
      updateCalendar({ proofs: [], points: 0, completedDays: [] });
    });
  }
}

// Function to update progress data
function updateProgressData() {
  const data = localDB.getItem("progress_saniya");
  if (data) {
    updateCalendar(data);
  }
}

// Update Calendar
function updateCalendar(data) {
  const currentDay = getCurrentDay();
  
  // Use DocumentFragment for batch DOM updates
  const fragment = document.createDocumentFragment();
  
  // Pre-calculate completed days for better performance
  const completedDays = new Set(data.proofs?.map(p => p.day) || []);
  
  for(let i = 0; i < 30; i++) {
    const dayNum = i + 1;
    const div = document.createElement("div");
    div.className = "day";
    div.textContent = dayNum;
    
    // Build class list efficiently
    const classes = ["day"];
    
    // Check if day is completed
    if(completedDays.has(dayNum)) {
      classes.push("done");
    }
    
    // Mark weekly bonus days
    if(dayNum % 7 === 0) {
      classes.push("bonus");
    }
    
    // Lock past missed days and future days
    if(dayNum < currentDay && !completedDays.has(dayNum)) {
      classes.push("missed");
    } else if(dayNum > currentDay) {
      classes.push("locked");
    } else if(dayNum === currentDay) {
      classes.push("current");
    }
    
    // Set all classes at once
    div.className = classes.join(" ");
    
    // Add click handler only for current day
    if(dayNum === currentDay && !completedDays.has(dayNum)) {
      div.addEventListener("click", () => openTask(i, data));
    } else if(dayNum !== currentDay) {
      div.style.cursor = "not-allowed";
    }
    
    fragment.appendChild(div);
  }
  
  // Single DOM update
  calendar.innerHTML = "";
  calendar.appendChild(fragment);
  
  // Update points and progress
  pointsDisplay.textContent = data.points || 0;
  const progress = ((data.points || 0) / 300 * 100).toFixed(0);
  progressFill.style.width = progress + "%";
  progressText.textContent = progress + "%";
}

// Open Task
function openTask(dayIndex, data) {
  const dayNum = dayIndex + 1;
  const currentDay = getCurrentDay();
  
  if(dayNum !== currentDay) {
    showPopup("🚫 You can only complete today's habit!");
    return;
  }
  
  if(data.proofs?.some(p => p.day === dayNum)) {
    showPopup("✅ You've already completed today's habit!");
    return;
  }
  
  taskSection.classList.remove("hidden");
  taskTitle.textContent = `Day ${dayNum} Habit`;
  taskDesc.innerHTML = `<strong>${habits[dayIndex]}</strong><br><br><em>${appreciationMessages[dayIndex]}</em>`;
  
  markDoneBtn.onclick = () => submitTask(dayIndex, data);
}

// Submit Task with direct unsigned upload
async function submitTask(dayIndex, data) {
  const file = proofUpload.files[0];
  if(!file) {
    alert("Please upload proof to complete the habit!");
    return;
  }
  
  const dayNum = dayIndex + 1;
  
  // Show uploading message
  markDoneBtn.textContent = "Uploading... ⏳";
  markDoneBtn.disabled = true;
  
  try {
    // Create FormData for unsigned upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'habit_tracker_preset'); // The preset you created
    formData.append('folder', `proofs/day${dayNum}`);
    
    // Upload to Cloudinary using unsigned upload
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Upload successful:', result);
    
    let progressData = data ? { ...data } : localDB.getItem("progress_saniya") || { proofs: [], points: 0, completedDays: [] };
    
    // Add proof if not already exists
    if(!progressData.proofs.some(p => p.day === dayNum)) {
      progressData.proofs.push({ 
        day: dayNum, 
        url: result.secure_url,
        timestamp: new Date(),
        public_id: result.public_id
      });
      progressData.points = (progressData.points || 0) + 10;
      
      if(!progressData.completedDays) {
        progressData.completedDays = [];
      }
      progressData.completedDays.push(dayNum);
    }
    
    // Save to local storage
    localDB.setItem("progress_saniya", progressData);
    
    // Update UI
    updateCalendar(progressData);
    
    // Hide task section
    taskSection.classList.add("hidden");
    proofUpload.value = "";
    markDoneBtn.textContent = "Mark as Done ✅";
    markDoneBtn.disabled = false;
    
    // Show appreciation message
    showPopup(appreciationMessages[dayIndex]);
    
    // Check for weekly bonus
    if(dayNum % 7 === 0) {
      setTimeout(() => {
        checkWeeklyBonus(dayNum, progressData);
      }, 2000);
    }
    
  } catch (error) {
    console.error('Upload failed:', error);
    
    // Fallback: store file as base64 for local testing
    const reader = new FileReader();
    reader.onload = function(e) {
      let progressData = data ? { ...data } : localDB.getItem("progress_saniya") || { proofs: [], points: 0, completedDays: [] };
      
      if(!progressData.proofs.some(p => p.day === dayNum)) {
        progressData.proofs.push({ 
          day: dayNum, 
          url: e.target.result, // Base64 data URL as fallback
          timestamp: new Date(),
          public_id: `local_day_${dayNum}_${Date.now()}`
        });
        progressData.points = (progressData.points || 0) + 10;
        
        if(!progressData.completedDays) {
          progressData.completedDays = [];
        }
        progressData.completedDays.push(dayNum);
      }
      
      localDB.setItem("progress_saniya", progressData);
      updateCalendar(progressData);
      
      taskSection.classList.add("hidden");
      proofUpload.value = "";
      markDoneBtn.textContent = "Mark as Done ✅";
      markDoneBtn.disabled = false;
      
      showPopup(appreciationMessages[dayIndex] + "<br><br><small>Note: Image stored locally. Upload preset may need configuration for cloud storage.</small>");
      
      if(dayNum % 7 === 0) {
        setTimeout(() => {
          checkWeeklyBonus(dayNum, progressData);
        }, 2000);
      }
    };
    
    reader.readAsDataURL(file);
  }
}

// Check Weekly Bonus
function checkWeeklyBonus(dayNum, data) {
  const week = Math.floor((dayNum - 1) / 7) + 1;
  const weekStart = (week - 1) * 7 + 1;
  const weekEnd = week * 7;
  
  // Count completed days in this week
  const weekCompleted = data.proofs.filter(p => 
    p.day >= weekStart && p.day <= weekEnd
  ).length;
  
  if(weekCompleted === 7) {
    const bonus = bonusMessages[week];
    if(bonus) {
      if(bonus.type === "text") {
        showPopup(bonus.content);
      } else if(bonus.type === "audio") {
        showPopup(`<div style="text-align: center;"><p>🎵 Special Audio Message for You! 🎵</p><audio controls src="${bonus.content}" style="width: 100%; max-width: 300px;"></audio></div>`);
      } else if(bonus.type === "video") {
        showPopup(`<div style="text-align: center;"><p>🎬 Special Video Message for You! 🎬</p><video controls style="width: 100%; max-width: 300px;"><source src="${bonus.content}" type="video/mp4"></video></div>`);
      }
    }
  } else {
    showPopup("⚠️ Weekly bonus locked! You missed some habits this week.");
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initializeProgress();
  
  // Add event listener to update progress data periodically
  setInterval(updateProgressData, 5000);
});

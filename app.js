// Cloudinary Config
const CLOUDINARY_CONFIG = {
  cloudName: 'your-cloud-name', // You'll need to get this from your Cloudinary dashboard
  apiKey: '219634793157291',
  uploadPreset: 'habit_tracker' // You'll need to create this in Cloudinary
};

// Local Storage Keys
const STORAGE_KEYS = {
  progress: 'habit_progress',
  startTime: 'habitStartTime'
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
  "Day 5: Your smile makes my day brighter! 😊",
  "Day 6: You're absolutely incredible 💖",
  "Day 7: First week done! You rock! 👏",
  "Day 8: Another beautiful day with you! 💖",
  "Day 9: Your energy is so infectious! ⚡",
  "Day 10: You're doing amazing, love! 💖",
  "Day 11: You're glowing today! ✨",
  "Day 12: Another step forward, proud of you! 💖",
  "Day 13: Your positivity is amazing! 💌",
  "Day 14: Two weeks of awesomeness! 👏",
  "Day 15: Halfway through the month! 💖",
  "Day 16: Keep being fabulous, queen! 🌹",
  "Day 17: You're absolutely amazing! 💖",
  "Day 18: You did it again! So proud! 👏",
  "Day 19: You're a bright shining star! ✨",
  "Day 20: You absolutely rock! 👏",
  "Day 21: Three weeks done! Champion! 🎉",
  "Day 22: Keep shining bright, love! 💖",
  "Day 23: You're truly incredible! 💌",
  "Day 24: Almost there, keep going! 🌹",
  "Day 25: Stay awesome, beautiful! 💌",
  "Day 26: Keep shining so bright! ✨",
  "Day 27: Almost at the finish line! 🌟",
  "Day 28: Last few days, you're amazing! 👏",
  "Day 29: Almost there, my love! 🌹",
  "Day 30: Month complete! You're my queen! 🎉"
];

// --- Weekly bonus messages ---
const bonusMessages = {
  1: { type:"text", content:"👏 First week done! I love you infinitely, meri jaan!" },
  2: { type:"text", content:"🌟 Two weeks of amazing progress! You're incredible!" },
  3: { type:"text", content:"✨ Three weeks strong! Almost there, my love!" },
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

// Local Storage Helper Functions
function getProgressData() {
  const data = localStorage.getItem(STORAGE_KEYS.progress);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing progress data:", e);
    }
  }
  return { 
    proofs: [], 
    points: 0,
    startTime: new Date().getTime(),
    completedDays: []
  };
}

function saveProgressData(data) {
  try {
    localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error("Error saving progress data:", e);
    return false;
  }
}

// Calculate current day based on start time
function getCurrentDay() {
  let startTime = localStorage.getItem(STORAGE_KEYS.startTime);
  if (!startTime) {
    // First time user - set start time
    const now = new Date().getTime();
    localStorage.setItem(STORAGE_KEYS.startTime, now);
    
    // Also save to progress data
    const progressData = getProgressData();
    progressData.startTime = now;
    saveProgressData(progressData);
    
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
    const data = getProgressData();
    
    // Sync localStorage start time with progress data
    if (data.startTime) {
      localStorage.setItem(STORAGE_KEYS.startTime, data.startTime.toString());
    }
    
    loadingDiv.classList.add("hidden");
    updateCalendar(data);
  } catch (error) {
    console.error("Error initializing progress:", error);
    loadingDiv.classList.add("hidden");
    // Fallback to empty data
    updateCalendar({ proofs: [], points: 0, completedDays: [] });
  }
}

// Update Calendar
function updateCalendar(data) {
  const currentDay = getCurrentDay();
  calendar.innerHTML = "";
  
  for(let i = 0; i < 30; i++) {
    const dayNum = i + 1;
    const div = document.createElement("div");
    div.className = "day";
    div.textContent = dayNum;
    
    // Check if day is completed
    if(data.proofs?.some(p => p.day === dayNum)) {
      div.classList.add("done");
    }
    
    // Mark weekly bonus days
    if(dayNum % 7 === 0) {
      div.classList.add("bonus");
    }
    
    // Lock past missed days and future days
    if(dayNum < currentDay && !data.proofs?.some(p => p.day === dayNum)) {
      div.classList.add("missed");
    } else if(dayNum > currentDay) {
      div.classList.add("locked");
    } else if(dayNum === currentDay) {
      div.classList.add("current");
    }
    
    // Add click handler only for current day
    if(dayNum === currentDay && !data.proofs?.some(p => p.day === dayNum)) {
      div.addEventListener("click", () => openTask(i, data));
    } else if(dayNum !== currentDay) {
      div.style.cursor = "not-allowed";
    }
    
    calendar.appendChild(div);
  }
  
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

// Upload to Cloudinary
async function uploadToCloudinary(file, dayNum) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  formData.append('folder', `habit_tracker/day${dayNum}`);
  formData.append('resource_type', 'auto'); // Handles both images and videos
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/auto/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
      resourceType: data.resource_type
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}

// Submit Task
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
    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(file, dayNum);
    
    // Update progress data
    let progressData = { ...data };
    
    // Add proof if not already exists
    if(!progressData.proofs.some(p => p.day === dayNum)) {
      progressData.proofs.push({ 
        day: dayNum, 
        url: uploadResult.url,
        publicId: uploadResult.publicId,
        resourceType: uploadResult.resourceType,
        timestamp: new Date().toISOString()
      });
      progressData.points = (progressData.points || 0) + 10;
      
      if(!progressData.completedDays) {
        progressData.completedDays = [];
      }
      progressData.completedDays.push(dayNum);
    }
    
    // Save to localStorage
    saveProgressData(progressData);
    
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
    console.error("Error uploading proof:", error);
    alert("Upload failed. Please check your internet connection and try again.");
    markDoneBtn.textContent = "Mark as Done ✅";
    markDoneBtn.disabled = false;
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
      showPopup(bonus.content);
    }
  } else {
    showPopup("⚠️ Weekly bonus locked! You missed some habits this week.");
  }
}

// Auto-save functionality - listen for storage changes from other tabs
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEYS.progress) {
    const newData = JSON.parse(e.newValue || '{}');
    updateCalendar(newData);
  }
});

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initializeProgress();
});

// Export functions for gallery to use
window.HabitTracker = {
  getProgressData,
  saveProgressData,
  habits,
  appreciationMessages,
  STORAGE_KEYS
};

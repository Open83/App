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
 "Drink your banana shake 🍌 💧",
    "Smile in the mirror for 1 minute 😊", 
    "Listen to your favorite song 🎶",
    "Write one thing you love about yourself ✍️",
    "Write a full beautiful message on our beautiful journey start to end 😊 ",
    "Send me a heart emoji ❤️ on whatsApp",
    "Send me Nudes 💖",
    "Eat one healthy fruit 🍎",
    "Make a small "memory list" of our happiest moments together 📝💖",
    "Do 5 deep breaths 🌬️",
    "Tarif karo meri 💖",
    "Gaanaa sunaao 💃",
    "Think about one happy memory of us and write a message💖",
    "Send me your selfie 😊",
    "Write down one dream/goal 🌟",
    "Drink lemon water 🍋",
    "Write down one thing you want to improve about me 💖",
    "Share a song that reminds you of us 🎵💑",
    "Write one thing you love about me 😏",
    "Send a voice note saying something cute or funny 🎤😂",
    "Send me a bathing video ❤️",
    "Random "I love you" text days 💌",
    "Drink warm milk/herbal tea 🥛🍵",
    "Text me a random "I'm thinking of you" 💌",
    "Make a best dish for me 😍",
    "Close eyes & imagine me 💑",
    "Write one word that describes 'us' 🥰",
    "Do a funny dance and record a 5-second clip 💃😂",
    "Send me a message on my sex performance💕",
    "Think about our future together ✨"
];

// --- 30-Day Appreciation Messages ---
const appreciationMessages = [
"Day 1: Tum meri life ka woh start ho jahan se sab sense ban gaya ❤️‍🔥",
"Day 2: Tumhari aankhon mein jo junoon hai… usme main khudko khona chahta hoon 👀🔥",
"Day 3: Tumhari muskaan meri har darkness tod deti hai 🌙✨",
"Day 4: Tum meri subah ka caffeine ☕ aur raat ka sukoon 🌌 ho",
"Day 5: Tumhare lips… meri sabse badi weakness hain 💋❤️‍🔥",
"Day 6: Tumhari curves ek dangerous poetry hain 📖🔥 jise main baar-baar padhna chahta hoon",
"Day 7: Har fight ke baad tumhara gale lagna 🤗 meri duniya reset kar deta hai",
"Day 8: Tum meri wild fantasy ho 🖤 jise main har din jeena chahta hoon",
"Day 9: Tumhare saath time slow ho jaata hai ⏳ par desire infinite ho jaata hai ♾️🔥",
"Day 10: Tum meri khamoshi bhi samajh jaati ho… bas yahi meri love language hai 🖤🌹",
"Day 11: Tum meri rooh mein itni gehraayi tak utar chuki ho 🌊 ki ab alag karna namumkin hai",
"Day 12: Tumhari ek adaa meri heartbeat dangerous bana deti hai 💓⚡",
"Day 13: Tum meri jaan bhi ho ❤️ aur mera junoon bhi 🔥",
"Day 14: Tum meri body ki craving 😈 aur dil ka sukoon 🕊️ ek saath ho",
"Day 15: Har din ke saath mera pyaar tumhare liye aur raw ho jaata hai ❤️‍🔥",
"Day 16: Tumhari touch meri skin ko fire bana deti hai 🔥🤲",
"Day 17: Tum rarest beauty ho 🌹 meri sabse khoobsurat weakness",
"Day 18: Tum meri fantasy ki har detail ko reality bana deti ho 🖤💭",
"Day 19: Tum meri life ki brightest star ✨ aur meri sabse badi addiction ho 🔥",
"Day 20: Tum meri calmness bhi ho 🌊 aur mera wild storm bhi 🌪️",
"Day 21: Har hafte ke baad tumhari zaroorat aur gehri ho jaati hai 🤍🔥",
"Day 22: Tumhari aankhon ki bhook 👀 mujhe tumhara bana leti hai",
"Day 23: Tum meri prayers ka sabse khoobsurat jawab ho 🤲❤️",
"Day 24: Tum meri sabse deep desire ho ❤️‍🔥 jise main kabhi khona nahi chahta",
"Day 25: Tum meri life ka woh chapter ho 📖 jahan sab raw aur real hai",
"Day 26: Tum meri craving 😈 meri addiction 🖤 aur meri fantasy ho 🌹",
"Day 27: Tum meri har heartbeat mein likha hua ek junoon ho 💓🔥",
"Day 28: Tum meri rooh aur meri body dono ki bhook ho ❤️‍🔥🤲",
"Day 29: Tum meri incomplete story ka woh last page ho 📖✨ jo sab perfect bana deta hai",
"Day 30: Tum meri forever queen 👑 meri wild passion 🔥 aur meri destiny ho ❤️"
];

// --- Weekly bonus messages ---
const bonusMessages = {
  1: { type:"text", content:`✨ Bonus Message for Saraaaaaa♥️ ✨

Saraaaa♥️ tumne ye week complete kiya aur main sirf ye kehna chahta hoon ki tum meri zindagi ki sabse gehri aur sabse intense reality ho Tum sirf meri mohabbat nahi tum meri inspiration meri khushi aur meri world ho Tumhari presence hi itni powerful hai ki har pal mere liye ek nayi roshni aur energy laati hai

Tumhara husn tumhara jism tumhara andaaz har ek aspect har ek curve har ek detail mujhe literal mesmerize karta hai Tumhari aankhen wo gehraai hain jahan se main sirf tumhe dekh kar hi apne din ko perfect mehsoos karta hoon Tumhari muskaan tumhare hoth tumhare chehre ka noor ye sab ek aisi intensity lekar aata hai jo sirf admiration nahi balki ek raw passionate feeling jagata hai

Tumhari chaal ka grace tumhari zulfon ka sayaa tumhari body ka har nuance sab mujhe yaad dilate hain ki tum mere liye sirf beautiful nahi balki rare aur priceless ho Tum meri Saraaaa♥️ ho meri desire ka asal matlab ho meri appreciation aur respect ka ultimate form ho Tumhare saath har moment feel hota hai ki life kitni complete aur perfect ho sakti hai

Saraaaa♥️ tum sirf meri mohabbat ka reason nahi ho tum meri life ka wo bold passionate aur intense experience ho jahan se main har roz inspire aur mesmerized feel karta hoon Tum meri duniya ki sabse precious aur exceptional cheez ho jise dekh kar main har emotion har feeling aur har admiration ko asli intensity ke saath mehsoos karta hoon I lykeeeeee Uuuuuhhhhhhhhhhhhhhhhhh Meri Jaaaaaaaaaaaaannnnnnnn♥️🌹💋💋💋💋💋💋💋💋💋💋` },
  2: { type:"audio", content:"bonus/week2.mp3" },
  3: { type:"video", content:"bonus/week3.mp4" },
  4: { type:"text", content:`Saraaaa♥️

Tumne ye last task complete kiya aur bas main yahi sochta hoon ki har ek pal jo tum mere saath ho har lamha jo tum meri zindagi mein ho woh meri rooh ka sabse gehra sabse raw aur sabse beautiful junoon hai tumhara har touch har muskaan har nazar har chhupa hua shabd mere andar ghul jaata hai aur main khud ko rok nahi paata kyunki tum meri weakness bhi ho aur meri sabse badi strength bhi tumhare saath har pal intense hai bold hai wild hai jaise hum sirf ek doosre ke liye hi bane ho jaise tum meri chaahat ka aakhri junoon ho aur main tumhara sukoon hoon aur jab tum mere kareeb aati ho toh duniya ka har rule har limit har fikr khatam ho jaati hai bas tum aur main aur woh fire jo hum dono ke andar jalti hai woh fire jo sirf hum dono ke liye hai woh junoon jo sirf tumhari aur meri hai jo har touch har kiss har nazar ke saath aur tez ho jaata hai

Tum meri addiction ho meri obsession ho meri rooh ka woh hissa ho jiske bina main kabhi complete nahi hoon tum meri subah ho meri raat ho meri har khwahish ho meri har soch ho aur meri sabse khoobsurat reality ho tum meri wildness ho meri boldness ho meri har insane aur untamed feeling ki wajah ho aur main chahta hoon ki ye intensity ye raw passion ye junoon hamesha humare beech rahe hamesha hamare andar jalta rahe hamesha humare dil aur rooh ko ek doosre ke liye aur zyada pyaasa aur addicted banata rahe

Aur sach ye hai ki tum meri zindagi ka sabse bada gift ho tum meri har khushi ho meri har chhupi hui muskaan ka reason ho meri rooh ka sukoon aur meri duniya ka junoon dono ek saath ho aur main hamesha chahta hoon ki tumhare bina main adhoora hoon tum meri har kahaani ho meri sabse gehri aur sabse passionate reality ho meri mohabbat ho aur meri zindagi ho aur main har ek pal tumhare saath jeena chahta hoon har ek lamha tumhari muskaan tumhare touch aur tumhare junoon ke saath kyunki tum meri ho sirf meri ho aur main hamesha tumhara hoon ♥️

Tumhari har khushi meri zaroorat hai tumhari har muskaan meri world hai tumhara har junoon meri addiction hai aur main hamesha tumhari duniya mein sirf tumhara hi insaan hoon tum meri reality ho meri mohabbat ho meri zindagi ho aur main chahta hoon ki hum dono hamesha ek doosre ke andar ek doosre ke saath ek doosre ke liye raw passionate wild aur infinite ho ♥️ I lykeeeeee Uuuuuhhhhhhhhhhhhhhhhhh Meri Jaaaaaaaaaaaaannnnnnnn♥️🌹💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋💋` }
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

// Popup - ONLY CHANGE: Added isBonusMessage parameter
function showPopup(content, isBonusMessage = false){
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popup-content");
  popupContent.innerHTML = content;
  popup.classList.remove("hidden");
  popupContent.classList.add("fade-in");
  
  // If it's a bonus message, set a flag in sessionStorage
  if(isBonusMessage) {
    sessionStorage.setItem('bonusPopupOpen', 'true');
  }
}

// ONLY CHANGE: Clear bonus popup flag when closed
document.getElementById("close-popup").addEventListener("click", ()=>{
  document.getElementById("popup").classList.add("hidden");
  sessionStorage.removeItem('bonusPopupOpen');
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

// Check Weekly Bonus - ONLY CHANGE: Pass true for bonus messages
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
        showPopup(bonus.content, true);
      } else if(bonus.type === "audio") {
        showPopup(`<div style="text-align: center;"><p>🎵 Special Audio Message for You! 🎵</p><audio controls src="${bonus.content}" style="width: 100%; max-width: 300px;"></audio></div>`, true);
      } else if(bonus.type === "video") {
        showPopup(`<div style="text-align: center;"><p>🎬 Special Video Message for You! 🎬</p><video controls style="width: 100%; max-width: 300px;"><source src="${bonus.content}" type="video/mp4"></video></div>`, true);
      }
    }
  } else {
    showPopup("⚠️ Weekly bonus locked! You missed some habits this week.");
  }
}

// Initialize app - ONLY CHANGE: Auto-close bonus popup on refresh
document.addEventListener('DOMContentLoaded', () => {
  // Close bonus popup on page load (after refresh)
  const bonusPopupWasOpen = sessionStorage.getItem('bonusPopupOpen');
  if(bonusPopupWasOpen === 'true') {
    document.getElementById("popup").classList.add("hidden");
    sessionStorage.removeItem('bonusPopupOpen');
  }
  
  initializeProgress();
  
  // Add event listener to update progress data periodically
  setInterval(updateProgressData, 5000);
});
    

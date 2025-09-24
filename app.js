// Supabase Config
const supabaseUrl = 'https://jvjbwpmgktkxsndtqydc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2amJ3cG1na3RreHNuZHRxeWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MDQxNzMsImV4cCI6MjA3NDI4MDE3M30.kDM9B1BlogBqfKabyc9B5gi6DObcIrVBOwaTH6AX4IE';

// Initialize Supabase client
const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

// --- 30-Day Habits ---
const habits = [
  "Drink 6—8 glasses of water 💧",
  "Smile in the mirror for 1 minute 😊", 
  "Listen to your favorite song 🎶",
  "Write one thing you love about yourself ✏️",
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
  "Write a short poem or note ✏️",
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
async function initializeProgress() {
  try {
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', 'saniya')
      .single();
    
    let progressData;
    
    if (error && error.code === 'PGRST116') {
      // No data found - create initial record
      progressData = { 
        user_id: 'saniya',
        App: [], 
        points: 0,
        start_time: new Date().getTime(),
        completed_days: []
      };
      
      const { error: insertError } = await supabase
        .from('progress')
        .insert([progressData]);
        
      if (insertError) {
        console.error("Error creating initial progress:", insertError);
        throw insertError;
      }
    } else if (error) {
      console.error("Error fetching progress:", error);
      throw error;
    } else {
      progressData = data;
      // Sync localStorage with Supabase start time
      if (progressData.start_time) {
        localStorage.setItem('habitStartTime', progressData.start_time.toString());
      }
    }
    
    loadingDiv.classList.add("hidden");
    updateCalendar(progressData);
  } catch (error) {
    console.error("Error initializing progress:", error);
    loadingDiv.classList.add("hidden");
    // Fallback to empty data
    updateCalendar({ App: [], points: 0, completed_days: [] });
  }
}

// Set up real-time subscription for progress updates
function setupRealtimeSubscription() {
  const subscription = supabase
    .channel('progress-changes')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'progress',
      filter: 'user_id=eq.saniya'
    }, (payload) => {
      console.log('Real-time update:', payload);
      if (payload.new) {
        updateCalendar(payload.new);
      }
    })
    .subscribe();

  return subscription;
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
    if(data.App?.some(p => p.day === dayNum)) {
      div.classList.add("done");
    }
    
    // Mark weekly bonus days
    if(dayNum % 7 === 0) {
      div.classList.add("bonus");
    }
    
    // Lock past missed days and future days
    if(dayNum < currentDay && !data.App?.some(p => p.day === dayNum)) {
      div.classList.add("missed");
    } else if(dayNum > currentDay) {
      div.classList.add("locked");
    } else if(dayNum === currentDay) {
      div.classList.add("current");
    }
    
    // Add click handler only for current day
    if(dayNum === currentDay && !data.App?.some(p => p.day === dayNum)) {
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
  
  if(data.App?.some(p => p.day === dayNum)) {
    showPopup("✅ You've already completed today's habit!");
    return;
  }
  
  taskSection.classList.remove("hidden");
  taskTitle.textContent = `Day ${dayNum} Habit`;
  taskDesc.innerHTML = `<strong>${habits[dayIndex]}</strong><br><br><em>${appreciationMessages[dayIndex]}</em>`;
  
  markDoneBtn.onclick = () => submitTask(dayIndex, data);
}

// Upload file to Supabase Storage
async function uploadFile(file, dayNum) {
  console.log(file)
  
  const fileName = `day${dayNum}/${Date.now()}_${file.name}`;
  
  console.log(fileName)
  const { data, error } = await supabase.storage
    .from('App')
    .upload(fileName, file);

  if (error) {
    console.error('Upload error:', error);
    throw error;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('App')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
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
    // Upload file to Supabase Storage
    const fileUrl = await uploadFile(file, dayNum);
    
    // Update progress data
    let progressData = { ...data };
    
    // Add proof if not already exists
    if(!progressData.App.some(p => p.day === dayNum)) {
      progressData.App.push({ 
        day: dayNum, 
        url: fileUrl, 
        timestamp: new Date().toISOString()
      });
      progressData.points = (progressData.points || 0) + 10;
      
      if(!progressData.completed_days) {
        progressData.completed_days = [];
      }
      progressData.completed_days.push(dayNum);
    }
    
    // Update database
    const { error } = await supabase
      .from('progress')
      .update({
        App: progressData.App,
        points: progressData.points,
        completed_days: progressData.completed_days
      })
      .eq('user_id', 'saniya');
    
    if (error) {
      console.error("Error updating progress:", error);
      throw error;
    }
    
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
    console.error("Error saving progress:", error);
    alert("Failed to save progress. Please try again.");
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
  const weekCompleted = data.App.filter(p => 
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
  setupRealtimeSubscription();
});

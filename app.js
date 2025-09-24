// ================================
// Supabase Config
// ================================
const SUPABASE_URL = "https://jvjbwpmgktkxsndtqydc.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2amJ3cG1na3RreHNuZHRxeWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MDQxNzMsImV4cCI6MjA3NDI4MDE3M30.kDM9B1BlogBqfKabyc9B5gi6DObcIrVBOwaTH6AX4IE";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Hardcoded user (since no auth)
const userId = "default_user";

// ================================
// DOM Elements
// ================================
const calendar = document.getElementById("calendar");
const taskSection = document.getElementById("task-section");
const taskTitle = document.getElementById("task-title");
const taskDesc = document.getElementById("task-desc");
const proofUpload = document.getElementById("proof-upload");
const completeBtn = document.getElementById("complete-btn");
const pointsEl = document.getElementById("points");
const badgesEl = document.getElementById("badges");

const popup = document.getElementById("popup");
const popupContent = document.getElementById("popup-content");
const popupClose = document.querySelector(".popup-close");

// ================================
// Habit & Messages Arrays
// ================================
const habits = [
  "Meditate for 10 minutes",
  "Drink 8 glasses of water",
  "Read 10 pages of a book",
  "Exercise for 30 minutes",
  "Write 3 things you’re grateful for",
  "Avoid social media for 2 hours",
  "Eat a healthy breakfast",
  "Practice deep breathing",
  "Take a 20-minute walk",
  "Call a loved one",
  "Sleep before 11 PM",
  "Do 20 push-ups",
  "Plan tomorrow’s tasks",
  "Listen to calming music",
  "Stretch for 15 minutes",
  "Write in your journal",
  "Declutter one small area",
  "Cook a healthy meal",
  "Limit screen time",
  "Practice positive affirmations",
  "Drink green tea",
  "Review your goals",
  "Spend time in nature",
  "Do a random act of kindness",
  "Take a cold shower",
  "Practice mindfulness",
  "Limit sugar intake",
  "Write down your dreams",
  "Avoid junk food",
  "Reflect on your day"
];

const appreciationMessages = [
  "Proud of you for starting your journey! 🌸",
  "Keep going, you’re glowing! ✨",
  "You’re unstoppable! 💪",
  "Day by day, you’re becoming your best self 🌟",
  "Small steps lead to big changes ❤️",
  "Your dedication inspires me 💕",
  "Consistency is your superpower ⚡",
  "Look at you go! 🚀",
  "You’re shining brighter each day 🌞",
  "Proud moment alert! 🎉",
  "Keep up the amazing work 🌈",
  "Discipline is your new best friend 🤝",
  "Stay strong, you’re doing amazing 💖",
  "Growth looks good on you 🌿",
  "You’re proving yourself every day 🌹",
  "Love the effort you’re putting in 💎",
  "Proud of your resilience 🦋",
  "Keep creating magic ✨",
  "You’re unstoppable 🔥",
  "Progress, not perfection 🌼",
  "Keep showing up for yourself 🌸",
  "I’m so proud of you ❤️",
  "You’re glowing differently 🌟",
  "Keep chasing your best self 🌈",
  "Strong mind, strong body 💪",
  "Every effort counts 💖",
  "The new you is inspiring 🌿",
  "Your dedication = wow 😍",
  "You’re smashing it! 🔥",
  "Love your journey so far 🌸"
];

// ================================
// User Progress Data
// ================================
let progressData = {
  points: 0,
  completedDays: [],
  proofs: [],
  badges: [],
  weeklyBonuses: []
};

// ================================
// Database Functions
// ================================

// Load user progress
async function loadProgress() {
  const { data, error } = await supabase
    .from("users")
    .select("progress")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error loading progress:", error);
    return;
  }

  if (data && data.progress) {
    progressData = data.progress;
  } else {
    // Insert new row if not exists
    await supabase.from("users").insert([{ id: userId, progress: progressData }]);
  }

  updateUI();
}

// Save user progress
async function saveProgress() {
  const { error } = await supabase
    .from("users")
    .update({ progress: progressData })
    .eq("id", userId);

  if (error) console.error("Error saving progress:", error);
}

// ================================
// Calendar UI
// ================================
function renderCalendar() {
  calendar.innerHTML = "";

  for (let i = 1; i <= 30; i++) {
    const dayEl = document.createElement("div");
    dayEl.classList.add("day");
    dayEl.textContent = i;

    if (progressData.completedDays.includes(i)) {
      dayEl.classList.add("completed");
    }

    dayEl.addEventListener("click", () => openTask(i));
    calendar.appendChild(dayEl);
  }
}

// ================================
// Task Functions
// ================================
let currentDay = null;
let currentFile = null;

function openTask(dayNum) {
  currentDay = dayNum;
  taskSection.classList.remove("hidden");
  taskTitle.textContent = `Day ${dayNum} Habit`;
  taskDesc.innerHTML = `<strong>${habits[dayNum - 1]}</strong><br><br><em>${appreciationMessages[dayNum - 1]}</em>`;
}

proofUpload.addEventListener("change", (e) => {
  currentFile = e.target.files[0];
});

completeBtn.addEventListener("click", async () => {
  if (!currentDay || !currentFile) {
    alert("Please select a proof file first.");
    return;
  }

  // Upload file to Supabase Storage
  const filePath = `${userId}/day-${currentDay}-${Date.now()}-${currentFile.name}`;
  const { error: uploadError } = await supabase.storage
    .from("proofs")
    .upload(filePath, currentFile);

  if (uploadError) {
    console.error("Upload error:", uploadError);
    alert("Failed to upload file.");
    return;
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage.from("proofs").getPublicUrl(filePath);
  const url = publicUrlData.publicUrl;

  // Update progress
  progressData.completedDays.push(currentDay);
  progressData.points += 10;
  progressData.proofs.push({ day: currentDay, url, timestamp: new Date().toISOString() });

  saveProgress();
  updateUI();

  alert("Task completed! 🎉");
  taskSection.classList.add("hidden");
  proofUpload.value = "";
  currentFile = null;
});

// ================================
// UI Update
// ================================
function updateUI() {
  renderCalendar();
  pointsEl.textContent = progressData.points;

  badgesEl.innerHTML = "";
  progressData.badges.forEach((b) => {
    const badge = document.createElement("div");
    badge.classList.add("badge");
    badge.textContent = b;
    badgesEl.appendChild(badge);
  });
}

// ================================
// Popup
// ================================
function showPopup(content) {
  popupContent.innerHTML = content;
  popup.classList.remove("hidden");
}

popupClose.addEventListener("click", () => {
  popup.classList.add("hidden");
});

// ================================
// Init
// ================================
loadProgress();

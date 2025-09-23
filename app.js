// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBRHExv8tG8UQvPY-TN8hQQNtWLbX1Dl8U",
  authDomain: "asif-aea0e.firebaseapp.com",
  projectId: "asif-aea0e",
  storageBucket: "asif-aea0e.firebasestorage.app",
  messagingSenderId: "852407491441",
  appId: "1:852407491441:web:448918c78ed2b62c2ef4d0",
  measurementId: "G-HKQR6NH2HB"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// --- 30-Day Habits ---
const habits = [
  "Drink 6–8 glasses of water 💧",
  "Smile in the mirror for 1 minute 😊",
  "Listen to your favorite song 🎶",
  "Write one thing you love about yourself ✍️",
  "Take a 10 min walk/stretch 🚶‍♀️",
  "Send a heart emoji ❤️ to me",
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

// --- 30-Day Random Appreciation Messages Pool ---
const messagesPool = [
  ["Day 1: You're amazing, keep shining! 🌸","Day 1: So proud of you today! 💖","Day 1: You make my heart happy! ❤️"],
  ["Day 2: Keep spreading your light! 🌟","Day 2: I love seeing you happy! 💌","Day 2: You’re unstoppable! 💖"],
  ["Day 3: Today was beautiful because of you 🌹","Day 3: You make everything better 💖","Day 3: Proud of your efforts today! 🌸"],
  ["Day 4: You're my sunshine ☀️","Day 4: Keep shining, love! 💖","Day 4: Another day, another reason to smile 😊"],
  ["Day 5: Your smile makes my day! 😍","Day 5: Keep being amazing! 💌","Day 5: You inspire me every day! 🌸"],
  ["Day 6: You're incredible 💖","Day 6: So proud of your progress! 🌟","Day 6: Keep being fabulous! 🌹"],
  ["Day 7: First week done! You rock! 💝","Day 7: You’re my queen 👑","Day 7: Keep up the great work! 🌸"],
  ["Day 8: Another beautiful day! 💖","Day 8: You did amazing today! 🌟","Day 8: So proud of you! 😊"],
  ["Day 9: Your energy is infectious! ⚡","Day 9: Keep smiling, love! 💌","Day 9: You make life sweeter 🌸"],
  ["Day 10: You’re doing amazing! 💖","Day 10: Keep going, love! 🌟","Day 10: Proud of your effort today! ❤️"],
  ["Day 11: You’re glowing today! ✨","Day 11: Love your vibe 💌","Day 11: You inspire me! 🌹"],
  ["Day 12: Another step forward! 💖","Day 12: Keep up the great work! 🌟","Day 12: Proud of your dedication! 🌸"],
  ["Day 13: Your positivity is amazing! 💌","Day 13: You make the world brighter! 🌞","Day 13: Keep being awesome! 💖"],
  ["Day 14: Two weeks of awesomeness! 💝","Day 14: You did it! 👏","Day 14: Keep shining, love! 🌸"],
  ["Day 15: Halfway through the month! 💖","Day 15: You’re unstoppable! 🌟","Day 15: Proud of your consistency! ❤️"],
  ["Day 16: Keep being fabulous! 🌹","Day 16: Another day, another smile! 😊","Day 16: You inspire me every day! 💌"],
  ["Day 17: You’re amazing! 💖","Day 17: Keep shining bright! 🌸","Day 17: So proud of your effort today! 🌟"],
  ["Day 18: You did it again! 👏","Day 18: Keep going, love! 💌","Day 18: Another day of success! 💖"],
  ["Day 19: You’re a star! ✨","Day 19: Your energy is amazing ⚡","Day 19: Keep smiling today! 🌸"],
  ["Day 20: You rock! 💝","Day 20: Proud of you! 🌹","Day 20: Another step forward 💖"],
  ["Day 21: Three weeks done! 🎉","Day 21: You’re my queen 👑","Day 21: Keep being amazing! 🌸"],
  ["Day 22: Keep shining love! 💖","Day 22: Your effort is inspiring! 🌟","Day 22: You make my heart happy! ❤️"],
  ["Day 23: You’re incredible! 💌","Day 23: So proud of you! 🌸","Day 23: Keep up the great work! 💖"],
  ["Day 24: Almost there! 🌹","Day 24: Keep going, love! 💖","Day 24: You inspire me every day! 🌟"],
  ["Day 25: Stay awesome! 💌","Day 25: You’re amazing! 💖","Day 25: Another day of progress! 🌸"],
  ["Day 26: Keep shining bright! ✨","Day 26: You did great today! ❤️","Day 26: Proud of your consistency! 🌹"],
  ["Day 27: Almost at the finish line! 🌟","Day 27: You’re unstoppable! 💖","Day 27: Keep smiling, love! 💌"],
  ["Day 28: Last two days! 💝","Day 28: You rock! 🌸","Day 28: So proud of your dedication! 💖"],
  ["Day 29: Almost there, love! 🌹","Day 29: You did amazing! 💖","Day 29: Keep up the great work! 🌟"],
  ["Day 30: Month complete! 🎉","Day 30: You’re my queen 👑","Day 30: Forever proud of you! 💌"]
];

// --- Weekly bonus messages ---
const bonusMessages = {
  1: { type:"text", content:"💝 First week done! I love you infinitely, meri jaan!" },
  2: { type:"audio", content:"bonus/week2.mp3" },
  3: { type:"video", content:"bonus/week3.mp4" },
  4: { type:"text", content:"🌹 You’re my eternal queen. Forever proud of you!" }
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

// Load Progress
db.collection("progress").doc("saniya").onSnapshot(doc=>{
  const data = doc.data() || { proofs: [], points:0 };
  updateCalendar(data);
});

// Update Calendar
function updateCalendar(data){
  const today = new Date().getDate();
  calendar.innerHTML = "";
  for(let i=0;i<30;i++){
    const div = document.createElement("div");
    div.className="day";
    div.textContent=i+1;
    if(data.proofs?.some(p=>p.day===i+1)) div.classList.add("done");
    if((i+1)%7===0) div.classList.add("bonus");
    if(i+1>today) div.classList.add("locked");
    div.addEventListener("click",()=>openTask(i,today,data));
    calendar.appendChild(div);
  }
  pointsDisplay.textContent=data.points||0;
  const progress = ((data.points||0)/300*100).toFixed(0);
  progressFill.style.width=progress+"%";
  progressText.textContent=progress+"%";
}

// Open Task
function openTask(dayIndex,today,data){
  if(dayIndex+1>today){ showPopup("🚫 Future tasks cannot be completed yet!"); return; }
  taskSection.classList.remove("hidden");
  taskTitle.textContent=`Task for Day ${dayIndex+1}`;
  const messages = messagesPool[dayIndex];
  taskDesc.textContent = `${habits[dayIndex]} — ${messages[Math.floor(Math.random()*messages.length)]}`;
  markDoneBtn.onclick = () => submitTask(dayIndex,data);
}

// Submit Task
function submitTask(dayIndex,data){
  const file = proofUpload.files[0];
  if(!file) return alert("Upload proof!");
  const storageRef = storage.ref(`proofs/day${dayIndex+1}/${file.name}`);
  const uploadTask = storageRef.put(file);

  uploadTask.on("state_changed",null,error=>console.error(error), async ()=>{
    const url = await storageRef.getDownloadURL();
    let progressData = { ...data };
    if(!progressData.proofs.some(p=>p.day===dayIndex+1)){
      progressData.proofs.push({ day: dayIndex+1, url });
      progressData.points += 10;
    }
    db.collection("progress").doc("saniya").set(progressData).then(()=>{
      // Show random appreciation message
      const messages = messagesPool[dayIndex];
      showPopup(messages[Math.floor(Math.random()*messages.length)]);
      // Weekly bonus
      if((dayIndex+1)%7===0){
        const week = Math.floor(dayIndex/7)+1;
        const weekProof = progressData.proofs.filter(p=>p.day >= dayIndex-6 && p.day <= dayIndex+1).length;
        if(weekProof===7){
          const bonus = bonusMessages[week];
          if(bonus.type==="text") showPopup(bonus.content);
          if(bonus.type==="audio") showPopup(`<audio controls src="${bonus.content}"></audio>`);
          if(bonus.type==="video") showPopup(`<video controls width="250"><source src="${bonus.content}" type="video/mp4"></video>`);
        } else { showPopup("⚠️ Weekly bonus locked! You missed some tasks."); }
      }
      updateCalendar(progressData);
    });
  });
}

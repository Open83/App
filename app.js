// Dummy Firebase setup placeholder
// Replace with your Firebase config
const firebaseConfig = { /* your firebase config */ };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Habits
const habits = Array.from({length: 30}, (_, i) => `Habit ${i+1}: Do something beautiful 💖`);

// Appreciation messages (30)
const messages = [ /* same 30 messages I gave earlier */ ];

// Bonus messages
const bonusMessages = {
  1: { type: "text", content: "💝 First week done! I love you infinitely, meri jaan!" },
  2: { type: "audio", content: "bonus/week2.mp3" },
  3: { type: "video", content: "bonus/week3.mp4" },
  4: { type: "text", content: "🌹 You’re my eternal queen. Forever proud of you!" }
};

const calendar = document.getElementById("calendar");
const taskSection = document.getElementById("task-section");
const taskTitle = document.getElementById("task-title");
const taskDesc = document.getElementById("task-desc");
const markDoneBtn = document.getElementById("mark-done");
const proofUpload = document.getElementById("proof-upload");
const pointsDisplay = document.getElementById("points");

// Popup
function showPopup(content) {
  document.getElementById("popup-content").innerHTML = content;
  document.getElementById("popup").classList.remove("hidden");
}
document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("popup").classList.add("hidden");
});

// Calendar
function updateCalendar(data) {
  calendar.innerHTML = "";
  for (let i = 0; i < 30; i++) {
    const div = document.createElement("div");
    div.className = "day";
    div.textContent = i+1;

    if (data.proofs?.some(p => p.day === i+1)) div.classList.add("done");

    if ((i+1) % 7 === 0) {
      div.classList.add("bonus");
      const proofDone = data.proofs?.filter(p => p.day >= i-6 && p.day <= i+1).length;
      if (proofDone === 7) div.textContent += " ⭐";
    }

    div.addEventListener("click", () => openTask(i));
    calendar.appendChild(div);
  }
  pointsDisplay.textContent = data.points || 0;
}

// Open daily task
function openTask(dayIndex) {
  taskSection.classList.remove("hidden");
  taskTitle.textContent = `Task for Day ${dayIndex+1}`;
  taskDesc.textContent = habits[dayIndex];
  markDoneBtn.onclick = () => submitTask(dayIndex);
}

// Submit task
function submitTask(dayIndex) {
  const file = proofUpload.files[0];
  if (!file) return alert("Upload proof!");

  const proofData = { day: dayIndex+1, url: URL.createObjectURL(file) };

  db.collection("progress").doc("saniya").get().then(doc => {
    let data = doc.data() || { proofs: [], points: 0 };
    data.proofs.push(proofData);
    data.points += 10;

    db.collection("progress").doc("saniya").set(data).then(() => {
      showPopup(messages[dayIndex]);

      if ((dayIndex+1) % 7 === 0) {
        const week = Math.floor(dayIndex/7) + 1;
        const completed = data.proofs.filter(p => p.day >= dayIndex-6 && p.day <= dayIndex+1).length;
        if (completed === 7) {
          const bonus = bonusMessages[week];
          if (bonus.type === "text") showPopup(bonus.content);
          if (bonus.type === "audio") showPopup(`<audio controls src="${bonus.content}"></audio>`);
          if (bonus.type === "video") showPopup(`<video controls width="250"><source src="${bonus.content}" type="video/mp4"></video>`);
        } else {
          showPopup("⚠️ Bonus locked! You missed some tasks.");
        }
      }

      updateCalendar(data);
    });
  });
}

// Load
db.collection("progress").doc("saniya").onSnapshot(doc => {
  updateCalendar(doc.data() || { proofs: [], points: 0 });
});

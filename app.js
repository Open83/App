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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// Habits (30 days)
const habits = Array.from({length: 30}, (_, i) => `Habit ${i+1}: Do something beautiful 💖`);

// Appreciation messages (dummy)
const messages = Array.from({length: 30}, (_, i) => `You completed Day ${i+1}! 💝`);

// Bonus messages
const bonusMessages = {
  1: { type: "text", content: "💝 First week done! I love you infinitely, meri jaan!" },
  2: { type: "audio", content: "bonus/week2.mp3" },
  3: { type: "video", content: "bonus/week3.mp4" },
  4: { type: "text", content: "🌹 You’re my eternal queen. Forever proud of you!" }
};

// DOM elements
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

// Submit task (upload to Firebase Storage)
function submitTask(dayIndex) {
  const file = proofUpload.files[0];
  if (!file) return alert("Upload proof!");

  const storageRef = storage.ref(`proofs/day${dayIndex+1}/${file.name}`);
  const uploadTask = storageRef.put(file);

  uploadTask.on("state_changed", null, (error) => {
    console.error("Upload failed:", error);
  }, async () => {
    const downloadURL = await storageRef.getDownloadURL();

    const proofData = { day: dayIndex+1, url: downloadURL };

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
  });
}

// Load initial
db.collection("progress").doc("saniya").onSnapshot(doc => {
  updateCalendar(doc.data() || { proofs: [], points: 0 });
});

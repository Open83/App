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

// Habits array for display
const habits = [
  "Drink your banana shake 🍌 💧",
    "Smile in the mirror for 1 minute 😊", 
    "Listen to your favorite song 🎶",
    "Write one thing you love about yourself ✍️",
    "Write a full beautiful message on our beautiful journey start to end 😊 ",
    "Send me a heart emoji ❤️ on whatsApp",
    "Send me Nudes 💖",
    "Eat one healthy fruit 🍎",
    "Make a small “memory list” of our happiest moments together 📝💖",
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
    "Random “I love you” text days 💌",
    "Drink warm milk/herbal tea 🥛🍵",
    "Text me a random “I’m thinking of you” 💌",
    "Make a best dish for me 😍",
    "Close eyes & imagine me 💑",
    "Write one word that describes 'us' 🥰",
    "Do a funny dance and record a 5-second clip 💃😂",
    "Send me a message on my sex performance💕",
    "Think about our future together ✨"
];

// Elements
const galleryGrid = document.getElementById("gallery-grid");
const galleryStats = document.getElementById("gallery-stats");
const filterSection = document.getElementById("filter-section");
const emptyState = document.getElementById("empty-state");
const loading = document.getElementById("loading");
const completedCount = document.getElementById("completed-count");
const totalPhotos = document.getElementById("total-photos");
const imageModal = document.getElementById("image-modal");
const modalClose = document.getElementById("modal-close");
const modalMedia = document.getElementById("modal-media");
const modalTitle = document.getElementById("modal-title");
const modalDate = document.getElementById("modal-date");

let currentFilter = 'all';
let allProofs = [];

// Load gallery data
function loadGalleryData() {
  const data = localDB.getItem("progress_saniya");
  if (data) {
    allProofs = data.proofs || [];
    loading.classList.add("hidden");
    displayGallery();
  } else {
    loading.classList.add("hidden");
    showEmptyState();
  }
}

// Initialize gallery
document.addEventListener('DOMContentLoaded', () => {
  loadGalleryData();
  
  // Refresh gallery data periodically
  setInterval(loadGalleryData, 5000);
});

// Display gallery
function displayGallery() {
  if (allProofs.length === 0) {
    showEmptyState();
    return;
  }

  hideEmptyState();
  updateStats();
  setupFilters();
  renderGallery();
}

// Show empty state
function showEmptyState() {
  emptyState.classList.remove("hidden");
  galleryStats.classList.add("hidden");
  filterSection.classList.add("hidden");
  galleryGrid.classList.add("hidden");
}

// Hide empty state
function hideEmptyState() {
  emptyState.classList.add("hidden");
  galleryStats.classList.remove("hidden");
  filterSection.classList.remove("hidden");
  galleryGrid.classList.remove("hidden");
}

// Update stats
function updateStats() {
  completedCount.textContent = allProofs.length;
  totalPhotos.textContent = allProofs.length;
}

// Setup filter buttons
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderGallery();
    });
  });
}

// Render gallery based on filter
function renderGallery() {
  galleryGrid.innerHTML = "";
  
  let filteredProofs = allProofs;
  
  // Apply filter
  if (currentFilter !== 'all') {
    const weekNum = parseInt(currentFilter.replace('week', ''));
    const weekStart = (weekNum - 1) * 7 + 1;
    const weekEnd = weekNum * 7;
    
    filteredProofs = allProofs.filter(proof => 
      proof.day >= weekStart && proof.day <= weekEnd
    );
  }
  
  // Sort by day
  filteredProofs.sort((a, b) => a.day - b.day);
  
  // Create gallery items
  filteredProofs.forEach(proof => {
    // Use Cloudinary core library to transform image
    const item = createGalleryItem(proof);
    galleryGrid.appendChild(item);
  });
  
  // Show message if no items in filter
  if (filteredProofs.length === 0 && currentFilter !== 'all') {
    const noItemsDiv = document.createElement('div');
    noItemsDiv.className = 'no-items-message';
    noItemsDiv.innerHTML = `
      <h3>No memories in this week yet!</h3>
      <p>Keep completing your daily habits to fill this gallery.</p>
    `;
    galleryGrid.appendChild(noItemsDiv);
  }
}

// Create gallery item
function createGalleryItem(proof) {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  
  const isVideo = proof.url.includes('.mp4') || proof.url.includes('video');
  
  let mediaElement;
  if (isVideo) {
    mediaElement = document.createElement('video');
    mediaElement.src = proof.url;
    mediaElement.setAttribute('muted', '');
    mediaElement.setAttribute('playsinline', '');
    
    // Add play button overlay
    const playButton = document.createElement('div');
    playButton.className = 'play-button';
    playButton.innerHTML = '▶️';
    item.appendChild(playButton);
  } else {
    mediaElement = document.createElement('img');
    // Use Cloudinary core library to transform image
    const publicId = proof.url.split('/').pop().replace(/\.[^/.]+$/, "");
    mediaElement.src = cl.url(publicId, {
      width: 300,
      crop: 'scale',
      quality: 'auto',
      fetch_format: 'auto'
    });
  }
  
  mediaElement.alt = `Day ${proof.day} - ${habits[proof.day - 1]}`;
  mediaElement.loading = 'lazy';
  
  // Add day badge
  const dayBadge = document.createElement('div');
  dayBadge.className = 'day-badge';
  dayBadge.textContent = `Day ${proof.day}`;
  
  // Add week badge for bonus days
  if (proof.day % 7 === 0) {
    const weekBadge = document.createElement('div');
    weekBadge.className = 'week-badge';
    weekBadge.textContent = '🎁 Bonus';
    item.appendChild(weekBadge);
  }
  
  // Click handler for modal
  item.addEventListener('click', () => {
    openModal(proof, isVideo);
  });
  
  item.appendChild(mediaElement);
  item.appendChild(dayBadge);
  
  return item;
}

// Open modal
function openModal(proof, isVideo) {
  modalMedia.innerHTML = '';
  
  let mediaElement;
  if (isVideo) {
    mediaElement = document.createElement('video');
    mediaElement.src = proof.url;
    mediaElement.controls = true;
    mediaElement.autoplay = true;
  } else {
    mediaElement = document.createElement('img');
    mediaElement.src = proof.url;
  }
  
  modalMedia.appendChild(mediaElement);
  modalTitle.textContent = `Day ${proof.day}: ${habits[proof.day - 1]}`;
  
  // Format date
  const date = proof.timestamp ? 
    new Date(proof.timestamp.seconds * 1000).toLocaleDateString() : 
    'Date not available';
  modalDate.textContent = `Completed on: ${date}`;
  
  imageModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
  imageModal.classList.add('hidden');
  document.body.style.overflow = 'auto';
  
  // Stop video if playing
  const video = modalMedia.querySelector('video');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
}

// Event listeners
modalClose.addEventListener('click', closeModal);
document.querySelector('.modal-overlay').addEventListener('click', closeModal);

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !imageModal.classList.contains('hidden')) {
    closeModal();
  }
});

// Add styles for gallery items
const style = document.createElement('style');
style.textContent = `
  .gallery-item {
    position: relative;
    cursor: pointer;
    border-radius: 15px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: #f8f9fa;
  }
  
  .gallery-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }
  
  .gallery-item img,
  .gallery-item video {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .gallery-item:hover img,
  .gallery-item:hover video {
    transform: scale(1.05);
  }
  
  .day-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(255, 99, 170, 0.9);
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .week-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 193, 7, 0.9);
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.7);
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
  
  .filter-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }
  
  .filter-btn {
    padding: 8px 16px;
    border: 2px solid #ff99aa;
    background: white;
    color: #ff99aa;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }
  
  .filter-btn:hover,
  .filter-btn.active {
    background: #ff99aa;
    color: white;
  }
  
  .empty-message {
    text-align: center;
    padding: 3rem 1rem;
  }
  
  .empty-message h2 {
    color: #ff3366;
    margin-bottom: 1rem;
  }
  
  .back-btn {
    display: inline-block;
    margin-top: 1rem;
    padding: 10px 20px;
    background: linear-gradient(135deg, #ff99aa, #ff6699);
    color: white;
    text-decoration: none;
    border-radius: 25px;
    font-weight: 600;
    transition: transform 0.3s ease;
  }
  
  .back-btn:hover {
    transform: translateY(-2px);
  }
  
  .no-items-message {
    grid-column: 1 / -1;
    text-align: center;
    padding: 2rem;
    color: #666;
  }
  
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(5px);
  }
  
  .modal-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 20px;
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
    z-index: 1000;
  }
  
  .modal-close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(0,0,0,0.5);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;
  }
  
  .modal-close:hover {
    background: rgba(0,0,0,0.7);
  }
  
  #modal-media img,
  #modal-media video {
    width: 100%;
    max-width: 600px;
    height: auto;
    border-radius: 15px 15px 0 0;
  }
  
  .modal-info {
    padding: 1.5rem;
    text-align: center;
  }
  
  .modal-info h3 {
    color: #ff3366;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  
  .modal-info p {
    color: #666;
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    .filter-buttons {
      gap: 5px;
    }
    
    .filter-btn {
      padding: 6px 12px;
      font-size: 0.9rem;
    }
    
    .gallery-item img,
    .gallery-item video {
      height: 150px;
    }
    
    .modal-content {
      max-width: 95vw;
      max-height: 95vh;
    }
    
    .modal-info {
      padding: 1rem;
    }
    
    .modal-info h3 {
      font-size: 1rem;
    }
  }
`;
document.head.appendChild(style);

// ================================
// Gallery Script (Supabase Version)
// ================================

// Import Supabase client
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Supabase config
const SUPABASE_URL = "https://jvjbwpmgktkxnsdtqydc.supabase.co"; // your project URL
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2amJ3cG1na3RreHNuZHRxeWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MDQxNzMsImV4cCI6MjA3NDI4MDE3M30.kDM9B1BlogBqfKabyc9B5gi6DObcIrVBOwaTH6AX4IE";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Hardcoded user (since no login system)
const userId = "default_user";

// Gallery grid
const galleryGrid = document.getElementById("gallery-grid");

/**
 * Fetch proofs (media) from Supabase
 */
async function loadGallery() {
  try {
    // 1. Get user progressData (contains proofs list)
    const { data: userData, error } = await supabase
      .from("users")
      .select("progressData")
      .eq("id", userId)
      .single();

    if (error) throw error;
    if (!userData || !userData.progressData || !userData.progressData.proofs) {
      console.log("No proofs found.");
      galleryGrid.innerHTML = "<p>No uploads yet.</p>";
      return;
    }

    const proofs = userData.progressData.proofs;
    galleryGrid.innerHTML = "";

    // 2. For each proof, generate signed URL and display
    for (const [day, proof] of Object.entries(proofs)) {
      if (!proof || !proof.path) continue;

      // Generate a signed URL (valid for 1 hour)
      const { data: signedUrlData, error: signedUrlError } =
        await supabase.storage
          .from("proofs")
          .createSignedUrl(proof.path, 3600);

      if (signedUrlError) {
        console.error("Error generating signed URL:", signedUrlError.message);
        continue;
      }

      const mediaUrl = signedUrlData.signedUrl;

      // Create gallery card
      const card = document.createElement("div");
      card.classList.add("gallery-card");

      if (proof.type && proof.type.startsWith("video")) {
        const video = document.createElement("video");
        video.src = mediaUrl;
        video.controls = true;
        video.classList.add("gallery-media");
        card.appendChild(video);
      } else {
        const img = document.createElement("img");
        img.src = mediaUrl;
        img.alt = `Proof for Day ${day}`;
        img.classList.add("gallery-media");
        card.appendChild(img);
      }

      // Add label (Day X)
      const label = document.createElement("p");
      label.textContent = `Day ${day}`;
      card.appendChild(label);

      galleryGrid.appendChild(card);
    }
  } catch (err) {
    console.error("Error loading gallery:", err.message);
    galleryGrid.innerHTML = "<p>Error loading gallery.</p>";
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", loadGallery);

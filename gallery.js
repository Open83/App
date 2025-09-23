const galleryGrid = document.getElementById("gallery-grid");

db.collection("progress").doc("saniya").onSnapshot(doc => {
  const data = doc.data() || { proofs: [] };
  galleryGrid.innerHTML = "";

  data.proofs.forEach(proof => {
    let el;
    if (proof.url.endsWith(".mp4")) {
      el = document.createElement("video");
      el.src = proof.url;
      el.controls = true;
      el.width = 200;
    } else {
      el = document.createElement("img");
      el.src = proof.url;
      el.width = 200;
    }
    galleryGrid.appendChild(el);
  });
});

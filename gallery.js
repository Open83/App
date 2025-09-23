const galleryGrid = document.getElementById("gallery-grid");
db.collection("progress").doc("saniya").onSnapshot(doc=>{
  const data=doc.data()||{ proofs:[] };
  galleryGrid.innerHTML="";
  data.proofs.forEach(p=>{
    let el;
    if(p.url.endsWith(".mp4")){
      el=document.createElement("video");
      el.src=p.url;
      el.controls=true;
    }else{
      el=document.createElement("img");
      el.src=p.url;
    }
    galleryGrid.appendChild(el);
  });
});

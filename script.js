function analyzeFlag() {
  const input = document.getElementById("inputText").value.toLowerCase();
  const resultBox = document.getElementById("resultBox");

  if (!input.trim()) {
    alert("Please type something first!");
    return;
  }

  const reasons = [];

  /* ===== LEVEL 1 — PHYSICAL ABUSE (AUTO RED) ===== */
  const physical = ["hit","hits","slap","push","kick","choke","violent","hurts me"];
  for (let w of physical) {
    if (input.includes(w)) {
      reasons.push("Physical harm detected");
      return show("🚩 RED FLAG\nPhysical harm is never acceptable.", "border-red-600", reasons);
    }
  }

  /* ===== LEVEL 2 — SEVERE EMOTIONAL ABUSE ===== */
  const severeAbuse = ["gaslight","threaten","humiliate","verbal abuse","intimidate","abusive"];
  for (let w of severeAbuse) {
    if (input.includes(w)) {
      reasons.push("Severe emotional abuse detected");
      return show("🚩 RED FLAG\nAbusive behavior detected.", "border-red-600", reasons);
    }
  }

  let red = 0, yellow = 0, green = 0;

  /* ===== LEVEL 3 — CONTROL ===== */
  ["controls","checks my phone","demands password","orders me","tracks me"].forEach(w=>{
    if(input.includes(w)){ red+=3; reasons.push("Controlling behavior detected"); }
  });

  /* ===== LEVEL 4 — TRUST ===== */
  ["lies","cheated","hides","secretive","broke my trust","deletes messages"].forEach(w=>{
    if(input.includes(w)){ red+=3; reasons.push("Trust violation detected"); }
  });

  /* ===== LEVEL 5 — DISRESPECT ===== */
  ["shut up","be quiet","belittles","dismisses me","talks down","embarrasses me"].forEach(w=>{
    if(input.includes(w)){ red+=2; reasons.push("Disrespect detected"); }
  });

  /* ===== LEVEL 6 — EMOTIONAL NEGLECT ===== */
  ["ignores me","emotionally distant","doesn't listen","cold","avoids communication"].forEach(w=>{
    if(input.includes(w)){ yellow+=2; reasons.push("Emotional neglect detected"); }
  });

  /* ===== LEVEL 7 — INCONSISTENCY ===== */
  ["hot and cold","mixed signals","sometimes ignores","disappears","ghosts me","dry replies"].forEach(w=>{
    if(input.includes(w)){ yellow+=2; reasons.push("Inconsistent behavior detected"); }
  });

  /* ===== LEVEL 8 — STRESS ===== */
  ["busy","work stress","family issues","mental health","burnout","exam stress"].forEach(w=>{
    if(input.includes(w)){ yellow+=1; reasons.push("External stress detected"); }
  });

  /* ===== LEVEL 9 — REPAIR ===== */
  ["apologizes","takes responsibility","working on it","trying to change","owns mistake"].forEach(w=>{
    if(input.includes(w)){ green+=2; reasons.push("Repair or accountability detected"); }
  });

  /* ===== LEVEL 10 — MATURITY ===== */
  ["communicates","respects","listens","handles conflict","emotionally aware"].forEach(w=>{
    if(input.includes(w)){ green+=2; reasons.push("Emotional maturity detected"); }
  });

  /* ===== LEVEL 11 — STABILITY ===== */
  ["consistent","reliable","makes time","supports me","kind to me"].forEach(w=>{
    if(input.includes(w)){ green+=3; reasons.push("Stability detected"); }
  });

  /* ===== LEVEL 12 — TRAJECTORY ===== */
  ["getting better","improving","changing"].forEach(w=>{
    if(input.includes(w)){ green+=2; reasons.push("Positive trajectory detected"); }
  });
  ["getting worse","escalating","happening more"].forEach(w=>{
    if(input.includes(w)){ red+=2; reasons.push("Negative trajectory detected"); }
  });

  /* ===== HUMAN DOMINANCE RULE ===== */
  let text="", border="";

  if (red > 0) {
    text = "🚩 RED FLAG\nOne or more serious risk factors were detected.";
    border = "border-red-600";
  }
  else if (yellow > 0) {
    text = "⚠️ YELLOW FLAG\nWarning signs are present and should not be ignored.";
    border = "border-yellow-400";
  }
  else {
    text = "🟢 GREEN FLAG\nNo significant risk patterns were detected.";
    border = "border-green-500";
  }

  show(text, border, reasons);

  function show(mainText, borderClass, reasonsList) {
    let reasonText = "\n\nWhy this result:\n";
    reasonsList.forEach(r => {
      reasonText += "• " + r + "\n";
    });
    resultBox.className = `mt-6 p-4 border rounded text-left text-sm ${borderClass} fade-slide`;
    resultBox.innerText = mainText + reasonText;
    resultBox.classList.remove("hidden");
  }
}

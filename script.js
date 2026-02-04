function analyzeFlag() {
  const input = document.getElementById("inputText").value.toLowerCase();
  const resultBox = document.getElementById("resultBox");
  const feedbackBox = document.getElementById("feedbackBox");
  const thanksMsg = document.getElementById("thanksMsg");

  if (!input.trim()) {
    alert("Type something first");
    return;
  }

  let red = 0;
  let yellow = 0;
  let green = 0;
  let reasons = [];

  /* =======================
     LEVEL 1 — PHYSICAL ABUSE (AUTO RED)
     ======================= */
  const physical = [
    "hit","hits","slap","slaps","push","pushed","kick","choke",
    "violent","violence","hurts me","physically hurts"
  ];
  for (let w of physical) {
    if (input.includes(w)) {
      reasons.push("Physical harm detected");
      return showResult("🚩 RED FLAG\nPhysical harm is never acceptable.", "border-red-600", reasons);
    }
  }

  /* =======================
     LEVEL 2 — SEVERE EMOTIONAL ABUSE
     ======================= */
  const emotionalAbuse = [
    "gaslight","gaslighting","threaten","threatens",
    "humiliate","humiliates","verbal abuse","abusive",
    "intimidates","calls me names","destroys my confidence"
  ];
  emotionalAbuse.forEach(w=>{
    if(input.includes(w)){
      red += 4;
      reasons.push("Severe emotional abuse detected");
    }
  });

  /* =======================
     LEVEL 3 — CONTROL & POWER
     ======================= */
  const control = [
    "controls me","controls my life","controls my friends",
    "controls what i wear","checks my phone","reads my messages",
    "tracks my location","demands password","orders me"
  ];
  control.forEach(w=>{
    if(input.includes(w)){
      red += 3;
      reasons.push("Controlling behavior detected");
    }
  });

  /* =======================
     LEVEL 4 — TRUST & FIDELITY
     ======================= */
  const trust = [
    "lies","lied to me","cheated","cheats","cheating",
    "hides things","secretive","deletes messages",
    "talks to ex","flirting with others","broke my trust"
  ];
  trust.forEach(w=>{
    if(input.includes(w)){
      red += 3;
      reasons.push("Trust violation detected");
    }
  });

  /* =======================
     LEVEL 5 — CHRONIC DISRESPECT
     ======================= */
  const disrespect = [
    "shut up","be quiet","talks down","dismisses me",
    "belittles me","embarrasses me","makes fun of me",
    "invalidates me"
  ];
  disrespect.forEach(w=>{
    if(input.includes(w)){
      red += 2;
      reasons.push("Disrespect detected");
    }
  });

  /* =======================
     LEVEL 6 — EMOTIONAL NEGLECT
     ======================= */
  const neglect = [
    "ignores me","emotionally distant","emotionally unavailable",
    "never listens","doesn't listen","cold behavior",
    "avoids communication","stonewalls me","takes me for granted"
  ];
  neglect.forEach(w=>{
    if(input.includes(w)){
      yellow += 2;
      reasons.push("Emotional neglect detected");
    }
  });

  /* =======================
     LEVEL 7 — INCONSISTENCY
     ======================= */
  const inconsistency = [
    "hot and cold","mixed signals","sometimes ignores",
    "disappears","ghosts me","comes and goes",
    "dry replies","inconsistent replies"
  ];
  inconsistency.forEach(w=>{
    if(input.includes(w)){
      yellow += 2;
      reasons.push("Inconsistent behavior detected");
    }
  });

  /* =======================
     LEVEL 8 — EXTERNAL STRESS
     ======================= */
  const stress = [
    "busy","work stress","job stress","exam stress",
    "family issues","mental health","anxiety",
    "depression","burnout","overwhelmed"
  ];
  stress.forEach(w=>{
    if(input.includes(w)){
      yellow += 1;
      reasons.push("External stress detected");
    }
  });

  /* =======================
     LEVEL 9 — REPAIR & ACCOUNTABILITY
     ======================= */
  const repair = [
    "apologizes","takes responsibility","owns mistake",
    "working on it","trying to change","acknowledges"
  ];
  repair.forEach(w=>{
    if(input.includes(w)){
      green += 2;
      reasons.push("Repair behavior detected");
    }
  });

  /* =======================
     LEVEL 10 — EMOTIONAL MATURITY
     ======================= */
  const maturity = [
    "communicates clearly","communicates calmly",
    "respects boundaries","listens","emotionally aware",
    "handles conflict well","validates my feelings"
  ];
  maturity.forEach(w=>{
    if(input.includes(w)){
      green += 2;
      reasons.push("Emotional maturity detected");
    }
  });

  /* =======================
     LEVEL 11 — STABILITY & CONSISTENCY
     ======================= */
  const stability = [
    "consistent","reliable","makes time",
    "supports me","kind to me","secure partner"
  ];
  stability.forEach(w=>{
    if(input.includes(w)){
      green += 3;
      reasons.push("Long-term stability detected");
    }
  });

  /* =======================
     LEVEL 12 — TRAJECTORY
     ======================= */
  const improving = ["getting better","improving","changing","learning"];
  const worsening = ["getting worse","escalating","happening more"];

  improving.forEach(w=>{
    if(input.includes(w)){
      green += 2;
      reasons.push("Positive change trajectory");
    }
  });
  worsening.forEach(w=>{
    if(input.includes(w)){
      red += 2;
      reasons.push("Negative trajectory");
    }
  });

  /* =======================
     FINAL HUMAN DOMINANCE LOGIC
     ======================= */
  let text = "";
  let border = "";

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

  showResult(text, border, reasons);

  function showResult(mainText, borderClass, reasonsList) {
    let reasonText = "\n\nWhy this result:\n";
    if (reasonsList.length === 0) {
      reasonText += "• No concerning patterns detected\n";
    } else {
      reasonsList.forEach(r => {
        reasonText += "• " + r + "\n";
      });
    }

    resultBox.className = `mt-4 p-4 border rounded ${borderClass}`;
    resultBox.innerText = mainText + reasonText;
    resultBox.classList.remove("hidden");
    feedbackBox.classList.remove("hidden");
    thanksMsg.classList.add("hidden");
  }
}

/* =======================
   FEEDBACK SYSTEM
   ======================= */
function sendFeedback(isAgree) {
  let agree = parseInt(localStorage.getItem("agree") || "0");
  let disagree = parseInt(localStorage.getItem("disagree") || "0");

  if (isAgree) agree++;
  else disagree++;

  localStorage.setItem("agree", agree);
  localStorage.setItem("disagree", disagree);

  document.getElementById("thanksMsg").classList.remove("hidden");
}

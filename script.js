function analyzeFlag() {
  const input = document.getElementById("inputText").value.toLowerCase();
  const resultBox = document.getElementById("resultBox");

  if (!input.trim()) {
    alert("Please type something first!");
    return;
  }

  const reasons = [];

  /* LEVEL 1 — Physical abuse */
  const physicalAbuse = ["hit","slap","push","kick","choke","hurt me","violent"];
  for (let w of physicalAbuse) {
    if (input.includes(w)) {
      reasons.push("Physical harm detected");
      return show("🚩 RED FLAG\nPhysical harm is never acceptable.", "border-red-600", reasons);
    }
  }

  /* LEVEL 2 — Severe emotional abuse */
  const severeAbuse = ["gaslight","humiliate","verbal abuse","threaten","intimidate"];
  for (let w of severeAbuse) {
    if (input.includes(w)) {
      reasons.push("Severe emotional abuse detected");
      return show("🚩 RED FLAG\nAbusive behavior detected.", "border-red-600", reasons);
    }
  }

  let red = 0, yellow = 0, green = 0;

  /* LEVEL 3 — Control */
  const control = ["controls me","checks my phone","demands password","orders me"];
  control.forEach(w => {
    if (input.includes(w)) {
      red += 3;
      reasons.push("Controlling behavior detected");
    }
  });

  /* LEVEL 4 — Trust */
  const trust = ["lies","cheated","hides","secretive","broke my trust"];
  trust.forEach(w => {
    if (input.includes(w)) {
      red += 3;
      reasons.push("Trust violation detected");
    }
  });

  /* LEVEL 5 — Disrespect */
  const disrespect = ["shut up","be quiet","talks down","belittles","dismisses me"];
  disrespect.forEach(w => {
    if (input.includes(w)) {
      red += 2;
      reasons.push("Disrespectful behavior detected");
    }
  });

  /* LEVEL 6 — Emotional neglect */
  const neglect = ["ignores me","emotionally distant","doesn't listen","cold"];
  neglect.forEach(w => {
    if (input.includes(w)) {
      yellow += 2;
      reasons.push("Emotional neglect detected");
    }
  });

  /* LEVEL 7 — Inconsistency */
  const inconsistency = ["hot and cold","mixed signals","sometimes ignores","disappears"];
  inconsistency.forEach(w => {
    if (input.includes(w)) {
      yellow += 2;
      reasons.push("Inconsistent behavior detected");
    }
  });

  /* LEVEL 8 — Stress */
  const stress = ["busy","work stress","family issues","burnout","mental health"];
  stress.forEach(w => {
    if (input.includes(w)) {
      yellow += 1;
      reasons.push("External stress detected");
    }
  });

  /* LEVEL 9 — Repair */
  const repair = ["apologizes","takes responsibility","trying to change","working on it"];
  repair.forEach(w => {
    if (input.includes(w)) {
      green += 2;
      reasons.push("Repair or accountability detected");
    }
  });

  /* LEVEL 10 — Maturity */
  const maturity = ["communicates","respects","listens","handles conflict"];
  maturity.forEach(w => {
    if (input.includes(w)) {
      green += 2;
      reasons.push("Emotional maturity detected");
    }
  });

  /* LEVEL 11 — Stability */
  const stability = ["consistent","reliable","makes time","supports me"];
  stability.forEach(w => {
    if (input.includes(w)) {
      green += 3;
      reasons.push("Long-term stability detected");
    }
  });

  /* LEVEL 12 — Trajectory */
  const improving = ["getting better","improving","changing"];
  const worsening = ["getting worse","escalating"];
  improving.forEach(w => input.includes(w) && (green += 2, reasons.push("Positive change trajectory")));
  worsening.forEach(w => input.includes(w) && (red += 2, reasons.push("Negative trajectory")));

  let text = "";
  let border = "";

  if (red >= 5) {
    text = "🚩 RED FLAG\nMultiple serious risk factors were found.";
    border = "border-red-600";
  } else if (red > 0 && green > 0) {
    text = "⚠️ YELLOW FLAG\nThere are both positive and concerning signs.";
    border = "border-yellow-400";
  } else if (yellow > green) {
    text = "⚠️ YELLOW FLAG\nSeveral caution signals were found.";
    border = "border-yellow-400";
  } else {
    text = "🟢 GREEN FLAG\nMostly healthy and positive patterns detected.";
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


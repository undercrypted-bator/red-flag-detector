function analyzeFlag() {
  const input = document.getElementById("inputText").value.toLowerCase();
  const resultBox = document.getElementById("resultBox");

  if (input.trim() === "") {
    alert("Please type something first!");
    return;
  }

  // 🔴 Strong Red Flags
  const redKeywords = [
    "late",
    "ignores",
    "dry replies",
    "password",
    "hides phone",
    "lies",
    "gaslight",
    "toxic",
    "ex",
    "never calls",
    "disappears"
  ];

  // 🟡 Warning / Context Flags
  const yellowKeywords = [
    "busy",
    "work",
    "confused",
    "overthinking",
    "stress",
    "mixed signals",
    "sometimes",
    "distance"
  ];

  // 🟢 Green Flags
  const greenKeywords = [
    "food",
    "listens",
    "supports",
    "effort",
    "checks on me",
    "respects",
    "communicates",
    "understands"
  ];

  const redResponses = [
    "🚩 MAJOR RED FLAG\nConsistent unhealthy behavior detected. This usually doesn’t improve without consequences.",
    "🚩 RED FLAG\nPatterns like this often lead to emotional exhaustion.",
    "🚩 WARNING\nThis is not a misunderstanding — it’s a habit."
  ];

  const yellowResponses = [
    "⚠️ YELLOW FLAG\nMixed signals detected. Context matters here — observe actions, not words.",
    "⚠️ CAUTION\nNot toxic yet, but patterns need clarity.",
    "⚠️ MID FLAG\nCould improve with communication, or could worsen."
  ];

  const greenResponses = [
    "🟢 GREEN FLAG\nHealthy behavior detected. This shows emotional maturity.",
    "🟢 SAFE\nConsistent positive effort matters more than words.",
    "🟢 HEALTHY\nThis is how bare minimum should actually look."
  ];

  let redScore = 0;
  let yellowScore = 0;
  let greenScore = 0;

  redKeywords.forEach(word => {
    if (input.includes(word)) redScore += 3;
  });

  yellowKeywords.forEach(word => {
    if (input.includes(word)) yellowScore += 1;
  });

  greenKeywords.forEach(word => {
    if (input.includes(word)) greenScore += 2;
  });

  let finalText = "";
  let borderClass = "";

  // 🧠 Decision Logic
  if (redScore >= 4 && greenScore === 0) {
    finalText = redResponses[Math.floor(Math.random() * redResponses.length)];
    borderClass = "border-red-600";
  } 
  else if (redScore > 0 && greenScore > 0) {
    finalText = yellowResponses[Math.floor(Math.random() * yellowResponses.length)];
    borderClass = "border-yellow-400";
  }
  else if (yellowScore > redScore && yellowScore > greenScore) {
    finalText = yellowResponses[Math.floor(Math.random() * yellowResponses.length)];
    borderClass = "border-yellow-400";
  }
  else {
    finalText = greenResponses[Math.floor(Math.random() * greenResponses.length)];
    borderClass = "border-green-500";
  }

  resultBox.className = `mt-6 p-4 border rounded text-left text-sm ${borderClass} fade-slide`;
  resultBox.innerText = finalText;
  resultBox.classList.remove("hidden");
}

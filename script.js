function analyzeFlag() {
  const input = document.getElementById("inputText").value.toLowerCase();
  const resultBox = document.getElementById("resultBox");

  if (input.trim() === "") {
    alert("Please type something first!");
    return;
  }

  const redKeywords = ["late", "online", "ignores", "jealous", "password", "ex"];
  const yellowKeywords = ["busy", "work", "confused"];
  const greenKeywords = ["food", "listens", "supports", "cares"];

  const redResponses = [
    "🚩 MAJOR RED FLAG\nThey have time, just not for you.",
    "🚩 RED FLAG\nEmotionally unavailable but digitally active.",
    "🚩 WARNING\nThis ends in character development."
  ];

  const yellowResponses = [
    "⚠️ YELLOW FLAG\nCould be stress or excuses.",
    "⚠️ CAUTION\nObserve patterns before trusting fully."
  ];

  const greenResponses = [
    "🟢 GREEN FLAG\nThis person was raised right.",
    "🟢 SAFE\nProtect this one at all costs."
  ];

  let score = 0;

  redKeywords.forEach(word => {
    if (input.includes(word)) score += 2;
  });

  yellowKeywords.forEach(word => {
    if (input.includes(word)) score += 1;
  });

  greenKeywords.forEach(word => {
    if (input.includes(word)) score -= 1;
  });

  let finalText = "";
  let borderClass = "";

  if (score >= 2) {
    finalText = redResponses[Math.floor(Math.random() * redResponses.length)];
    borderClass = "border-red-600";
  } else if (score === 1) {
    finalText = yellowResponses[Math.floor(Math.random() * yellowResponses.length)];
    borderClass = "border-yellow-400";
  } else {
    finalText = greenResponses[Math.floor(Math.random() * greenResponses.length)];
    borderClass = "border-green-500";
  }

  // Reset + animate
  resultBox.className = `mt-6 p-4 border rounded text-left text-sm ${borderClass} fade-slide`;
  resultBox.innerText = finalText;
  resultBox.classList.remove("hidden");
}

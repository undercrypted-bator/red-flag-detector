function analyzeFlag() {
  const input = document.getElementById("inputText").value.toLowerCase();
  const resultBox = document.getElementById("resultBox");
  const feedbackBox = document.getElementById("feedbackBox");
  const thanksMsg = document.getElementById("thanksMsg");

  if (!input.trim()) {
    alert("Type something first");
    return;
  }

  thanksMsg.classList.add("hidden");

  let red = 0, yellow = 0, green = 0;
  let reasons = [];

  const physical = ["hit","slap","push","hurt","violent"];
  for (let w of physical) {
    if (input.includes(w)) {
      reasons.push("Physical harm detected");
      return show("🚩 RED FLAG\nPhysical harm is never acceptable.", "border-red-600");
    }
  }

  ["lies","cheated","secret","hides"].forEach(w=>{
    if(input.includes(w)){ red+=3; reasons.push("Trust violation"); }
  });

  ["shut up","be quiet","controls","checks my phone"].forEach(w=>{
    if(input.includes(w)){ red+=2; reasons.push("Disrespect or control"); }
  });

  ["ignores","emotionally distant","cold"].forEach(w=>{
    if(input.includes(w)){ yellow+=2; reasons.push("Emotional neglect"); }
  });

  ["mixed signals","sometimes","hot and cold"].forEach(w=>{
    if(input.includes(w)){ yellow+=1; reasons.push("Inconsistency"); }
  });

  ["busy","stress","work"].forEach(w=>{
    if(input.includes(w)){ yellow+=1; reasons.push("External stress"); }
  });

  ["listens","apologizes","respects","supports","communicates"].forEach(w=>{
    if(input.includes(w)){ green+=2; reasons.push("Healthy behavior"); }
  });

  let result = "", border = "";

  if (red > 0) {
    result = "🚩 RED FLAG\nSerious risk detected.";
    border = "border-red-600";
  } else if (yellow > 0) {
    result = "⚠️ YELLOW FLAG\nSome warning signs present.";
    border = "border-yellow-400";
  } else {
    result = "🟢 GREEN FLAG\nNo major risk detected.";
    border = "border-green-500";
  }

  resultBox.className = `mt-4 p-4 border rounded ${border}`;
  resultBox.innerText = result + "\n\nWhy:\n• " + reasons.join("\n• ");
  resultBox.classList.remove("hidden");
  feedbackBox.classList.remove("hidden");
}

function sendFeedback(isAgree) {
  let agree = parseInt(localStorage.getItem("agree") || "0");
  let disagree = parseInt(localStorage.getItem("disagree") || "0");

  if (isAgree) agree++;
  else disagree++;

  localStorage.setItem("agree", agree);
  localStorage.setItem("disagree", disagree);

  document.getElementById("thanksMsg").classList.remove("hidden");
}

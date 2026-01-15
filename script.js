function analyzeFlag() {
  const input = document.getElementById("inputText").value.toLowerCase();
  const resultBox = document.getElementById("resultBox");

  if (!input.trim()) {
    alert("Please type something first!");
    return;
  }

  /* ================================
     🚨 ABSOLUTE RED FLAGS (AUTO 🚩)
     Any one of these = RED, no debate
     ================================ */
  const absoluteRed = [
    // Physical harm
    "hit", "hits", "hitting", "slap", "slaps", "slapped",
    "push", "pushes", "pushed", "kick", "kicks",
    "choke", "chokes", "hurt me", "hurts me",
    "violent", "violence",

    // Threats & fear
    "threaten", "threatens", "threatened",
    "scares me", "intimidates me",

    // Severe emotional abuse
    "abusive", "abuse", "gaslight", "gaslights",
    "humiliates me", "publicly humiliates",
    "calls me names", "verbal abuse"
  ];

  /* ================================
     🔴 DISRESPECT & CONTROL (STRONG 🚩)
     ================================ */
  const disrespectControl = [
    "tells me to shut up",
    "tells me to be quiet",
    "talks down to me",
    "orders me around",
    "controls me",
    "controls who i talk to",
    "controls what i wear",
    "checks my phone",
    "reads my messages",
    "invades my privacy",
    "embarrasses me",
    "insults me",
    "disrespects me",
    "yells at me",
    "shouts at me",
    "dismisses my feelings",
    "makes fun of me",
    "belittles me"
  ];

  /* ================================
     🔴 TRUST VIOLATIONS (RED 🚩)
     ================================ */
  const trustIssues = [
    "lies to me",
    "lied to me",
    "hides things",
    "hides phone",
    "secretive",
    "cheated",
    "cheats",
    "cheating",
    "talks to ex secretly",
    "flirting with others",
    "breaks promises",
    "broke my trust"
  ];

  /* ================================
     🟡 EMOTIONAL NEGLECT (YELLOW ⚠️)
     ================================ */
  const emotionalNeglect = [
    "ignores me",
    "emotionally unavailable",
    "never listens",
    "doesn't listen",
    "does not listen",
    "avoids conversations",
    "avoids communication",
    "doesn't care",
    "does not care",
    "cold behavior",
    "emotionally distant"
  ];

  /* ================================
     🟡 INCONSISTENCY & CONFUSION
     ================================ */
  const inconsistency = [
    "hot and cold",
    "mixed signals",
    "sometimes ignores",
    "disappears",
    "ghosts me",
    "inconsistent replies",
    "dry replies",
    "active but not replying",
    "says busy but online",
    "comes and goes"
  ];

  /* ================================
     🟡 CONTEXTUAL STRESS (EXPLAINS, NOT EXCUSES)
     ================================ */
  const contextStress = [
    "busy",
    "work pressure",
    "job stress",
    "exam stress",
    "family problems",
    "family issues",
    "mental health",
    "burnout",
    "overwhelmed",
    "anxious",
    "depressed"
  ];

  /* ================================
     🟢 CARE, RESPECT & REPAIR
     ================================ */
  const careRepair = [
    "listens",
    "listens calmly",
    "respects me",
    "respects my boundaries",
    "communicates clearly",
    "communicates openly",
    "apologizes",
    "takes responsibility",
    "makes time",
    "checks on me",
    "supports me",
    "supports my goals",
    "brings me food",
    "shows effort",
    "consistent",
    "kind to me"
  ];

  /* ================================
     🔑 INTENSITY MODIFIERS
     ================================ */
  const intensityStrong = [
    "always", "never", "constantly", "every time", "all the time"
  ];
  const intensityMild = [
    "sometimes", "once", "rarely", "occasionally", "lately"
  ];

  /* ================================
     RESPONSES
     ================================ */
  const responses = {
    red: [
      "🚩 RED FLAG\nThis behavior crosses important boundaries and is not healthy.",
      "🚩 MAJOR RED FLAG\nThis is a serious concern. Respect and safety are non-negotiable.",
      "🚩 WARNING\nThis pattern can cause long-term harm. Take it seriously."
    ],
    yellow: [
      "⚠️ YELLOW FLAG\nThere are concerning signs, but context and patterns matter.",
      "⚠️ CAUTION\nThis needs clear communication and observation over time.",
      "⚠️ MIXED SIGNALS\nNot all bad, not all good. Pay attention to consistency."
    ],
    green: [
      "🟢 GREEN FLAG\nThis reflects care, respect, and emotional maturity.",
      "🟢 HEALTHY\nConsistent positive behavior is a strong sign.",
      "🟢 SAFE\nThis shows effort and respect for boundaries."
    ]
  };

  /* ================================
     🚨 RULE 1: ABSOLUTE RED
     ================================ */
  for (let w of absoluteRed) {
    if (input.includes(w)) {
      return show(responses.red, "border-red-600");
    }
  }

  /* ================================
     SCORING
     ================================ */
  let redScore = 0;
  let yellowScore = 0;
  let greenScore = 0;

  disrespectControl.forEach(w => input.includes(w) && (redScore += 3));
  trustIssues.forEach(w => input.includes(w) && (redScore += 3));

  emotionalNeglect.forEach(w => input.includes(w) && (yellowScore += 2));
  inconsistency.forEach(w => input.includes(w) && (yellowScore += 2));
  contextStress.forEach(w => input.includes(w) && (yellowScore += 1));

  careRepair.forEach(w => input.includes(w) && (greenScore += 2));

  intensityStrong.forEach(w => {
    if (input.includes(w)) {
      redScore += 1;
      yellowScore += 1;
    }
  });

  intensityMild.forEach(w => {
    if (input.includes(w)) {
      redScore -= 1;
      yellowScore -= 1;
    }
  });

  /* ================================
     FINAL COUNSELLOR DECISION
     ================================ */
  if (redScore >= 3) {
    show(responses.red, "border-red-600");
  } else if (redScore > 0 && greenScore > 0) {
    show(responses.yellow, "border-yellow-400");
  } else if (yellowScore > greenScore) {
    show(responses.yellow, "border-yellow-400");
  } else {
    show(responses.green, "border-green-500");
  }

  function show(list, border) {
    const text = list[Math.floor(Math.random() * list.length)];
    resultBox.className = `mt-6 p-4 border rounded text-left text-sm ${border} fade-slide`;
    resultBox.innerText = text;
    resultBox.classList.remove("hidden");
  }
}

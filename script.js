function analyzeFlag() {
  const input = document.getElementById("inputText").value.toLowerCase();
  const resultBox = document.getElementById("resultBox");

  if (!input.trim()) {
    alert("Please type something first!");
    return;
  }

  /* =====================================================
     🚨 LEVEL 1: PHYSICAL SAFETY (AUTO RED)
     ===================================================== */
  const physicalAbuse = [
    "hit","hits","hitting","slap","slaps","slapped",
    "push","pushes","pushed","kick","kicks","choke","chokes",
    "violent","violence","hurts me","physically hurts"
  ];

  /* =====================================================
     🚨 LEVEL 2: SEVERE EMOTIONAL ABUSE (AUTO RED)
     ===================================================== */
  const severeEmotionalAbuse = [
    "threatens me","threatened me","intimidates me",
    "gaslight","gaslighting",
    "humiliates me","public humiliation",
    "verbal abuse","abusive language",
    "calls me names","destroys my confidence"
  ];

  /* =====================================================
     🔴 LEVEL 3: CONTROL & POWER
     ===================================================== */
  const control = [
    "controls me","controls my life","controls my friends",
    "controls my clothes","controls where i go",
    "checks my phone","reads my messages",
    "demands passwords","tracks my location",
    "orders me around","makes decisions for me"
  ];

  /* =====================================================
     🔴 LEVEL 4: TRUST & FIDELITY
     ===================================================== */
  const trust = [
    "lies to me","lied to me","hides things",
    "hides phone","deletes messages","secretive",
    "cheated","cheats","cheating",
    "emotionally cheating","flirting with others",
    "broke my trust","breaks promises"
  ];

  /* =====================================================
     🟠 LEVEL 5: CHRONIC DISRESPECT
     ===================================================== */
  const disrespect = [
    "tells me to shut up","tells me to be quiet",
    "talks down to me","dismisses my feelings",
    "embarrasses me","belittles me",
    "makes fun of me","invalidates me"
  ];

  /* =====================================================
     🟡 LEVEL 6: EMOTIONAL NEGLECT
     ===================================================== */
  const neglect = [
    "ignores me","emotionally unavailable",
    "emotionally distant","cold behavior",
    "never listens","doesn't listen",
    "avoids conversations","avoids communication",
    "stonewalls me","takes me for granted"
  ];

  /* =====================================================
     🟡 LEVEL 7: INCONSISTENCY / PUSH–PULL
     ===================================================== */
  const inconsistency = [
    "hot and cold","mixed signals","sometimes ignores",
    "disappears","ghosts me","comes and goes",
    "dry replies","inconsistent replies",
    "active but not replying","affection changes suddenly"
  ];

  /* =====================================================
     🟡 LEVEL 8: EXTERNAL STRESSORS
     ===================================================== */
  const stress = [
    "busy","work pressure","job stress",
    "exam stress","career stress",
    "family issues","family problems",
    "mental health","anxiety","depression",
    "burnout","overwhelmed","financial stress"
  ];

  /* =====================================================
     🟢 LEVEL 9: REPAIR & ACCOUNTABILITY
     ===================================================== */
  const repair = [
    "apologizes","takes responsibility",
    "acknowledges mistake","owns up",
    "tries to improve","working on it",
    "makes amends","open to feedback"
  ];

  /* =====================================================
     🟢 LEVEL 10: EMOTIONAL MATURITY
     ===================================================== */
  const maturity = [
    "communicates clearly","communicates calmly",
    "respects boundaries","emotionally aware",
    "handles conflict well","listens calmly",
    "validates my feelings"
  ];

  /* =====================================================
     🟢 LEVEL 11: LONG-TERM STABILITY
     ===================================================== */
  const stability = [
    "consistent","reliable","supports my goals",
    "makes time","checks on me",
    "kind to me","supportive partner",
    "long term effort","secure attachment"
  ];

  /* =====================================================
     🔵 LEVEL 12: TRAJECTORY (DIRECTION OF CHANGE)
     ===================================================== */
  const improving = [
    "getting better","improving",
    "learning","changing",
    "relationship improving","making progress"
  ];

  const worsening = [
    "getting worse","escalating",
    "more frequent","happening more",
    "worsening behavior","out of control"
  ];

  /* =====================================================
     🔑 INTENSITY MODIFIERS
     ===================================================== */
  const strong = ["always","never","constantly","every time","all the time"];
  const mild = ["sometimes","once","rarely","occasionally","lately"];

  /* =====================================================
     RESPONSES
     ===================================================== */
  const responses = {
    red: [
      "🚩 RED FLAG\nThis behavior crosses serious boundaries and is unhealthy.",
      "🚩 MAJOR RED FLAG\nThis pattern indicates risk and should not be ignored.",
      "🚩 DANGEROUS PATTERN\nRespect, trust, or safety is being compromised."
    ],
    yellow: [
      "⚠️ YELLOW FLAG\nThere are concerning signs, but context and patterns matter.",
      "⚠️ CAUTION\nThis needs communication and careful observation.",
      "⚠️ MIXED SIGNALS\nNot all negative, but not stable yet."
    ],
    green: [
      "🟢 GREEN FLAG\nThis reflects care, respect, and emotional maturity.",
      "🟢 HEALTHY\nConsistent positive behavior and accountability are present.",
      "🟢 STABLE\nThis shows long-term emotional safety."
    ]
  };

  /* =====================================================
     🚨 IMMEDIATE RED CHECK
     ===================================================== */
  for (let w of physicalAbuse.concat(severeEmotionalAbuse)) {
    if (input.includes(w)) {
      return show(responses.red, "border-red-600");
    }
  }

  /* =====================================================
     SCORING ACROSS 12 LEVELS
     ===================================================== */
  let red = 0, yellow = 0, green = 0;

  control.forEach(w => input.includes(w) && (red += 4));
  trust.forEach(w => input.includes(w) && (red += 4));
  disrespect.forEach(w => input.includes(w) && (red += 3));

  neglect.forEach(w => input.includes(w) && (yellow += 3));
  inconsistency.forEach(w => input.includes(w) && (yellow += 3));
  stress.forEach(w => input.includes(w) && (yellow += 1));

  repair.forEach(w => input.includes(w) && (green += 3));
  maturity.forEach(w => input.includes(w) && (green += 3));
  stability.forEach(w => input.includes(w) && (green += 4));

  improving.forEach(w => input.includes(w) && (green += 2));
  worsening.forEach(w => input.includes(w) && (red += 2));

  strong.forEach(w => input.includes(w) && (red += 1));
  mild.forEach(w => input.includes(w) && (yellow -= 1));

  /* =====================================================
     FINAL DECISION LOGIC
     ===================================================== */
  if (red >= 6) {
    show(responses.red, "border-red-600");
  } else if (red > 0 && green > 0) {
    show(responses.yellow, "border-yellow-400");
  } else if (yellow > green) {
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


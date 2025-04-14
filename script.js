const questions = [
  { text: "Do you refer to yourself as 'based'?", values: [5, 4, 2, 1] },
  { text: "Do you spend over 4 hours a day on Twitter?", values: [5, 4, 2, 1] },
  { text: "Do you say 'sigma' unironically?", values: [5, 4, 2, 1] },
  { text: "Do you engage in meme wars?", values: [5, 4, 2, 1] },
  {
    text: "Do you use reaction gifs in serious arguments?",
    values: [5, 4, 2, 1],
  },
  { text: "Do you watch TikToks at 2x speed?", values: [5, 4, 2, 1] },
  { text: "Have you read fanfiction today?", values: [5, 4, 2, 1] },
  { text: "Do you quote anime characters IRL?", values: [5, 4, 2, 1] },
  { text: "Is your humor mostly irony or absurdism?", values: [5, 4, 2, 1] },
  { text: "Do you say 'rizz' or 'mid' daily?", values: [5, 4, 2, 1] },
  { text: "Do you own a discord kitten?", values: [5, 4, 2, 1] },
  { text: "Have you touched grass this week?", values: [1, 2, 4, 5] },
  { text: "Do you browse Reddit every day?", values: [5, 4, 2, 1] },
  { text: "Have you memed during a serious event?", values: [5, 4, 2, 1] },
  { text: "Do you call things 'cringe' out loud?", values: [5, 4, 2, 1] },
  { text: "Do you use the term 'NPC' seriously?", values: [5, 4, 2, 1] },
  { text: "Do you post screenshots of arguments?", values: [5, 4, 2, 1] },
  { text: "Do you get your news from memes?", values: [5, 4, 2, 1] },
  { text: "Do you know the entire Bee Movie script?", values: [5, 4, 2, 1] },
  { text: "Do you identify with a wojak?", values: [5, 4, 2, 1] },
];

const quizDiv = document.getElementById("quiz");

questions.forEach((q, index) => {
  const div = document.createElement("div");
  div.classList.add("question");
  div.innerHTML = `
    <p>${index + 1}. ${q.text}</p>
    <label><input type="radio" name="q${index}" value="5"> I am addicted</label>
    <label><input type="radio" name="q${index}" value="4"> Yes</label>
    <label><input type="radio" name="q${index}" value="2"> No</label>
    <label><input type="radio" name="q${index}" value="1"> Some times</label>
  `;
  quizDiv.appendChild(div);
});

document.getElementById("submitBtn").addEventListener("click", () => {
  // Check if all questions are answered
  let allAnswered = true;
  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (!selected) {
      allAnswered = false;
    }
  });

  // Show warning if not all questions are answered
  const warningMessage = document.getElementById("warningMessage");
  if (!allAnswered) {
    warningMessage.style.visibility = "visible";
    return;
  }

  // Hide warning and calculate score
  warningMessage.style.visibility = "hidden";
  let score = 0;

  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected) {
      score += parseInt(selected.value);
    }
  });

  const maxScore = questions.reduce((sum, q) => sum + Math.max(...q.values), 0);
  let percentage = Math.round((score / maxScore) * 100);
  percentage = Math.min(100, Math.max(0, percentage));

  let message = "";

  if (percentage <= 10) {
    message = "🧠✨ Pure of thought. You are blissfully offline.";
  } else if (percentage <= 30) {
    message = "🟢 Mostly sane. Some memes leak in, but you're grounded.";
  } else if (percentage <= 50) {
    message = "🟡 Slightly fried. You quote memes but still touch grass.";
  } else if (percentage <= 70) {
    message = "🟠 Cooked. Irony-poisoned and Reddit-pilled.";
  } else if (percentage <= 85) {
    message = "🔴 Lost. You speak only in memes and Wojak emotions.";
  } else if (percentage <= 95) {
    message = "🔥 Terminally online. Twitter is your second brain.";
  } else {
    message = "💀 You are the internet. Brainrot has consumed you entirely.";
  }

  // Show result in modal
  const resultText = document.getElementById("resultText");
  const modal = document.getElementById("resultModal");
  resultText.innerHTML = `<strong>Brainrot Level:</strong> ${percentage}%<br>${message}`;
  modal.classList.remove("hidden");
});

// Close modal
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("resultModal").classList.add("hidden");
});

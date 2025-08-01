document.getElementById("askBtn").addEventListener("click", async () => {
  const question = document.getElementById("question").value;
  const responseArea = document.getElementById("response");

  if (!question.trim()) {
    responseArea.textContent = "Please enter a question.";
    return;
  }

  responseArea.textContent = "Thinking...";

  try {
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCT_BxdWPsyQiRoBmBuIb56AReb5tsXiuE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: question
              }
            ]
          }
        ]
      })
    });

    const data = await res.json();

    if (data.candidates && data.candidates.length > 0) {
      const answer = data.candidates[0].content.parts[0].text;
      responseArea.textContent = answer;
    } else {
      responseArea.textContent = "No response received. Try a different question.";
    }
  } catch (err) {
    responseArea.textContent = "Error: " + err.message;
  }
});



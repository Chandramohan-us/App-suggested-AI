// app.js — frontend logic
const askBtn = document.getElementById('askBtn');
const resultsEl = document.getElementById('results');
const examplesBtn = document.getElementById('examplesBtn');
const queryEl = document.getElementById('query');
const modeEl = document.getElementById('mode');
const loadingT = document.getElementById('loadingT');

examplesBtn?.addEventListener('click', () => {
  queryEl.value = "Design a 5-step plan to complete a college project on a 'Book Tracker' web app. Include tech stack and short code sample (HTML+JS).";
});

askBtn?.addEventListener('click', async () => {
  const q = queryEl.value.trim();
  const mode = modeEl.value;
  if (!q) {
    alert('Write a clear question to ask StudyBuddy.');
    return;
  }
  // Show loading
  resultsEl.innerHTML = '';
  resultsEl.appendChild(loadingT.content.cloneNode(true));

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({prompt: q, mode})
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Server error');
    }
    // expecting JSON with {answer: "..."} or streaming text
    const data = await res.json();
    resultsEl.innerHTML = sanitizeAndFormat(data.answer || 'No answer.');
  } catch (err) {
    resultsEl.innerHTML = `<div style="color:#ffb4b4">Error: ${escapeHtml(err.message)}</div>`;
  }
});

function sanitizeAndFormat(text){
  // Simple sanitize: escape HTML and convert newlines to <br>
  return escapeHtml(text).replace(/\n/g, '<br>');
}
function escapeHtml(unsafe){
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

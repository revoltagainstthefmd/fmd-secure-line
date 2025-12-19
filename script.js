snap.forEach(d => {
  const m = d.data();

  const msg = document.createElement("div");
  msg.className = `message ${m.user === currentUser ? "me" : "them"}`;

  const user = document.createElement("div");
  user.className = "user";
  user.textContent = m.user;

  const text = document.createElement("div");
  text.textContent = m.text;

  const time = document.createElement("div");
  time.style.fontSize = "0.75em";
  time.textContent = `GMT ${new Date(m.time).toUTCString()}`;

  msg.appendChild(user);
  msg.appendChild(text);
  msg.appendChild(time);

  logDiv.appendChild(msg);
});
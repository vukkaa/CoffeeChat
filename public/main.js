let username = "Random User";
let lastUsername;
let isThisFirstMessage = true

const socket = io();

function announceNameChange(oldName, newName) {
  const changeMessage = `${oldName} changed their name to ${newName}`;
  socket.emit('chat message', changeMessage);
}

document.getElementById('chatForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  lastUsername = username;  // Save last username for announcement
  
  username = document.getElementById('usernameInput').value || "Random User"; //update username

  // Name change message & only if it's not first message
  if (lastUsername !== username && isThisFirstMessage == false) {
    announceNameChange(lastUsername, username);
  }
  
  isThisFirstMessage = false //every message after the username change will get announced

  const message = username + ': ' + document.getElementById('message').value;
  socket.emit('chat message', message);
  document.getElementById('message').value = '';
});

socket.on('chat message', function(msg) {
  const ul = document.getElementById('messages');
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(msg));
  ul.appendChild(li);

  ul.scrollTop = ul.scrollHeight;
});
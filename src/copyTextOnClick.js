// Add hidden input tag for copy-paste functionality (otherwise asking for browser clipboard permission is required)
const copyInput = document.createElement('input'); copyInput.id = 'copy-text'; copyInput.style.visibility = 'hidden'; copyInput.style.position = 'fixed';
document.body.appendChild(copyInput);

// Add notice that bookmarklet is enabled
const copyOverlay = document.createElement('div');
copyOverlay.innerText = 'Quick Copy Enabled';
copyOverlay.style.cssText = 'position:fixed;left:0;top:0;width:100vw;height:100vh;z-index:99999;padding:5vw;background:rgba(0,255,0,0.05);font-size:5em;color:rgba(255,255,255,0.05);font-family:"Arial";text-align:center;pointer-events:none;';
document.body.appendChild(copyOverlay);

// Highlight text
function highlight(evt) {
  let elem = evt.target;
  // Inline CSS
  elem.style.color = 'white';
  elem.style['text-shadow'] = '0 0 .3em black, 0 0 .3em black, 0 0 .3em black, 0 0 .3em black, 0 0 .3em black';
  elem.style.cursor='pointer';
  // On click copy text under mouse to clipboard
  elem.addEventListener('click', copyText);
}

// Copy text
function copyText(evt) {
  evt.preventDefault();
  copyInput.value = evt.target.textContent.trim();
  copyInput.style.visibility = 'visible';
  copyInput.focus();
  copyInput.select();
  document.execCommand('copy');
  copyInput.style.visibility = 'hidden';
}

// Reset text highlighting
function reset(evt) {
  evt.target.style = '';
  // Remove listener
  document.removeEventListener('click', copyText);
}

// Add mouse enter/leave listeners to all top-level elements
for (let elem of document.querySelectorAll('*')) {
	if (elem.children.length === 0) {
		elem.addEventListener('mouseenter', highlight);
		elem.addEventListener('mouseleave', reset);
  }
}

// On right-click remove event listeners to return click behavior back to normal
document.body.addEventListener('contextmenu', evt => {
  // Remove any highlighting + listeners on current elem
  reset(evt);
  // Remove listeners
  for (let elem of document.querySelectorAll('*')) {
    if (elem.children.length === 0) {
      elem.removeEventListener('mouseenter', highlight);
      elem.removeEventListener('mouseleave', reset);
    }
  }
});

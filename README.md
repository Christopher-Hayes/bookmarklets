# Bookmarklets
All my bookmarklets, generally workflow time-savers and debugging utilities.

🔖 [Learn how to start using bookmarklets now.](https://mreidsma.github.io/bookmarklets/installing.html)

## Quickly Copy Text with Left Click

Copy (almost) any text on a page by left clicking on it. Stays enabled until a right click is made.

```
javascript:const copyInput=document.createElement("input");copyInput.id="copy-text",copyInput.style.visibility="hidden",copyInput.style.position="fixed",document.body.appendChild(copyInput);const copyOverlay=document.createElement("div");function highlight(e){let t=e.target;t.style.color="white",t.style["text-shadow"]="0 0 .3em black, 0 0 .3em black, 0 0 .3em black, 0 0 .3em black, 0 0 .3em black",t.style.cursor="pointer",t.addEventListener("click",copyText)}function copyText(e){e.preventDefault(),copyInput.value=e.target.textContent.trim(),copyInput.style.visibility="visible",copyInput.focus(),copyInput.select(),document.execCommand("copy"),copyInput.style.visibility="hidden"}function reset(e){e.target.style="",document.removeEventListener("click",copyText)}copyOverlay.innerText="Quick Copy Enabled",copyOverlay.style.cssText='position:fixed;left:0;top:0;width:100vw;height:100vh;z-index:99999;padding:5vw;background:rgba(0,255,0,0.05);font-size:5em;color:rgba(255,255,255,0.05);font-family:"Arial";text-align:center;pointer-events:none;',document.body.appendChild(copyOverlay);for(let e of document.querySelectorAll("*"))0===e.children.length&&(e.addEventListener("mouseenter",highlight),e.addEventListener("mouseleave",reset));document.body.addEventListener("contextmenu",e=>{reset(e);for(let e of document.querySelectorAll("*"))0===e.children.length&&(e.removeEventListener("mouseenter",highlight),e.removeEventListener("mouseleave",reset))});`
```

💻 [Human-readable source code](https://github.com/Christopher-Hayes/bookmarklets/blob/main/src/copyTextOnClick.js)

## WebGL FPS

Shows FPS inside any WebGL canvas. Full credit to MrDoob of THREE.JS, source code at https://mrdoob.github.io/stats.js

```
javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
```

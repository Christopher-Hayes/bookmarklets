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

## PlayCanvas Loaded Assets + VRAM breakdown

Pretty prints in console what PlayCanvas assets are loaded and what assets are contributing to VRAM.

**Functions**

`loadedAssets([ filter() ])` Show all assets currently loaded. Filter is optional.

`loadedAssetsOnlyVRAM([ minSize ])` Show only assets with VRAM (no materials, shaders, etc). `minSize` is for minimum VRAM bytes and is optional.

```
javascript:function formatBytes(a,b=2){if(0===a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d];}var asset={};var cs = { stat: 'background:#555;color:white;padding:.2em;border-radius:3px;',%20stat2:%20'background:#333;color:white;padding:.2em;border-radius:3px;',%20stat3:%20'background:#888;color:#222;padding:.2em;border-radius:3px;',%20};function%20loadedAssets(e){asset={};for(let%20[k,s]%20of%20Object.entries(pc.Application.getApplication().assets.filter(function(s){return%20s.loaded&&(!e||e(s));}))){console.log("%c"+k+'\t'+s.name+"%20%c"+s.type+"%c%20%c"+(s.file&&s.file.size?formatBytes(s.file.size):"")+"%c%20%c"+(s.resource&&s.resource._gpuSize?formatBytes(s.resource._gpuSize):""),"",cs.stat2,"",cs.stat,"",cs.stat3);asset[k]=asset[s.name]=s;}}function%20loadedAssetsOnlyVRAM(e){loadedAssets(function(s){return%20s.resource&&s.resource._gpuSize&&s.resource._gpuSize>=(e||0);});}function%20loadedAssetsOnlyBigVRAM(){loadedAssetsOnlyVRAM(3e6);};loadedAssetsOnlyVRAM();%20%20About%20%20Dev%20Console%20script%20I%20use%20to%20debug%20asset%20loading%20+%20VRAM%20breakdown%20in%20PlayCanvas%20Topics%20Resources%20Readme%20License%20GPL-3.0%20License%20Releases%20No%20releases%20published%20Create%20a%20new%20release%20Packages%20No%20packages%20published%20Publish%20your%20first%20package
```
💻 Source code and more information at: https://github.com/Christopher-Hayes/PlayCanvas-Dev-Console

## PlayCanvas Scene Editor - Download multiple selected assets

As of Dec 2020, the PlayCanvas scene editor doesn't allow you to download more than one file at a time without exporting. This script simply loops the right-click -> Download, over all file assets that are selected. Note that it only works on assets visible to DOM and may break on GLB assets that are missing the Download from the right click menu.

```
javascript:function downloadSelectedAssets(){const e=document.querySelectorAll(".pcui-table-row-selected");for(let t=0;t<e.length;t++)setTimeout(downloadAsset,500*t,e[t])}function downloadAsset(e){click(e,!0),setTimeout(pressDownload,300)}function click(e,t){if(window.CustomEvent)e.dispatchEvent(new CustomEvent(t?"contextmenu":"click"));else if(document.createEvent){var n=document.createEvent("HTMLEvents");n.initEvent(t?"contextmenu":"click",!0,!1),e.dispatchEvent(n)}}function pressDownload(){var e=document.querySelector(".ui-menu.open"),t=Array.from(e.querySelectorAll(".ui-menu-item")).find(e=>"Download"===e.querySelector(".text").innerText).querySelector(".title");click(t,!1)}downloadSelectedAssets();
```

import{a as g,S as P,i as u}from"./assets/vendor-b0d10f48.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();g.defaults.baseURL="https://pixabay.com";async function y(o,t,s,a){return(await g.get("/api/",{params:{key:"44769616-4ffe0cee5617f53d3e1075857",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:s,page:a}})).data}const h="/goit-js-hw-12/assets/error-117dce18.svg";function w(o){return o.map(({webformatURL:t,largeImageURL:s,tags:a,likes:e,views:i,comments:n,downloads:q})=>`<li class="list-item">
  <a class="list-item-link" href="${s}">
    <img
      class="list-item-image"
      src="${t}"
      alt="${a}"
    />
  </a>
  <ul class="wrap-in-list-item">
            <li item-in-wrap>
              <h3 class="item-in-wrap-title">Likes</h3>
              <p class="item-in-wrap-text">${e}</p>
            </li>
            <li item-in-wrap>
              <h3 class="item-in-wrap-title">Views</h3>
              <p class="item-in-wrap-text">${i}</p>
            </li>
            <li item-in-wrap>
              <h3 class="item-in-wrap-title">Comments</h3>
              <p class="item-in-wrap-text">${n}</p>
            </li>
            <li item-in-wrap>
              <h3 class="item-in-wrap-title">Downloads</h3>
              <p class="item-in-wrap-text">${q}</p>
            </li>
          </ul>
  
</li>`).join("")}const L="44769616-4ffe0cee5617f53d3e1075857";let m=15,l=1,b,c="";const d="visually-hidden";let v=new P(".list a",{captions:!0,captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250});const r={form:document.querySelector(".search-form"),list:document.querySelector(".list"),input:document.querySelector(".search-input"),loaderBtn:document.querySelector(".loader-btn"),loader:document.querySelector(".loader")};r.form.addEventListener("submit",k);async function k(o){if(o.preventDefault(),r.list.innerHTML="",l=1,c=o.target.elements.input.value.trim(),c===""){u.show({backgroundColor:"#ef4040",close:!1,closeOnClick:!0,progressBarColor:"white",title:"Error",titleColor:"white",iconUrl:h,position:"topRight",icon:"icon-error.svg",messageColor:"white",messageSize:"16px",message:"Form field must be filled in"}),r.form.reset(),p();return}O(),C(),x();try{const t=await y(L,c,m,l);b=Math.ceil(t.totalHits/m);const s=t.hits;r.list.insertAdjacentHTML("beforeend",w(s)),v.refresh(),s.length!==t.totalHits&&s.length>0?(S(),f(),r.loaderBtn.addEventListener("click",B)):(u.show({backgroundColor:"#ef4040",close:!1,closeOnClick:!0,progressBarColor:"white",title:"Error",titleColor:"white",iconUrl:h,position:"topRight",icon:"icon-error.svg",messageColor:"white",messageSize:"16px",message:'"Sorry, there are no images matching your search query. Please try again!"'}),f(),p())}catch(t){console.log(t)}finally{r.form.reset()}}async function B(){l+=1,C(),x();try{const t=(await y(L,c,m,l)).hits;r.list.insertAdjacentHTML("beforeend",w(t)),v.refresh(),M()}catch(o){console.log(o)}finally{S(),f(),l===b&&(p(),r.loaderBtn.removeEventListener("click",B),u.show({class:"toast",position:"topRight",messageColor:"black",message:"We're sorry, but you've reached the end of search results."}))}}function p(){r.loaderBtn.classList.add(d)}function O(){r.loaderBtn.classList.remove(d)}function C(){r.loaderBtn.disabled=!0}function x(){r.loader.classList.remove(d)}function S(){r.loaderBtn.disabled=!1}function f(){r.loader.classList.add(d)}function M(){const o=r.list.lastChild.getBoundingClientRect();scrollBy({top:o.top+o.height*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map

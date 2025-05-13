import{a as v,S as w,i as n}from"./assets/vendor-CrlV4O_2.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const L="50197209-2a2796b344803c480c3c957e7",S="https://pixabay.com/api/",P=15;let l=1,p="";function q(e){p=e,l=1}async function E(e){return p=e,l=1,await y()}async function R(){return l+=1,await y()}async function y(){const e={key:L,q:p,image_type:"photo",orientation:"horizontal",safesearch:!0,page:l,per_page:P};try{return(await v.get(S,{params:e})).data}catch(s){throw console.error("Помилка при запиті до Pixabay:",s),s}}const m=document.querySelector(".gallery"),$=new w(".gallery a");function h(e){const s=e.map(r=>`
    <li class="gallery-item">
      <a href="${r.largeImageURL}" title="${r.tags}">
        <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <p><b>Likes</b></p>
          <p class="value">${r.likes}</p>
        </div>
        <div class="info-item">
          <p><b>Views</b></p>
          <p class="value">${r.views}</p>
        </div>
        <div class="info-item">
          <p><b>Comments</b></p>
          <p class="value">${r.comments}</p>
        </div>
        <div class="info-item">
          <p><b>Downloads</b></p>
          <p class="value">${r.downloads}</p>
        </div>
      </div>
    </li>
  `).join("");m.insertAdjacentHTML("beforeend",s),$.refresh()}function x(){m.innerHTML=""}function g(){const e=document.querySelector(".loader-wrapper");e&&(e.style.display="flex")}function b(){const e=document.querySelector(".loader-wrapper");e&&(e.style.display="none")}const f=document.querySelector(".form"),a=document.querySelector("#load-more-btn");let d=0,c=0;f.addEventListener("submit",async e=>{e.preventDefault();const r=f.elements["search-text"].value.trim();if(!r){n.warning({title:"Hello!",message:"The search field cannot be empty",position:"topRight"});return}x(),g(),a.hidden=!0,q(r);try{const i=await E(r);if(d=i.totalHits,c=i.hits.length,!i.hits.length){n.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}h(i.hits),c<d&&(a.hidden=!1)}catch{n.error({title:"Error",message:"Something went wrong, please try again.",position:"topRight"})}finally{b()}});a.addEventListener("click",async()=>{g();try{const e=await R();h(e.hits),c+=e.hits.length,c>=d&&(a.hidden=!0,n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{n.error({title:"Error",message:"Failed to load more images.",position:"topRight"})}finally{b()}});
//# sourceMappingURL=index.js.map

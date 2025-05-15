import{a as w,S as v,i}from"./assets/vendor-CrlV4O_2.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))u(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const L="50197209-2a2796b344803c480c3c957e7",S="https://pixabay.com/api/",q=15;let l=1,p="";function R(e){p=e,l=1}async function E(e){return p=e,l=1,await h()}async function P(){return l+=1,await h()}async function h(){const e={key:L,q:p,image_type:"photo",orientation:"horizontal",safesearch:!0,page:l,per_page:q};try{return(await w.get(S,{params:e})).data}catch(o){throw console.error("Помилка при запиті до Pixabay:",o),o}}const m=document.querySelector(".gallery"),x=new v(".gallery a");function g(e){const o=e.map(t=>`
    <li class="gallery-item">
      <a href="${t.largeImageURL}" title="${t.tags}">
        <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <p><b>Likes</b></p>
          <p class="value">${t.likes}</p>
        </div>
        <div class="info-item">
          <p><b>Views</b></p>
          <p class="value">${t.views}</p>
        </div>
        <div class="info-item">
          <p><b>Comments</b></p>
          <p class="value">${t.comments}</p>
        </div>
        <div class="info-item">
          <p><b>Downloads</b></p>
          <p class="value">${t.downloads}</p>
        </div>
      </div>
    </li>
  `).join("");m.insertAdjacentHTML("beforeend",o),x.refresh()}function I(){m.innerHTML=""}function $(){const e=document.querySelector(".loader-wrapper");e&&(e.style.display="flex")}function H(){const e=document.querySelector(".loader-wrapper");e&&(e.style.display="none")}const b=document.querySelector(".form"),f=b.elements["search-text"],n=document.querySelector("#load-more-btn"),y=document.querySelector(".load-more-loader");let d=0,a=0;b.addEventListener("submit",async e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"});const o=f.value.trim();if(!o){i.warning({title:"Hello!",message:"The search field cannot be empty",position:"topRight"});return}I(),$(),n.style.display="none",R(o);try{const t=await E(o);if(d=t.totalHits,a=t.hits.length,!t.hits.length){i.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}g(t.hits),f.value="",a<d?n.style.display="block":i.info({message:"You have reached the end of the gallery.",position:"topRight"})}catch{i.error({title:"Error",message:"Something went wrong, please try again.",position:"topRight"})}finally{H()}});n.addEventListener("click",async()=>{n.disabled=!0,y.style.display="inline-block";try{const e=await P();e.hits&&e.hits.length&&(g(e.hits),a+=e.hits.length),a>=d&&(n.style.display="none",i.info({title:"End of Gallery",message:"You have reached the end of the gallery.",position:"topRight"})),M()}catch{i.error({title:"Error",message:"Something went wrong, please try again.",position:"topRight"})}finally{y.style.display="none",n.disabled=!1}});function M(){const e=document.querySelector(".gallery-item");if(e){const o=e.getBoundingClientRect().height;window.scrollBy({top:2*o,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map

import{a as v,S as w,i as n}from"./assets/vendor-CrlV4O_2.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))p(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&p(c)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function p(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const L="50197209-2a2796b344803c480c3c957e7",S="https://pixabay.com/api/",q=15;let l=1,u="";function R(e){u=e,l=1}async function E(e){return u=e,l=1,await h()}async function P(){return l+=1,await h()}async function h(){const e={key:L,q:u,image_type:"photo",orientation:"horizontal",safesearch:!0,page:l,per_page:q};try{return(await v.get(S,{params:e})).data}catch(o){throw console.error("Помилка при запиті до Pixabay:",o),o}}const g=document.querySelector(".gallery"),x=new w(".gallery a");function m(e){const o=e.map(t=>`
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
  `).join("");g.insertAdjacentHTML("beforeend",o),x.refresh()}function I(){g.innerHTML=""}function $(){const e=document.querySelector(".loader-wrapper");e&&(e.style.display="flex")}function H(){const e=document.querySelector(".loader-wrapper");e&&(e.style.display="none")}const b=document.querySelector(".form"),f=b.elements["search-text"],s=document.querySelector("#load-more-btn"),y=document.querySelector(".load-more-loader");let d=0,a=0;b.addEventListener("submit",async e=>{e.preventDefault();const o=f.value.trim();if(!o){n.warning({title:"Hello!",message:"The search field cannot be empty",position:"topRight"});return}I(),$(),s.hidden=!0,R(o);try{const t=await E(o);if(d=t.totalHits,a=t.hits.length,!t.hits.length){n.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}m(t.hits),f.value="",a<d?s.hidden=!1:n.info({message:"You have reached the end of the gallery.",position:"topRight"})}catch{n.error({title:"Error",message:"Something went wrong, please try again.",position:"topRight"})}finally{H()}});s.addEventListener("click",async()=>{s.disabled=!0,y.style.display="inline-block";try{const e=await P();e.hits&&e.hits.length&&(m(e.hits),a+=e.hits.length),a>=d&&(s.style.display="none",n.info({title:"End of Gallery",message:"You have reached the end of the gallery.",position:"topRight"})),M()}catch{n.error({title:"Error",message:"Something went wrong, please try again.",position:"topRight"})}finally{y.style.display="none",s.disabled=!1}});function M(){const e=document.querySelector(".gallery-item");if(e){const o=e.getBoundingClientRect().height;window.scrollBy({top:2*o,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map

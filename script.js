
// script.js - client-side rendering, search, filter, pagination, SEO-friendly dynamic updates
let articles = [];
const perPage = 9;
let currentPage = 1;
let filtered = [];

async function fetchArticles(){
  const res = await fetch('/articles.json');
  articles = await res.json();
  filtered = articles.slice();
  renderLead();
  renderTrending();
  renderPage(1);
}

function renderLead(){
  const lead = articles[0];
  if(!lead) return;
  const leadEl = document.getElementById('lead-article');
  leadEl.innerHTML = `<h2>${lead.title}</h2><div class="meta">${lead.category} — ${lead.date}</div><p>${lead.summary}</p><p><a href="/article.html?slug=${lead.slug}">ادامه مطلب</a></p>`;
  const listEl = document.getElementById('lead-list');
  const next = articles.slice(1,5);
  listEl.innerHTML = next.map(a=>`<div class="card"><h4><a href="/article.html?slug=${a.slug}">${a.title}</a></h4><div class="meta">${a.category} — ${a.date}</div></div>`).join('');
}

function renderTrending(){
  const top = articles.slice(0,6);
  const out = top.map(a=>`<li><a href="/article.html?slug=${a.slug}">${a.title}</a></li>`).join('');
  document.getElementById('trending-list').innerHTML = out;
}

function renderPage(page){
  currentPage = page;
  const start = (page-1)*perPage;
  const pageItems = filtered.slice(start, start+perPage);
  const grid = document.getElementById('news-grid');
  grid.innerHTML = pageItems.map(a=>`
    <article class="article-card">
      <h3><a href="/article.html?slug=${a.slug}">${a.title}</a></h3>
      <div class="meta">${a.category} — ${a.date}</div>
      <p>${a.summary}</p>
      <p><a href="/article.html?slug=${a.slug}">ادامه مطلب</a></p>
    </article>
  `).join('');
  renderPagination();
  // Update canonical / title for SEO-ish when paginating (client-side)
  try{
    document.title = 'خبرزات — صفحه ' + page;
  }catch(e){}
}

function renderPagination(){
  const pages = Math.ceil(filtered.length / perPage);
  const pag = document.getElementById('pagination');
  let html = '';
  for(let i=1;i<=pages;i++){
    html += `<button ${i===currentPage? 'disabled':''} onclick="renderPage(${i})">${i}</button>`;
  }
  pag.innerHTML = html;
}

function doSearch(){
  const q = (document.getElementById('q').value||'').trim();
  if(!q){ filtered = articles.slice(); renderPage(1); return; }
  const re = new RegExp(q,'i');
  filtered = articles.filter(a=> re.test(a.title + ' ' + a.summary + ' ' + a.category));
  renderPage(1);
}

// Simple filter by category
function filterBy(cat){
  if(!cat || cat==='همه'){ filtered = articles.slice(); renderPage(1); return; }
  filtered = articles.filter(a=> a.category === cat);
  renderPage(1);
}

// Initialize
fetchArticles();

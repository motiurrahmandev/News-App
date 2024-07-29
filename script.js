const navLink = document.querySelector('#nav-links')
const navToggle = document.querySelector(".nav-toggle")

navToggle.addEventListener("click",()=>{
navLink.classList.toggle('active')
})


const API_KEY = "71ff92414fdc413a947711036acc5cfb";
const baseUrl = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
  const res = await fetch(`${baseUrl}${query}&apikey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}

function reload (){
  window.location.reload();
}


function bindData(articles) {
  const cardContainer = document.querySelector(".cards-container");
  cardContainer.innerHTML = "";
  articles.forEach((article) => {
    if (article.urlToImage !== null) {
      const date = new Date(article.publishedAt).toLocaleTimeString()
      cardContainer.innerHTML += ` <div class="card">
        <div class="card-header">
          <img src="${article.urlToImage}" alt="">
        </div>
        <div class="card-content">
          <h3 id="news-title">${article.title}</h3>
          <h6 id="news">${article.source.name} : ${date}</h6>
          <p id="news-des">${article.description}</p>
        </div>
         <a href="${article.url}" class="explor">Explor More</a>
      </div>`
    }
  
  });
}


let curSelectedNav = null;

function onNavClick(id){
fetchNews(id);
const navItem = document.getElementById(id);
curSelectedNav?.classList.remove('active');
curSelectedNav=navItem;
curSelectedNav.classList.add('active')
}


const searchText = document.querySelector(".news-input");
const searchBtn = document.querySelector(".search-button");

searchBtn.addEventListener("click",()=>{
  let query = searchText.value;
  fetchNews(query);
  curSelectedNav?.classList.remove('active');
})

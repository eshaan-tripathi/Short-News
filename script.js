const apiKey = "7a92e37b7066459681449064da0be739";
const country = "";  
const baseUrl = `https://newsapi.org/v2/top-headlines?country=`;
const cross = document.querySelector('.cross-menu'); 
const sidebar = document.querySelector('.sidebar');
window.addEventListener('load', () => fetchIndiaNews());

// Update fetchNews function to show/hide loader
async function fetchNews(url) {
  const loaderContainer = document.querySelector('.loader-container');
  loaderContainer.classList.add('active'); // Show loader

  try {
      const response = await fetch(url);

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.articles || [];
  } catch (error) {
      console.error('Error fetching news:', error);
      return [];
  } finally {
      loaderContainer.classList.remove('active'); // Hide loader
  }
}


function bindData(articlesToShow) {
    const cardContainer = document.querySelector('.card-container');
    const template = document.querySelector('.template-card-container');

    // Clear previous content
    cardContainer.innerHTML = '';

    if (articlesToShow.length === 0) {
        // If no articles found, display a message with a link to go back to home
        const noResultsMessage = document.createElement('div');
        noResultsMessage.classList.add('no-results-message');
        noResultsMessage.innerText = 'No results found';
        
        // Create a link to go back to home page
        const homeLink = document.createElement('a');
        homeLink.setAttribute('class','home-msg');
        homeLink.setAttribute('href', 'index.html'); // Set your home page URL here
        homeLink.innerText = 'Go back to home';
        homeLink.style.marginTop = '20px'; // Adjust margin as needed
        
        // Append the link to the message
        noResultsMessage.appendChild(document.createElement('br')); // Line break
        noResultsMessage.appendChild(homeLink);
        
        // Append the message to the card container
        cardContainer.appendChild(noResultsMessage);
    } else {
        // Display the articles
        articlesToShow.forEach(article => {
            if (!article.urlToImage) return;
            const cardClone = template.content.cloneNode(true);
            cardClone.querySelector('img').src = article.urlToImage;
            cardClone.querySelector('h3').innerText = article.title;
            cardClone.querySelector('h6').innerText = article.publishedAt;
            cardClone.querySelector('.news-description').innerText = article.description;
            cardClone.querySelector('.news-link').href = article.url;
            cardClone.querySelector('.read-more').href = article.url;
            cardContainer.appendChild(cardClone);
        });
    }
}


async function fetchIndiaNews() {
    const indiaUrl = `${baseUrl}in&apiKey=${apiKey}&category=general`;
    const data = await fetchNews(indiaUrl);
    console.log(data);
    bindData(data);
}

async function fetchInternationalNews() {
    const internationalUrl = `${baseUrl}us&apiKey=${apiKey}&category=general`;
    const data = await fetchNews(internationalUrl);
    console.log(data);
    bindData(data);
}

async function fetchBusinessNews() {
    const politicsUrl = `${baseUrl}in&apiKey=${apiKey}&category=business`;
    const data = await fetchNews(politicsUrl);
    console.log(data);
    bindData(data);
}

async function fetchEntertainmentNews() {
    const entertainmentUrl = `${baseUrl}in&apiKey=${apiKey}&category=entertainment`;
    const data = await fetchNews(entertainmentUrl);
    console.log(data);
    bindData(data);
}

async function fetchSportsNews() {
    const sportsUrl = `${baseUrl}in&apiKey=${apiKey}&category=sports`;
    const data = await fetchNews(sportsUrl);
    console.log(data);
    bindData(data);
}

document.querySelector('.sidebar-toggle').addEventListener('click', () => {
    toggleSidebar();
});

function toggleSidebar() {
    sidebar.classList.toggle('active');
}
document.addEventListener('DOMContentLoaded', () => {
    const navSearch = document.getElementById('searchNav');
    const sidebarSearch = document.getElementById('searchSidebar');

    navSearch.addEventListener('keypress', (e) => {if(e.key==="Enter"){searchNews(navSearch.value.trim().toLowerCase())}});
    sidebarSearch.addEventListener('keypress', (e) => {if(e.key==="Enter"){searchNews(sidebarSearch.value.trim().toLowerCase())}});

    const readMoreLinks = document.querySelectorAll('.read-more');

    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default action of the link
            const newsContent = this.previousElementSibling; // Get the news content
            newsContent.classList.toggle('expanded'); // Toggle the 'expanded' class to show/hide content
        });
    });
});
async function searchNews(query) {
    
    const searchUrl = `${baseUrl}in&apiKey=${apiKey}&q=${query}`;
    const data = await fetchNews(searchUrl);
    bindData(data);
}
cross.addEventListener('click' , toggleSidebar);
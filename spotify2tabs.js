// This logic HAS to be in a function, addon simply doesnt work if its not.
// something stupid to do with firefox extensions.

function script() {
    const songPlaying = document.querySelector('[data-testid=context-item-link]').textContent;
    const artist = document.querySelector('[data-testid=context-item-info-artist]').textContent;
    let searchQuery = artist.concat('%20', songPlaying).replace(/ /g, "%20");

    if (searchQuery.includes('(')) {
        searchQuery = searchQuery.slice(0, searchQuery.indexOf('(')); 
    }
    if (searchQuery.includes('-')) {
        searchQuery = searchQuery.slice(0, searchQuery.indexOf('-')); 
    }
    if (searchQuery.includes('&')) {
        searchQuery = searchQuery.replace(/&/g, "and");
    }

    const url = `https://www.ultimate-guitar.com/search.php?search_type=title&value=${searchQuery}`;

    window.open(url);    
}

script();
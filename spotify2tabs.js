async function openGuitarTab() {
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

    const sortByPromise = await browser.storage.local.get({sortBy:''});
    let sortBy = sortByPromise.sortBy;

    if (sortBy.length == 0) {sortBy = "all";}

    let sortCode;

    switch (sortBy) {
      case "all":
        sortCode = 0
        break;
      case "chords":
        sortCode = 300
        break;
      case "tabs":
          sortCode = 200
          break;
      case "bass":
        sortCode = 400
        break;
      case "ukulele":
          sortCode = 800
          break;
    
      default:
        break;
    }

    let url = `https://www.ultimate-guitar.com/search.php?search_type=title&value=${searchQuery}&type=${sortCode}`;

    window.open(url);    
}

function highlight() {
    const buttonImg = document.querySelector("#buttonGuitarTab").firstChild;
    buttonImg.src = "https://i.imgur.com/6vhOSSi.png";
    buttonImg.style.transform = "scale(1.1)";
}


function noHighlight() {
    const buttonImg = document.querySelector("#buttonGuitarTab").firstChild;
    buttonImg.src = "https://i.imgur.com/brH5g2e.png";
    buttonImg.style.transform = "scale(1)";
}

function addButton() {
    if (!document.querySelector("#buttonGuitarTab")) {
        const button = document.createElement("button");
        const icon = document.createElement("img");

        icon.src = "https://i.imgur.com/brH5g2e.png";
        icon.width = "16";

        button.appendChild(icon);
        button.style.backgroundColor = "transparent";
        button.style.border = "none";
        button.style.marginRight = "7px";
        button.style.transform = "translateY(2px)";
        button.id = "buttonGuitarTab";

        button.addEventListener("click", openGuitarTab, false);
        button.addEventListener("mouseover", highlight, false);
        button.addEventListener("mouseout", noHighlight, false);

        const toolbar = document.querySelector(".mwpJrmCgLlVkJVtWjlI1");
        toolbar.insertBefore(button, toolbar.firstChild);
    }
}
addButton();
async function insertValues() {
  const sortByPromise = await chrome.storage.local.get({sortBy:''});
  let sortBy = sortByPromise.sortBy;

  if (sortBy.length == 0) {sortBy = "all";}
  document.querySelector("#sort-by").value = sortBy;
}

document.querySelector('#sort-by').addEventListener('change', function() {
  const sortBy = document.querySelector("#sort-by").value;
  chrome.storage.local.set({sortBy});
});

window.onload = insertValues;
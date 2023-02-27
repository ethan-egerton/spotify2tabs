async function insertValues() {
  const isCheckedPromise = await browser.storage.local.get({isChecked:''});
  const isChecked = isCheckedPromise.isChecked;

  const sortByPromise = await browser.storage.local.get({sortBy:''});
  let sortBy = sortByPromise.sortBy;

  if (sortBy.length == 0) {sortBy = "all";}

  document.querySelector("#open-best-sheet").checked = isChecked;
  document.querySelector("#sort-by").value = sortBy;
}

document.querySelector('#open-best-sheet').addEventListener('change', function() {
  const isChecked = document.querySelector("#open-best-sheet").checked;
  browser.storage.local.set({isChecked});
});

document.querySelector('#sort-by').addEventListener('change', function() {
  const sortBy = document.querySelector("#sort-by").value;
  browser.storage.local.set({sortBy});
});

window.onload = insertValues;
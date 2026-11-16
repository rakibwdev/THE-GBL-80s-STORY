const search = document.querySelector('#search');
const cards = [...document.querySelectorAll('[data-search]')];
const empty = document.querySelector('#empty');
function filterArchive() {
  const terms = search.value.toLowerCase().trim().split(/\s+/);
  for (const card of cards) {
    card.hidden = !terms.every(term => card.dataset.search.includes(term));
  }
  empty.hidden = cards.some(card => !card.hidden);
}
search.addEventListener('input', filterArchive);
for (const club of document.querySelectorAll('.divisions li')) {
  const link = document.createElement('a');
  link.href = '#archive';
  link.textContent = club.textContent;
  link.addEventListener('click', () => {
    search.value = link.textContent;
    filterArchive();
  });
  club.replaceChildren(link);
}
const viewer = document.querySelector('#viewer');
const fullImage = viewer.querySelector('img');
for (const button of document.querySelectorAll('[data-image]')) {
  button.setAttribute('aria-label', button.textContent.trim() + ' — ' + button.closest('article').querySelector('h3').textContent);
  button.addEventListener('click', () => {
    fullImage.src = button.dataset.image;
    fullImage.alt = button.querySelector('img').alt;
    viewer.showModal();
  });
}

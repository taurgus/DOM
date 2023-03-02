//Haetaan tiedot localStoragesta
const list = document.querySelector('#list');
const items = JSON.parse(localStorage.getItem('items')) || [];

//Luodaan poistonappula ja funktio siihen
function displayItems() {
  list.innerHTML = items.map((item, index) => `
    <li>
      ${item}
      <button class="delete" data-index="${index}">X</button> 
    </li>
  `).join('');
}

displayItems();

const form = document.querySelector('form');
const input = document.querySelector('#item');

// Luodaan submit nappula, joka tarkistaa, että tehtävä on vähintään 2 merkkiä pitkä ja onko tehtävä jo ennalta listalla
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const item = input.value.trim();
  if (item.length < 2) return;
	if(items.includes(item)) {
		alert('On jo!')
		return;
	}

  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
  input.value = '';
  displayItems();
});
//
list.addEventListener('click', (event) => {
	if (!event.target.matches('.delete')) return;
	const index = event.target.dataset.index;
	items.splice(index, 1);
	localStorage.setItem('items', JSON.stringify(items));
	displayItems();
  });

  
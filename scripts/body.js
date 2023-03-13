
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

// Luodaan submit nappula, joka if elsellä tarkistaa, että tehtävä on vähintään 2 merkkiä pitkä ja onko tehtävä jo ennalta listalla
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const item = input.value.trim();
  if (item.length <= 2) {
  alert("Liian lyhyt!")
  input.style = "background: red"; // Muuttaa inputin tyylin punaiseksi
  return ;
  } else {
    input.style = "background: #2195f37"; //Jos täyttää speksit niin muuttuu takaisin normaaliksi
  }
	if(items.includes(item)) {
		alert('On jo!')
    input.style = "background: red";
		return;
	}

//Tallennetaan tieto local storageen
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
  input.value = '';
  displayItems();
});
//Poistetaan tieto local storagesta
list.addEventListener('click', (event) => {
	if (!event.target.matches('.delete')) return;
	const index = event.target.dataset.index;
	items.splice(index, 1);
	localStorage.setItem('items', JSON.stringify(items));
	displayItems();
  });

 //Jos tehtävä halutaan merkitä suoritetuksi clickaamalla
var check = document.querySelector('li');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);
  
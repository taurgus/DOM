const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const todos = JSON.parse(localStorage.getItem('todos')) || [];

// Tehdään uusi taski ja lisätään se listalle
function createTodoItem(todo) {
  const li = document.createElement('li');
  const text = document.createTextNode(todo.text);
  li.appendChild(text);
  

  // Luodaan poisto ja suoritettu nappulat
  const completedButton = document.createElement('button');
  completedButton.innerHTML = 'Completed';
  completedButton.addEventListener('click', () => {
    li.classList.toggle('completed');
    todo.completed = !todo.completed;
    updateLocalStorage();
  });
  li.appendChild(completedButton);

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Delete';
  deleteButton.classList.add('delete-button'); //Luodaan poistonappulan luokka, jotta sitä voi muokata CSS:ssä
  deleteButton.addEventListener('click', () => {
    li.remove();
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    updateLocalStorage();
  });
  li.appendChild(deleteButton);

  // Luodaan completed luokka, jos task on suoritettu
  if (todo.completed) {
    li.classList.add('completed');
  }

  todoList.appendChild(li);
}

// Lisätään uusi taski
function addTodoItem(event) {
  event.preventDefault(); //Estetään tyhjä syöttö

  const text = input.value.trim();
//Jos tekstiä ei löydy, teksti muuttuu punaiseksi
  if (!text) {
    alert("Lisää jotain!")
    input.style = "color: red";
    return;

  }

  if(text.length < 3) { //Jos syöte on alle 3 merkkiä
    alert("Liian lyhyt!")
    input.style = "color: red"; // Muuttaa inputin tyylin punaiseksi mikäli ei vastaa minimivaatimuksia
    return ;
    } else {
      input.style = "color: #2195f37";
  }

  // Tarkistetaan löytyykö taski jo listalta ja jos löytyy niin ilmoitus ja värin vaihto
  if (todos.some(todo => todo.text === text)) {
    alert('On jo!');
    input.style = "color: red";
    return;
  }

  const todo = {
    text,
    completed: false,
  };
  todos.push(todo);
  createTodoItem(todo);
  updateLocalStorage();

  input.value = '';
}

// Päivitetään localstorage tilanteen tasalle
function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Ladataan tiedot localstoragesta sivua avattaessa
function loadTodoList() {
  todos.forEach(todo => {
    createTodoItem(todo);
  });
}

form.addEventListener('submit', addTodoItem);
loadTodoList();

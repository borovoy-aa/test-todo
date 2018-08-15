const addInput = document.getElementById('addTodo');
const addButton = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todos');
const mainSelect = document.getElementById("mainSelect");
const inputDate = document.getElementById('date');

const getListItems = () => document.querySelectorAll('#todos > li')

const todoTitle = text => {
  const title = document.createElement('span')
  title.innerText = text
  
  return title
}

const todoInput = () => {
	const editInput = document.createElement('input')
	editInput.classList.add('editInput')

	return editInput
}

const dateP = date => {
	const dateP = document.createElement('p');
	dateP.classList.add('date-p');
	dateP.innerText = date.value;

	return dateP;
}

const setColor = (color, el) => {
	el.style.boxShadow = "inset 10px 0px 0px 0px " + color;
}

const todoWrapper = () => {
	const wrapper = document.createElement('li');
	wrapper.classList.add('list')

  return wrapper
}

const todoCheckbox = checked => {
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = checked
  
  checkbox.addEventListener('click', () => {
    saveData()
  })
  
  return checkbox
}

const todoItem = ({ text, checked, color, date }) => {
  const wrapper = todoWrapper();
  const checkbox = todoCheckbox(checked);
	const title = todoTitle(text);
	const edInput = todoInput();
	const btnDiv = buttonsDiv();
	const setDate = dateP(date);

	const remBtn = rBtn();
	const edBtn = eBtn();
	const okBtn = oBtn();

  wrapper.appendChild(checkbox)
	wrapper.appendChild(title)
	wrapper.appendChild(setDate)
	wrapper.appendChild(btnDiv)

	btnDiv.appendChild(remBtn);
	btnDiv.appendChild(edBtn);
	
	remBtn.addEventListener('click', () => {
		localStorage.removeItem("todo")
		todoList.removeChild(wrapper);
		saveData()
	});

	edBtn.addEventListener('click', () => {
		edInput.value = title.innerHTML
		wrapper.removeChild(title);
		wrapper.insertBefore(edInput, wrapper.children[1]);
		edInput.focus();
		btnDiv.removeChild(edBtn);
		btnDiv.appendChild(okBtn);
	});

	okBtn.addEventListener('click', () => {
		title.innerHTML = edInput.value
		wrapper.removeChild(edInput);
		wrapper.insertBefore(title, wrapper.children[1]);
		btnDiv.removeChild(okBtn);
		btnDiv.appendChild(edBtn);
	})

	const valueColor = {
		no:() => {
			return wrapper;
		},
		low:() => {
			setColor('green', wrapper);
		},
		middle:() => {
			setColor('orange', wrapper);
		},
		high:() => {
			setColor('red', wrapper);
		}
	}
	
	valueColor[color]();

	wrapper.dataset.priority = color

  return wrapper
}

const addTodo = data => {
  const todo = todoItem(data)
  todoList.appendChild(todo)
}

const buttonsDiv = () => {
	const btnsDiv = document.createElement('div');
	btnsDiv.classList.add('btnsDiv');
	
	return btnsDiv;
}

const rBtn = () => {
	const removeBtn = document.createElement('button');
	removeBtn.classList.add('removeBtn');
	removeBtn.classList.add('circleBtn');
	removeBtn.id = 'removeBtn'

	const removeIcon = document.createElement('i');
	removeIcon.classList.add( "circle-icon", "far", "fa-trash-alt" );
	removeBtn.appendChild(removeIcon);

	return removeBtn
}

const eBtn = () => {
	const editBtn = document.createElement('button');
	editBtn.classList.add('editBtn');
	editBtn.classList.add('circleBtn');
	editBtn.id = 'editBtn';

	const editIcon = document.createElement('i');
	editIcon.classList.add( "circle-icon", "fas", "fa-pen" );
	editBtn.appendChild(editIcon);

	return editBtn;
}

const oBtn = () => {
	const okBtn = document.createElement('button');
	okBtn.classList.add('okBtn');
	okBtn.classList.add('circleBtn');
	okBtn.id = 'okBtn';

	const okIcon = document.createElement('i');
	okIcon.classList.add( "circle-icon", "far", "fa-check-square" );
	okBtn.appendChild(okIcon);

	return okBtn;
}

const clear = anyInput => {
	anyInput.value = "";
}

const parseListItem = item => {
  const text = item.querySelector('span')
	const checkbox = item.querySelector('input[type="checkbox"]')
	const dateInput = item.querySelector('input[type="date"]')

  return {
    text: text.innerText,
		checked: checkbox.checked,
		color: item.dataset.priority,
		date: dateInput.value
	}
}

const parseList = list => {
  return list.map(parseListItem)
}

const saveData = () => {
  const data = parseList([ ...getListItems() ])
  localStorage.setItem('todos', JSON.stringify(data))
}

const loadData = () => {
  const data = localStorage.todos
  
  if (data) {
    const parsedData = JSON.parse(data)
    parsedData.forEach(addTodo)
  }
}

addButton.addEventListener('click', () => {

  const data = {
    text: addInput.value,
		checked: false,
		color: mainSelect.options[mainSelect.selectedIndex].value,
		date: inputDate.value
  }

  addTodo(data)
	saveData()
	clear(addInput)
})

loadData()
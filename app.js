const btnTask = document.getElementById('add-task');
const newTask = document.getElementById('new-task');
const mainWrap = document.getElementById('main');
const listItem = document.getElementsByClassName('list');
const inputDate = document.getElementById('date');

const clear = () => {
	newTask.value = "";
}

const nTask = (e) => {
	const taskValue = newTask.value;
	
	const li = document.createElement('li');
	li.classList.add('list')
	
	const removeBtn = document.createElement('button');
	removeBtn.classList.add('removeBtn');
	removeBtn.innerText = 'Remove Task';

	const editBtn = document.createElement('button');
	editBtn.classList.add('editBtn');
	editBtn.innerText = 'Edit Task';

	const okBtn = document.createElement('button');
	okBtn.classList.add('okBtn');
	okBtn.innerText = 'Okay';

	const checkBtn = document.createElement('input')
	checkBtn.type = "checkbox";
	checkBtn.classList.add('checkBtn');

	var p = document.createElement('p');
	p.classList.add('list-p');
	li.appendChild(p);

	if (inputDate.value !== '') {
		var dateP = document.createElement('p');
		dateP.classList.add('date-p');
		dateP.innerText = inputDate.value
		li.insertBefore(dateP, li.children[0]);
	}
	
	p.innerHTML = taskValue;
	li.appendChild(removeBtn);
	li.appendChild(editBtn);
	li.insertBefore(checkBtn, li.children[0]);

	checkBtn.addEventListener( 'change', function() {
    if(this.checked) {
			p.style.textDecoration = "line-through";
			p.style.color = "green"
    } else {
			p.style.textDecoration = "none";
			p.style.color = "black"
    }
	});
	
	if (taskValue.trim()) {
		mainWrap.appendChild(li);
	}
	
	clear();
	
	removeBtn.addEventListener('click', function(e) {
		mainWrap.removeChild(li);
	});

	const editP = function (e) {
		console.log(this)
		p.innerText = editInput.value;
		li.insertBefore(p, removeBtn);
		editInput.parentNode.removeChild(editInput);
		this.parentNode.removeChild(this);
		li.appendChild(editBtn);
	}
	
	const editInput = document.createElement('input');
	editInput.classList.add('editInput');

	editBtn.addEventListener('click', function() {
		li.removeChild(p);
		li.insertBefore(editInput, removeBtn);
		editInput.value = p.textContent;
		editInput.focus();
		li.removeChild(editBtn);
		li.appendChild(okBtn);
		okBtn.addEventListener('click', editP, false);
	}, false)

	okBtn.removeEventListener('click', editP, false);
	e.preventDefault();
}

btnTask.addEventListener('click', nTask, false);


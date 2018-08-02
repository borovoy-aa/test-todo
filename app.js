const btnTask = document.getElementById('add-task');
const newTask = document.getElementById('new-task');
const mainWrap = document.getElementById('main');
const listItem = document.getElementsByClassName('list');

const clear = () => {
	newTask.value = "";
}

const nTask = () => {
	const taskValue = newTask.value;
	
	const li = document.createElement('li');
	li.classList.add('list')
	

	const removeBtn = document.createElement('button');
	removeBtn.classList.add('removeBtn');
	removeBtn.innerText = 'Remove Task';

	var p = document.createElement('p');
	p.classList.add('list-p');
	li.appendChild(p);

	p.innerHTML = taskValue;
	li.appendChild(removeBtn);

	if (taskValue.trim()) {
		mainWrap.appendChild(li);
	}

	clear();

	removeBtn.addEventListener('click', function(e) {
		mainWrap.removeChild(li);
	});

	var editInput = document.createElement('input');
	p.addEventListener('click', function() {
		

		var pVal = p.textContent;
		var eInputVal = editInput.value = pVal;

		li.removeChild(p);
		li.insertBefore(editInput, removeBtn);

		editInput.onblur = () => {
			p.innerText = editInput.value;
			li.insertBefore(p, removeBtn);
			li.removeChild(editInput);
			
		}

	})
}


btnTask.addEventListener('click', nTask, false);
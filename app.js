const btnTask = document.getElementById('add-task');
const newTask = document.getElementById('new-task');
const mainWrap = document.getElementById('main');
const listItem = document.getElementsByClassName('list');
const inputDate = document.getElementById('date');
const mainSelect = document.getElementById("mainSelect");


const clear = anyInput => {
	anyInput.value = "";
}

const nTask = (e) => {

	const taskValue = newTask.value;
	
	const li = document.createElement('li');
	li.classList.add('list')

	const btnsDiv = document.createElement('div');
	btnsDiv.classList.add('btnsDiv');


	const removeBtn = document.createElement('button');
	removeBtn.classList.add('removeBtn');
	removeBtn.classList.add('circleBtn');

	const editBtn = document.createElement('button');
	editBtn.classList.add('editBtn');
	editBtn.classList.add('circleBtn');

	const okBtn = document.createElement('button');
	okBtn.classList.add('okBtn');
	okBtn.classList.add('circleBtn');

	const okIcon = document.createElement('i');
	okIcon.classList.add( "circle-icon", "far", "fa-check-square" );
	okBtn.appendChild(okIcon);

	const editIcon = document.createElement('i');
	editIcon.classList.add( "circle-icon", "fas", "fa-pen" );
	editBtn.appendChild(editIcon);

	const removeIcon = document.createElement('i');
	removeIcon.classList.add( "circle-icon", "far", "fa-trash-alt" );
	removeBtn.appendChild(removeIcon);

	const checkBtn = document.createElement('input')
	checkBtn.type = "checkbox";
	checkBtn.id = 'checkbox'
	checkBtn.classList.add('checkBtn');

	const checkLabel = document.createElement('label');
	checkLabel.setAttribute('for', 'checkbox');
	

	var p = document.createElement('p');
	p.classList.add('list-p');
	li.appendChild(p);

	if (inputDate.value !== '') {
		var dateP = document.createElement('p');
		dateP.classList.add('date-p');
		dateP.innerText = inputDate.value
		li.insertBefore(dateP, li.children[2]);
	}
	
	p.innerHTML = taskValue;
	btnsDiv.appendChild(removeBtn);
	btnsDiv.appendChild(editBtn);
	li.insertBefore(checkBtn, li.children[0]);
	li.insertBefore(checkLabel, li.children[1]);
	li.appendChild(btnsDiv);

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
	
	clear(newTask);
	clear(inputDate);
	
	removeBtn.addEventListener('click', function(e) {
		mainWrap.removeChild(li);
	});

	const editP = function (e) {
		console.log(this)
		p.innerText = editInput.value;
		li.insertBefore(p, li.children[1]);
		editInput.parentNode.removeChild(editInput);
		this.parentNode.removeChild(this);
		btnsDiv.appendChild(editBtn);
	}
	
	const editInput = document.createElement('input');
	editInput.classList.add('editInput');

	editBtn.addEventListener('click', function() {
		li.removeChild(p);
		li.insertBefore(editInput, li.children[1]);
		editInput.value = p.textContent;
		editInput.focus();
		btnsDiv.removeChild(editBtn);
		btnsDiv.appendChild(okBtn);
		okBtn.addEventListener('click', editP, false);
	}, false)

	const optionValue = mainSelect.options[mainSelect.selectedIndex].value;

	let listArray = [...listItem]
	const priorColor = color => {
		listArray.forEach(el => {
			return el.style.boxShadow = "inset 25px 0px 5px 0px " + color;
		});
		// for(let i = 0; i < listItem.length; i++) {
		// 	listItem[i].style.boxShadow = "inset 25px 0px 5px 0px " + color;
		// }
	}

  if(optionValue == 'low') {
		priorColor('green');
	}
	else if(optionValue == 'middle') {
		priorColor('orange');
	}
	else if(optionValue == 'high') {
		priorColor('red');
	}
	else {
		return false;
	}

	okBtn.removeEventListener('click', editP, false);
	e.preventDefault();
}

btnTask.addEventListener('click', nTask, false);


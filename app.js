const btnTask = document.getElementById('add-task');
const newTask = document.getElementById('new-task');
const mainWrap = document.getElementById('main');
const listItem = document.getElementsByClassName('list');


const nTask = () => {
    let taskValue = newTask.value;
    let li = document.createElement('li');
    li.classList.add('list')
    li.innerHTML = taskValue;
    mainWrap.appendChild(li);
}

const liTarget = e => {
    let target = e.target;
    console.log(target);
    if (target.tagName != 'li') return;
}

btnTask.addEventListener('click', nTask, false);

mainWrap.addEventListener('click', liTarget, false);
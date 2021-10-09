let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');




let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
    console.log(todoList)

};

addButton.addEventListener('click', function () {

    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };

    todoList.push(newTodo);
    displayMessages();
    addMessage.value = '';
});

function deleteTask(value_task) {
    for (let i = 0; i < todoList.length; i++) {
        if (value_task === todoList[i].todo) {
            todoList.splice(i, 1)
        }
        displayMessages()
        localStorage.setItem('todo', JSON.stringify(todoList));
    }
}

function displayMessages() {
    let displayMessage = '';
    todoList.forEach(function (item, index) {
        displayMessage += `
        <li>
        <input type="button" value="Удалить" onclick="deleteTask('${item.todo}')" class = 'btn_delete'>
        <input type='checkbox' id='item_${index}' ${item.checked ? 'checked' : ''}>
        <label for='item_${index}' class ="${item.important ? 'important' : ''}">${item.todo}</label>    
        </li > `;
        todo.innerHTML = displayMessage;
    });
    localStorage.setItem('todo', JSON.stringify(todoList));
};


todo.addEventListener('change', function (event) {
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for =' + idInput + ' ]');
    let valueLabel = forLabel.innerHTML;
    console.log('Ваше дело: ', valueLabel);

    todoList.forEach(function (item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });

});

todo.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    todoList.forEach(function (item) {
        if (item.todo === event.target.innerHTML) {
            item.important = !item.important;
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});




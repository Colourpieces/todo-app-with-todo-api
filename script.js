let state = {
  todos: [
    { id: 1, description: "Aufgabe 1", done: false },
    { id: 2, description: "Aufgabe 2", done: true },
    { id: 3, description: "Aufgabe 3", done: false },
    { id: 4, description: "Aufgabe 4", done: false },
  ],
};

function renderTodos() {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  const newTodoDescription = document.createElement("label");
  newTodoDescription.appendChild(document.createTextNode("test"));
  /*
  const newTodoState = document.createElement("input");
  newTodoState.setAttribute("type", "checkbox");
  newTodoState.setAttribute("id", "todo");
  newTodoState.appendChild(document.createTextNode("test"));

  */
  todoList.appendChild(newTodoDescription);
}

renderTodos();

/*
<li class="todo-item">
<input type="checkbox" name="todo-test" id="todo-test">
<label class="todo-description done" for="todo-test">test to do</label>
<button class="btn-delete-todo" id="btn-delete-todo">x</button>
</li>
*/

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

  state.todos.forEach((todoElement) => {
    const todoItem = document.createElement("li");
    todoItem.classList = "todo-item";

    const classId = `todo-${todoElement.id}`;

    const newTodoState = document.createElement("input");
    newTodoState.type = "checkbox";
    newTodoState.checked = todoElement.done;
    newTodoState.classList = "checkbox";
    //newTodoState.id = `todo-${todoElement.id}`;
    //newTodoState.setAttribute("id", "`todo-${todoElement.id}`");
    //newTodoState.setAttribute("id", classId);
    newTodoState.id = classId;
    todoItem.appendChild(newTodoState);

    const newTodoDescription = document.createElement("label");
    newTodoDescription.classList = "todo-description";

    newTodoDescription.htmlFor = classId;
    newTodoDescription.appendChild(
      document.createTextNode(todoElement.description)
    );
    todoItem.appendChild(newTodoDescription);

    const newTodoDeleteButton = document.createElement("button");
    newTodoDeleteButton.classList = "btn-delete-todo";
    newTodoDeleteButton.id = "delete-" + classId;
    newTodoDeleteButton.appendChild(document.createTextNode("x"));
    todoItem.appendChild(newTodoDeleteButton);

    todoList.appendChild(todoItem);
  });
}

renderTodos();

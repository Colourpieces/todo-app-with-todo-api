let state = {
  todos: [
    { id: 1, description: "Aufgabe 1", done: false },
    { id: 2, description: "Aufgabe 2", done: true },
    { id: 3, description: "Aufgabe 3", done: false },
    { id: 4, description: "Aufgabe 4", done: false },
  ],
};

async function getState() {
  const resp = await fetch("http://localhost:4730/todos");
  // console.log(resp);
  const todos = await resp.json();
  state.todos = todos;
  renderTodos();
}
//Alternative
function getState2() {
  fetch("http://localhost:4730/todos")
    .then((request) => request.json())
    .then((todos) => {
      state.todos = todos;
      renderTodos();
    });
}

async function putState(id, todoLi) {
  const resp = await fetch("http://localhost:4730/todos/" + id, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(todoLi),
  });
  const todos = await resp.json();
  getState();
  renderTodos();
}

function renderTodos() {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  state.todos.forEach((todoElement) => {
    console.log(todoElement);
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

    todoItem.getObj = todoElement;
    todoList.appendChild(todoItem);
  });
}

const todoList = document.querySelector("#todo-list");
todoList.addEventListener("change", (e) => {
  console.log("--------");
  const todoLi = e.target.parentNode.getObj;
  todoLi.done = e.target.checked;
  //console.log(state.todos);
  putState(todoLi.id, todoLi);
});

///////////////////////////////////////////////////
getState();
renderTodos();

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
// function getState2() {
//   fetch("http://localhost:4730/todos")
//     .then((request) => request.json())
//     .then((todos) => {
//       state.todos = todos;
//       renderTodos();
//     });
// }

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

async function postTodo(todoLi) {
  const resp = await fetch("http://localhost:4730/todos/", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(todoLi),
  });
  const newTodo = await resp.json();
  state.todos.push(newTodo);
  renderTodos();
}

function renderTodos() {
  const todoList = document.querySelector("#todo-list");
  const filter = document.querySelector("#filter-select");

  todoList.innerHTML = "";

  state.todos.forEach((todoElement) => {
    let renderTodoItem = true;

    switch (filter.value) {
      case "all":
        //alles rendern
        renderTodoItem = true;
        break;
      case "done":
        if (!todoElement.done) {
          renderTodoItem = false;
        }
        break;
      case "open":
        if (todoElement.done) {
          renderTodoItem = false;
        }
        break;
    }
    if (renderTodoItem) {
      //wie unterbricht man forEach??

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
      newTodoDeleteButton.addEventListener("click", () => {
        delteTodo(todoElement.id);
      });
      todoItem.appendChild(newTodoDeleteButton);

      todoItem.getObj = todoElement;
      todoList.appendChild(todoItem);
    }
  });
}

async function delteTodo(id) {
  const resp = await fetch("http://localhost:4730/todos/" + id, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
  });
  const data = await resp.json(); //nur um zu prüfen ob HTTP Status ok ggf Fehlerhandling
  getState();
  renderTodos();
}

function isDuplicate(todoDescription) {
  for (let i = 0; i < state.todos.length; i++) {
    const currentTodo = state.todos[i];
    if (
      currentTodo.description.toLowerCase() === todoDescription.toLowerCase()
    ) {
      return true;
      break;
    }
  }
  return false;
}

const todoList = document.querySelector("#todo-list");
todoList.addEventListener("change", (e) => {
  const todoLi = e.target.parentNode.getObj;
  todoLi.done = e.target.checked;
  putState(todoLi.id, todoLi);
});

//-------- add toDo -----------
const buttonAddTodo = document.querySelector("#btn-add-todo");
const inputNewTodo = document.querySelector("#input-new-todo");
buttonAddTodo.addEventListener("click", (e) => {
  console.log(e);
  const description = inputNewTodo.value.trim();
  if (!description) {
    alert(
      "Eine Aufgabe muss mindestens 1 Zeichen beinhalten. Leerzeichen vorne und hinten werden entfernt."
    );
    return;
  }
  if (isDuplicate(description)) {
    alert("Diese Aufgabe gibt es schon! Gibt es noch andere Aufgaben?");
    return;
  }

  const newTodoObject = {
    description: description,
    done: false,
  };

  inputNewTodo.value = "";
  postTodo(newTodoObject);
  renderTodos();
});

const filter = document.querySelector("#filter-select");
filter.addEventListener("sl-change", () => {
  renderTodos();
});
///////////////////////////////////////////////////
window.onload = function () {
  getState();
};

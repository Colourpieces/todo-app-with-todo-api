// let state = {
//   todos: [
//     { id: 1, description: "Aufgabe 1", done: false },
//     { id: 2, description: "Aufgabe 2", done: true },
//     { id: 3, description: "Aufgabe 3", done: false },
//     { id: 4, description: "Aufgabe 4", done: false },
//   ],
// };

// async function getState() {
//   const resp = await fetch("http://localhost:4730/todos");
//   const todos = await resp.json();
//   state.todos = todos;
//   renderTodos();
// }

// async function putState(id, todoLi) {
//   const resp = await fetch("http://localhost:4730/todos/" + id, {
//     method: "PUT",
//     headers: { "Content-type": "application/json" },
//     body: JSON.stringify(todoLi),
//   });
//   const todos = await resp.json();
//   getState();
// }

// async function postTodo(todoLi) {
//   const resp = await fetch("http://localhost:4730/todos/", {
//     method: "POST",
//     headers: { "Content-type": "application/json" },
//     body: JSON.stringify(todoLi),
//   });
//   const newTodo = await resp.json();
//   state.todos.push(newTodo);
//   getState();
// }

// function renderTodos() {
//   const todoList = document.querySelector("#todo-list");
//   const filter = document.querySelector("#filter-select");

//   todoList.innerHTML = "";

//   state.todos.forEach((todoElement, index) => {
//     let renderTodoItem = true;

// switch (filter.value) {
//   case "all":
//     //alles rendern
//     renderTodoItem = true;
//     break;
//   case "done":
//     if (!todoElement.done) {
//       renderTodoItem = false;
//     }
//     break;
//   case "open":
//     if (todoElement.done) {
//       renderTodoItem = false;
//     }
//     break;
// }
//     if (renderTodoItem) {
//       // const todoItem = document.createElement("li");
//       // todoItem.classList = "todo-item";

//       const classId = `todo-${todoElement.id}`;

//       const newTodoState = document.createElement("input");
//       newTodoState.type = "checkbox";
//       newTodoState.checked = todoElement.done;
//       newTodoState.classList = "checkbox";
//       newTodoState.addEventListener("change", (e) => {
//         todoElement.done = e.target.checked;
//         putState(todoElement.id, todoElement);
//       });
//       newTodoState.id = classId;
//       todoItem.appendChild(newTodoState);

//       const newTodoDescription = document.createElement("label");
//       newTodoDescription.classList = "todo-description";
//       newTodoDescription.htmlFor = classId; //notwendig um label und checkbox
//       newTodoDescription.appendChild(
//         document.createTextNode(todoElement.description)
//       );
//       todoItem.appendChild(newTodoDescription);

//       const newTodoDeleteButton = document.createElement("button");
//       newTodoDeleteButton.classList = "btn-delete-todo";
//       newTodoDeleteButton.appendChild(document.createTextNode("x"));
//       newTodoDeleteButton.addEventListener("click", () => {
//         deleteTodo(todoElement.id);
//         getState();
//       });
//       todoItem.appendChild(newTodoDeleteButton);

//       todoList.appendChild(todoItem);
//     }
//   });
// }

// async function deleteTodo(id) {
//   const resp = await fetch("http://localhost:4730/todos/" + id, {
//     method: "DELETE",
//     headers: { "Content-type": "application/json" },
//   });
//   const data = await resp.json(); //nur um zu prüfen ob HTTP Status ok ggf Fehlerhandling
// }

// function isDuplicate(todoDescription) {
//   for (let i = 0; i < state.todos.length; i++) {
//     const currentTodo = state.todos[i];
//     if (
//       currentTodo.description.toLowerCase() === todoDescription.toLowerCase()
//     ) {
//       return true;
//       break;
//     }
//   }
//   return false;
// }

//-------- add toDo -----------
// function addTodo(e) {
//   e.preventDefault;

//   const description = inputNewTodo.value.trim();
//   if (!description) {
//     alert(
//       "Eine Aufgabe muss mindestens 1 Zeichen beinhalten. Leerzeichen vorne und hinten werden entfernt."
//     );
//     return;
//   }
//   if (isDuplicate(description)) {
//     alert("Diese Aufgabe gibt es schon! Gibt es noch andere Aufgaben?");
//     return;
//   }

//   const newTodoObject = {
//     description: description,
//     done: false,
//   };

//   inputNewTodo.value = "";
//   postTodo(newTodoObject);
// }

// const buttonAddTodo = document.querySelector("#btn-add-todo");
// const inputNewTodo = document.querySelector("#input-new-todo");
// buttonAddTodo.addEventListener("click", (event) => {
//   addTodo(event);
// });
// inputNewTodo.addEventListener("keydown", (event) => {
//   if (event.key === "Enter") {
//     addTodo(event);
//   }
//   inputNewTodo.focus(); //funktioniert nicht. warum?
// });

//-------- filter toDo -----------
// const filter = document.querySelector("#filter-select");
// filter.addEventListener("sl-change", () => {
//   renderTodos();
// });

//-------- delete done toDo -----------
// const buttonDeleteDone = document.querySelector("#btn-delete-done");
// buttonDeleteDone.addEventListener("click", () => {
//   state.todos.forEach((currentTodo) => {
//     if (currentTodo.done === true) {
//       deleteTodo(currentTodo.id);
//     }
//   });
//   getState();
// });

//-------- delete all toDo -----------
// const buttonDeleteAll = document.querySelector("#btn-delete-all");
// buttonDeleteAll.addEventListener("click", () => {
//   state.todos.forEach((currentTodo) => {
//     deleteTodo(currentTodo.id);
//   });
//   getState();
// });

///////////////////////////////////////////////////
// window.onload = function () {
//   getState();
// };

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

const { createApp } = Vue;

createApp({
  data() {
    return {
      todos: [
        { id: 1, description: "Aufgabe 1", done: false },
        { id: 2, description: "Aufgabe 2", done: true },
        { id: 3, description: "Aufgabe 3", done: false },
      ],
      currentFilter: "all",
      newTodo: "",
    };
  },
  methods: {
    changeFilter(e) {
      this.currentFilter = e.target.value;
    },

    getNewTodo(e) {
      this.newTodo = e.target.value;
    },

    async getToDos() {
      const resp = await fetch("http://localhost:4730/todos");
      const data = await resp.json();
      this.todos = data;
    },

    async putTodo(id, todoLi) {
      const resp = await fetch("http://localhost:4730/todos/" + id, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(todoLi),
      });
      const todos = await resp.json();
      this.getToDos();
    },
    async postTodo(todoLi) {
      const resp = await fetch("http://localhost:4730/todos/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(todoLi),
      });
      const newTodo = await resp.json();
      //this.todos.push(newTodo);
      this.getToDos();
    },

    async deleteTodo(id) {
      const resp = await fetch("http://localhost:4730/todos/" + id, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      });
      const data = await resp.json(); //nur um zu prüfen ob HTTP Status ok ggf Fehlerhandling
      this.getToDos();
    },

    isDuplicate(todoDescription) {
      for (let i = 0; i < this.todos.length; i++) {
        const currentTodo = this.todos[i];
        if (
          currentTodo.description.toLowerCase() ===
          todoDescription.toLowerCase()
        ) {
          return true;
          break;
        }
      }
      return false;
    },

    addTodo() {
      const description = this.newTodo.trim();
      if (!description) {
        alert(
          "Eine Aufgabe muss mindestens 1 Zeichen beinhalten. Leerzeichen vorne und hinten werden entfernt."
        );
        return;
      }
      if (this.isDuplicate(description)) {
        alert("Diese Aufgabe gibt es schon! Gibt es noch andere Aufgaben?");
        return;
      }

      const newTodoObject = {
        description: description,
        done: false,
      };

      this.newTodo = "";
      this.$refs.description.value = "";
      this.postTodo(newTodoObject);
    },

    deleteDoneTodos() {
      this.todos.forEach((currentTodo) => {
        if (currentTodo.done === true) {
          this.deleteTodo(currentTodo.id);
        }
      });
      this.getToDos();
    },

    deleteAllTodos() {
      this.todos.forEach((currentTodo) => {
        this.deleteTodo(currentTodo.id);
      });
      this.getToDos();
    },
  },
  computed: {
    filteredTodos() {
      switch (this.currentFilter) {
        case "all":
          //alles rendern
          return this.todos;
          break;
        case "done":
          return this.todos.filter((todoItem) => todoItem.done === true);
          break;
        case "open":
          return this.todos.filter((todoItem) => todoItem.done === false);
          break;
      }
    },
  },

  mounted() {
    this.getToDos();
  },
}).mount("#app");

/*
Fragen:
- Warum noch () nach data und bei methods : ?? 

*/

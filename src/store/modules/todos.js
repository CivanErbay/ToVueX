import axios from "axios";

const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => {
    return state.todos;
  },
};

const actions = {
  async fetchTodos({ commit }) {
    //We commit a mutation
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    commit("setTodos", response.data); //first param = mutation we want to call, second param = what we want to pass in
  },

  async addTodo({ commit }, title) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title,
        completed: false,
      }
    );

    commit("newTodo", response.data); //first param = mutation we want to call, second param = what we want to pass in
  },

  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit("removeTodo", id);
  },

  async filterTodos({ commit }, limit) {
    //get selected number
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    commit("setTodos", response.data);
  },

  async updateTodo({ commit }, updTodo) {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
    updTodo
    );
    commit("updateTodo", response.data);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)), //returns every todo out of state.todos in which the id is not the same. The matching id pair is NOT part of the filtered array

  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

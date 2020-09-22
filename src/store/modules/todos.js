import axios from 'axios';

const state = {
    todos: []
};

const getters = {
    allTodos: (state) => {
        return state.todos
    }
};

const actions = {
    async fetchTodos({ commit }) {          //We commit a mutation
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
        commit('setTodos', response.data) //first param = mutation we want to call, second param = what we want to pass in
    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos )
}; 

export default {
    state,
    getters,
    actions,
    mutations
}
<template>
  <div>
    <h3>Todos</h3>
    <div class="legend">
      <span>Double click to mark as complete</span>
      <span>
        <span class="incomplete-box"></span> = Incomplete
      </span>
      <span>
        <span class="complete-box"></span> = Complete
      </span>
    </div>
    <div class="todos">
      <div @dblclick="onDblClick(todo)" v-for="todo in allTodos" v-bind:key="todo.id" class="todo" v-bind:class="{'is-complete':todo.completed}">
        <img @click="editTodo(todo.id, todo)" class="todos__edit-icon" src="../assets/edit.svg" alt="">
        <p v-if="editId != todo.id">{{todo.title}}</p>
        <input v-model="editContent" v-if="editId == todo.id" type="text">
        <img @click="deleteTodo(todo.id)" class="todos__delete-icon" src="../assets/delete.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; //This gets the getter and actions from vuex-Store

export default {
  name: "Todos",
  data() {
    return {
      editId: undefined,
      editContent: "",
    }
  },
  methods: {
    ...mapActions(["fetchTodos", "deleteTodo", "updateTodo"]),
    onDblClick(todo) {
      const updTodo = {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed,
      }
      this.updateTodo(updTodo)
    },
    editTodo(id,todo) {
      this.editId = this.editId !== id ? id : undefined;
      const edtTodo = {
        id: todo.id,
        title: this.editContent,
        completed: todo.completed
      }
      this.updateTodo(edtTodo)
      this.editContent = ""
    }
  },
  computed: mapGetters(["allTodos"]),
  created() {
    this.fetchTodos();
  } //created() => is a lifecycle hook beforeMount
  //mapGetters(['allTodos']) allows us to use this getters out of the module
};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
.todos__delete-icon {
    height: 3vh;
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: #fff;
    cursor: pointer;
}.todos__edit-icon {
    height: 3vh;
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: #fff;
    cursor: pointer;
}
.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}
.is-complete {
  background: #35495e;
  color: #fff;
}
@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>
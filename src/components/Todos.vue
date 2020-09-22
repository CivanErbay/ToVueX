<template>
  <div>
      <h3>Todos</h3>
      <div class="todos">
          <div v-for="todo in allTodos" v-bind:key="todo.id" class="todo">
            <p>{{todo.title}}</p>
          </div>
      </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';             //This gets the getter from vuex-Store

export default {
 name:"Todos",
 computed: mapGetters(['allTodos'])                  //For any complex logic, you should use a computed property.
                                                    //mapGetters(['allTodos']) allows us to use this getters out of the module
}
</script>

<style>

</style>
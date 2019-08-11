<template>
    <div class="home">
        <img alt="Vue logo" src="./assets/logo.png" id="vue-logo">
        <div class="title">My To Do List</div>
        <input v-model="myTodo" />
        <button @click="addToDo">Add</button>
        <div v-if="errors" id="errors">{{errors}}</div>
        <div v-if="toDoItems && toDoItems.length">
            <div class="title">Todos that need to be done today</div>
            <div v-for="item in toDoItems" :key="item.id">
                {{item.title}} <small style="text-decoration: underline; cursor: pointer;" @click="deleteTodo(item.id)">Delete</small>
            </div>
        </div>
    </div>
</template>

<script>
import {db} from './main'
import {mapState, mapActions} from 'vuex'
export default {
  name: 'app',
    data () {
      return {
          myTodo: '',
          errors: ''
      }
    },
    computed : {
        ...mapState('firstStore', ['toDoItems'])
    },
    created () {
      this.SET_ITEMS_ACTION();
    },
    methods: {
        ...mapActions ('firstStore', ['SET_ITEMS_ACTION']),
        addToDo () {
            this.errors = '';
            if (this.myTodo) {
                db.collection('items').add({
                    title: this.myTodo,
                    createdAt: Date.now()
                }).then(response => {
                    this.myTodo = ''
                }).catch(error => {
                    this.errors = error
                })
            }
            else {
                this.errors = 'Enter a To do Task!'
            }
        },
        deleteTodo (id) {
            if (id) {
                db.collection('items').doc(id).delete().then(() => {
                    this.errors = 'Item Deleted!'
                }).catch(e => {
                    this.errors = e
                })
            } else {
                this.errors = 'No Id Found!'
            }
        }
    }
}
</script>

<style>
    * {
        box-sizing: border-box;
    }

    body, html, #app {
        background: #8ac8e5;
    }

    .home {
        width:300px;
        margin:auto;
    }

    #vue-logo {
        width: 100px;
    }

    input, button {
        border:0;
        width:100%;
        margin:0 0 10px;
        padding: 7px;
    }
    input {
        font-size: 12px;
    }

    button {
        background: #43b83b;
        border: 0;
        text-transform: uppercase;
        color: #fff;
        font-weight:700;
        cursor: pointer;
    }

    title {
        font-size:14px;
        font-weight:700;
        padding: 0 0 10px 0;
        margin: 0 0 10px 0;
        border-bottom: 1px solid #666;
    }

    #errors {
        background: #a52222;
        color: #fff;
        padding: 5px;
    }
</style>

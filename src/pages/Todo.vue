<template>
  <q-page class="bg-grey-3 column">
    <div class="q-pa-md bg-primary">
      <q-input
        v-model="newTask"
        @keyup.enter="addTasks"
        filled
        square
        class="col"
        bg-color="white"
        bottom-slots
        placeholder="Nouvelle tâche " dense>
        <template v-slot:append>
          <q-btn
            @click="addTasks"
            round
            dense
            flat
            icon="add"/>
        </template>
      </q-input>
    </div>
    <div class="q-pa-md">
      <div class="q-gutter-sm">
        <q-list
          class="bg-white"
          separator
          bordered>
          <q-item
            v-for="(task,key) in tasks"
            :key="key"
            @click="task.done = !task.done"
            clickable
            :class="{'done bg-grey-2' : task.done }"
            v-ripple>
            <q-item-section avatar>
              <q-checkbox
                v-model="task.done"
                class="no-pointer-events"
                color="primary"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{task.title}}</q-item-label>
            </q-item-section>
            <q-item-section
              side>
              <q-btn @click.stop="deleteTasks(key)" class="glossy" flat round dense color="primary" icon="delete"/>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="q-px-sm">
      </div>
    </div>
  </q-page>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {
        newTask: '',
      }
    },
    props: ['id'],

    computed: {
      ...mapGetters(['tasks']),
    },
    methods: {
      ...mapActions(['addTask', 'deleteTask']),
      deleteTasks(id) {
        this.$q.dialog({
          title: 'Confirm',
          message: 'Really ?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.deleteTask(id)
          this.$q.notify({
            message: 'Task deleted',
            icon: 'announcement'
          })
        })
      },
      addTasks() {
        if (this.newTask === '') {
          this.$q.notify({
            message: 'enter a task',
            icon: 'error'
          })
        } else {
          this.addTask({
            tasks: {
              title: this.newTask,
              done: false,
            },
            currentUser: this.$route.params.currentUser
          })
        }
        this.newTask = ''
      }
    }
  }
</script>
<style lang="scss">
  .done {
    .q-item__label {
      text-decoration: line-through;
      color: #bbb;
    }
  }

  .todoapp {
    background: #fff;
    margin: 130px 0 40px 0;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  }
</style>

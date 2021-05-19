<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
      </q-avatar>

      <q-toolbar-title>Todo App {{ taskInput }}</q-toolbar-title>

      <q-btn flat round dense icon="whatshot" @click="$data.$log('test'), $router.push({ path: '/' })" />
    </q-toolbar>
    <div class="q-ma-md">
      <my-calc
        v-model="answer" :num1="1" :num2="2"
      />
      Answer {{ answer }}
      <q-input outlined v-model="taskInput" @keyup.enter="save" label="task" />
      <q-list bordered separator class="q-mt-md">
        <q-item v-for="(item, i) in filteredTodos" :key="'item'+i" clickable v-ripple>
          <q-item-section avatar>
            <q-checkbox :value="item.isDone" @click.native="toggleStatus(item)" />
          </q-item-section>
          <q-item-section :class="{ 'text-grey': item.isDone }" :style="{ 'text-decoration': item.isDone ? 'line-through' : '' }">
            {{ i }} {{ item.desc }}
          </q-item-section>
          <q-item-section side>
            <q-btn icon="delete" @click="remove(i)" round dense color="red" flat />
          </q-item-section>
        </q-item>
        <!-- <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="signal_wifi_off" />
          </q-item-section>
          <q-item-section>Active</q-item-section>
          <q-item-section side>Side</q-item-section>
        </q-item> -->
      </q-list>
    </div>
    <q-toolbar class="bg-primary text-white row">
      <!-- <q-avatar>
        <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
      </q-avatar> -->
      <div class="col">
        {{ remainingTask }} left
      </div>
      <div>
        <q-btn-toggle
          v-model="status"
          toggle-color="white"
          toggle-text-color="primary"
          :options="[
            {label: 'All', value: 'All'},
            {label: 'Pending', value: 'Pending'},
            {label: 'Done', value: 'Done'}
          ]"
        />
      </div>
      <div class="col"></div>

      <q-btn flat dense @click="clearDone" label="clear completed" />
    </q-toolbar>
    <pie-chart :donut="true" :data="[['Pending', remainingTask], ['Done', todos.length - remainingTask]]"></pie-chart>
    <q-btn icon="download" @click="generatePDF('download')" />
    <q-btn icon="open_in_new" @click="generatePDF('open')" />
    <q-btn icon="print" @click="generatePDF('print')" />
  </div>
</template>

<script>
export default {
  data: () => ({
    $log: console.log,
    answer: 0,
    status: 'All',
    taskInput: '',
    todos: [
      {
        desc: 'add button',
        isDone: true
      },
      {
        desc: 'delete button',
        isDone: true
      }
    ]
  }),
  computed: {
    remainingTask () {
      return this.todos.filter(item => !item.isDone).length
    },
    filteredTodos () {
      return this.todos.filter(item => {
        switch (this.status) {
          case 'Pending':
            return !item.isDone
          case 'Done':
            return item.isDone
          default:
            return true
        }
      })
    }
  },
  methods: {
    save () {
      this.todos.push({
        desc: this.taskInput,
        isDone: false
      })
      this.taskInput = ''
    },
    remove (i) {
      this.todos.splice(i, 1)
    },
    toggleStatus (task) {
      task.isDone = !task.isDone
    },
    clearDone () {
      this.todos = this.todos.filter(i => !i.isDone)
    },
    generatePDF (mode) {
      const dd = {
        content: [
          {
            table: {
              body: [
                ['Pending', 'Done'],
                [this.remainingTask, this.todos.length - this.remainingTask]
              ]
            }
          }
        ]
      }
      this.$pdfMake.createPdf(dd)[mode]()
    }
  }
}
</script>

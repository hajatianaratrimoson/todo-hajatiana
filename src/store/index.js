import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './store'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      tasks
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./store'], () => {
      const newTasks = require('./store').default;
      Store.hotUpdate({modules: {tasks: newTasks}})
    })
  }

  return Store
}

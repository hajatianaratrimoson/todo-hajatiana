import {firebaseAuth, firebaseDb} from "../boot/firebase";
import Vue from 'vue'
const state = {
  userDetails: {},
  tasks: {},
};

const mutations = {
  tasks: state => {
    return state.tasks
    // state.tasks.forEach(task => {
    //   task.done = true
    // })
  },
  setUserDetail(state, payload) {
    state.userDetails = payload
  },
  setTasks(state, payload) {
   Vue.set(state.tasks, payload.userId, payload.tasksDetails)
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id)
  }
};

const actions = {
  registerUser({}, payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log(response);
        let userId = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + userId).set({
          name: payload.name,
          email: payload.email
        })
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  loginUser({}, payload) {
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('response ', response);
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  logoutUser() {
    firebaseAuth.signOut()
  },
  addTask({}, payload) {
    firebaseDb.ref('tasks').push(payload.tasks)
  },
  deleteTask ({commit}, id){
    commit('deleteTask', id)
    console.log(payload.tasks)
    firebaseDb.ref('tasks/').delete(id)
  },
  handleAuthStateChanged({commit, dispatch}) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        let userId = firebaseAuth.currentUser.uid;
        console.log(firebaseDb.ref("users/" + userId).once('value'));
        firebaseDb.ref("users/" + userId).once('value', snapshot => {
          console.log('snapshot', snapshot);
          let userDetails = snapshot.val();
          console.log('userDetails', userDetails);
          commit('setUserDetail', {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
          });
        });
        dispatch('firebaseGetTasks');
        this.$router.push('/')
      } else {
        commit('setUserDetail', {});
        this.$router.replace('/auth')
      }
    });
  },
  firebaseGetTasks({commit}) {
    firebaseDb.ref('tasks/').on('child_added', snapshot => {

      let tasksDetails = snapshot.val()
      let userId = snapshot.key
      console.log('tasksDetails', tasksDetails)
      commit('setTasks', {
        userId,
        tasksDetails

      });
    })
  }
};

const getters = {
  tasks: (state) => {
    return state.tasks
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}

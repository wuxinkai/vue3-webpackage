import { createStore } from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import theme from './modules/theme'
export default createStore({
  getters,
  modules: {
    theme,
    user,
    app
  }
})

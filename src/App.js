import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import axios from 'axios'
import MainRoutes from './routes/MainRoutes'
import store from './store/store'
import { persistLogin } from './actions/authenticationActions'

axios.defaults.withCredentials = true

const history = createHistory()

let prevLocation = {}

history.listen((location) => {
  const pathChanged = prevLocation.pathname !== location.pathname
  const hashChanged = prevLocation.hash !== location.hash
  if (pathChanged || hashChanged) window.scrollTo(0, 0)
  prevLocation = location
})

store.dispatch(persistLogin())

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <MainRoutes
        history={history}
      />
    </Router>
  </Provider>
)

export default App

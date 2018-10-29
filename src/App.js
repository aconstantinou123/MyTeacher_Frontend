import React from 'react'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import LandingPage from './containers/LandingPage/LandingPage'
import store from './store/store'

const history = createHistory()

let prevLocation = {}

history.listen((location) => {
  const pathChanged = prevLocation.pathname !== location.pathname
  const hashChanged = prevLocation.hash !== location.hash
  if (pathChanged || hashChanged) window.scrollTo(0, 0)
  prevLocation = location
})

const App = () => (
  <Provider store={store}>
    <LandingPage />
  </Provider>
)

export default App

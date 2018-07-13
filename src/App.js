import React, { Component } from 'react'
import {Provider} from 'react-redux'

import {CustomRouter} from './router'
import store from './store'
import './assets/App.css'
import './assets/global.styl'

const apps = Object.keys(window.config)

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <CustomRouter apps={apps}/>
        </Provider>
    )
  }
}

export default App;

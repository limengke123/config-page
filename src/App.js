import React, { Component } from 'react'
import {Provider} from 'react-redux'

import {CustomRouter} from './router'
import store from './store'
import './assets/App.css'
import './assets/global.styl'


class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <CustomRouter/>
        </Provider>
    )
  }
}

export default App;

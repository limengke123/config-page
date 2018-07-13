import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {axios} from './util'
import registerServiceWorker from './util/registerServiceWorker'

;(async function () {
    let config = null
    try{
        const response = await axios.get('/api/pageConfig')
        config = response.data
    } catch (e) {
        console.log(e.stack)
    }
    if (config) {
        window.config = config
        ReactDOM.render(<App />, document.getElementById('root'))
        registerServiceWorker()
    }
})()



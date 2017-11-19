import React from 'react'
import ReactDOM from 'react-dom'

const App = () => (<div>Hello SSR Starter</div>)

ReactDOM.hydrate(<App />, document.getElementById('root'))
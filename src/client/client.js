import React from 'react'
import ReactDOM from 'react-dom'

const App = () => (<div>hello!</div>)

ReactDOM.hydrate(<App />, document.getElementById('root'))
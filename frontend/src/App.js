import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import DefaultPage from './components/DefaultPage'
import AnalyseTweets from './components/AnalyseTweets'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
  const [data, setData] = useState([{}])


  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <DefaultPage />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/analysetweets">
            <AnalyseTweets />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

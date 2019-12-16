import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Spinner } from 'reactstrap'
import Login from './Containers/Login'
import Home from './Containers/Home'
import { LoaderContext } from './LoaderContextManagement'
import './App.css'

export const LadingContext = React.createContext({
  isLoading: false,
  setLanguage: () => {}
})

function App () {
  const setLoaderAndUpdateLoginStatus = (isLoading) => {
    setState({ ...state, isLoading: isLoading })
    console.log('window.localStorage.getItem(atkn)', window.localStorage.getItem('atkn'))
    setLoggedin(!!window.localStorage.getItem('atkn'))
  }

  const initState = {
    isLoading: false,
    setLoader: setLoaderAndUpdateLoginStatus
  }

  const [state, setState] = useState(initState)
  const [isLoggedIn, setLoggedin] = useState(!!window.localStorage.getItem('atkn'))
  return (
    <LoaderContext.Provider value={state}>
      <Router>
        {state.isLoading && <div style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          display: 'flex',
          zIndex: 999,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.2)'
        }}
        >
          <Spinner color='primary' />
        </div>}
        <div>
          <Switch>
            {!isLoggedIn && <Redirect from='/home' to='/' exact />}
            {isLoggedIn && <Redirect from='/' to='/home' exact />}
            <Route exact path='/home' component={Home} />
            <Route exact path='/' component={Login} />
          </Switch>
        </div>
      </Router>
    </LoaderContext.Provider>
  )
}

export default App

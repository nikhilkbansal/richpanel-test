import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
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
  const setLoader = (isLoading) => {
    setState({ ...state, isLoading: isLoading })
  }

  const initState = {
    isLoading: false,
    setLoader: setLoader
  }

  const [state, setState] = useState(initState)
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
            <Route exact path='/home' component={Home} />
            <Route exact path='/' component={Login} />
          </Switch>
        </div>
      </Router>
    </LoaderContext.Provider>
  )
}

export default App

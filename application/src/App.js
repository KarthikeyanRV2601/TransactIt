import React, { useEffect, useState } from 'react';


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signin from './Routes/signin';
import Signup from './Routes/signup';
import Home from './Routes/home';
import History from './Routes/history';
import {AuthProvider} from './contexts/AuthContext';


const App=()=>{


  return (
    <>
    <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/history' component={History}/>
          </Switch>
        </Router>
    </AuthProvider>
    </>
  );
}


export default App;
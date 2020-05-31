import React from 'react';
import { Switch , Route } from 'react-router-dom'; 

import './App.css';

import HomePage  from '../src/pages/homepage/homepage.component';
import ShopPage from '../src/pages/shop/shop.component';
import Header from '../src/components/header/header.component';
import SignInAndSignUpPage from '../src/pages/sign-in-sign-up/sign-in-sign-up.component'

import { auth } from '../src/firebase/firebase.utils'

class App extends React.Component {
  constructor() {
    super()

    this.state = { 
      currentUser : null
    }
  }  

  unsubscribeFromAuth = null

  componentDidMount() {
    auth.onAuthStateChanged( user => { 
      this.setState({currentUser : user})

      console.log(user)
    })
  }

  componentWillUnmount() { 
    this.unsubscribeFromAuth(); 
  }

  render() {
     return (
        <div>
        <Header currentUser={ this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/shop" component={ShopPage}/>  
          <Route path="/signin" component={SignInAndSignUpPage}/>  
        </Switch>
        </div>
    )
  }
  
}

export default App;

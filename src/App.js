import React from 'react';
import { Switch , Route } from 'react-router-dom'; 

import './App.css';

import { connect } from 'react-redux'

import HomePage  from '../src/pages/homepage/homepage.component';
import ShopPage from '../src/pages/shop/shop.component';
import Header from '../src/components/header/header.component';
import SignInAndSignUpPage from '../src/pages/sign-in-sign-up/sign-in-sign-up.component'
import { setCurrentUser } from '../src/redux/user/user.actions'

import { auth, createUserProfileDocument } from '../src/firebase/firebase.utils'

class App extends React.Component {
  
  unsubscribeFromAuth = null

  componentDidMount() {
    
    const { setCurrentUser } = this.props;


    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

    if (userAuth) {

      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
        setCurrentUser({
          currentUser: {
            id: snapShot.id,
            ...snapShot.data()
          }
        });
        console.log(this.state)
      });
    } else {
      setCurrentUser(userAuth);
    }

    });
  }

  componentWillUnmount() { 
    this.unsubscribeFromAuth(); 
  }

  render() {
     return (
        <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/shop" component={ShopPage}/>  
          <Route path="/signin" component={SignInAndSignUpPage}/>  
        </Switch>
        </div>
    )
  }
  
}

const mapDispatchToProps = dispatch => ({
   setCurrentUser : user => dispatch(setCurrentUser(user))
})


export default connect(null, mapDispatchToProps)(App);

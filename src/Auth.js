import React, {Component} from 'react';
var firebase = require('firebase');
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC6gkTLFn2wdS5vtuEwEaZHG3mDtMVKKao",
    authDomain: "react-firebase-a9ed1.firebaseapp.com",
    databaseURL: "https://react-firebase-a9ed1.firebaseio.com",
    projectId: "react-firebase-a9ed1",
    storageBucket: "react-firebase-a9ed1.appspot.com",
    messagingSenderId: "292245554492"
  };
  firebase.initializeApp(config);

class Auth extends Component {

  login(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email,password);
    promise
    .then(user=>{
      var lout= document.getElementById('logout');
      var err = "Thanks for logging in, "+ user.email;
      lout.classList.remove('hide')
      this.setState({err: err});
    });

    promise
    .catch(e =>{
      var err = e.message;
      this.setState({err});
    });
  }



    signup(){
      const email = this.refs.email.value;
      const password = this.refs.password.value;
      const auth = firebase.auth();

      const promise = auth.createUserWithEmailAndPassword(email, password);

      promise
      .then(user => {
        var err = "Welcome "+ user.email;
        firebase.database().ref('users/'+ user.uid).set({
          email: user.email
        });
        this.setState({err: err});
      });
      promise
      .catch(e => {
        var err = e.message;
        console.log(err);
        this.setState(({err: err}));
      });
    }


logout(){
    firebase.auth().signOut();
    var lout = document.getElementById('logout');
    lout.classList.add('hide');
    var err ='You are successfully logged out.';
    this.setState({err});
  }

    constructor(props){
    super(props);

    this.state = {
    err:''
    };
    this.login= this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
    }
    google(){
      var provider = new firebase.auth.GoogleAuthProvider();
      var promise = firebase.auth().signInWithPopup(provider);
      promise
      .then(result=>{
        var user = result.user;
        console.log(result);
        firebase.database().ref('users/'+user.uid).set({email:user.email, name:user.displayName});
          var err = "Thanks for logging in, "+ user.displayName;
          this.setState({err: err});
          var lout= document.getElementById('logout');
          lout.classList.remove('hide')

      });

      promise
      .catch(e=>{
        var msg = e.message;
          this.setState(({msg}));
      }

      )
    }

  render(){
    return(
      <div>
        <input id="email" ref="email" type="email" placeholder="Enter your email" /><br/>
        <input id="pass" ref="password" type="password" placeholder="Enter your password" /><br/>
        <p>{this.state.err}</p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button id="logout" className="hide" onClick={this.logout}>Log Out</button>
        <button id='google' className="google" onClick={this.google}>Sign In with Google</button>


      </div>
    );
  }
}
export default Auth;

import React, { Component } from "react";
import LoginForm from "./components/pages/LoginForm";
import User from "./components/pages/User"
import Search from "./components/pages/Search"
import SearchResults from "./components/pages/SearchResult"
import { Router, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import history from "./utils/history";
import SignUpForm from "./components/pages/SignupForm";
import axios from 'axios'
import Carousel from './components/pages/Carousel'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      email: null,
      firstName: null,
      lastName: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    console.log('userupdate is firing')
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          email: response.data.user.email,
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          email: null
        })
      }
    })
  }
  render() {
    console.log("PROPS HIGHER ", this.props)
  return (
    <>
    <Router history={history}>
    <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} email={this.state.email} firstName={this.state.firstName} lastName={this.state.lastName} />
    <Route exact path="/" component={Search} test="testing" history={history}/>
    <Route exact path="/search" component={SearchResults} history={history}/>
    <Route exact path="/profile" component={User} />
    <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />} /> 
    <Route exact path="/signup" component={SignUpForm} />
    <Route exact path='/slides' component={Carousel} />
      </Router>
    </>
  );
}
}

export default App;

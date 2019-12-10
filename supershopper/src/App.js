import React, { Component } from "react";
// import { Grid, Container, Menu, Image } from 'semantic-ui-react';
// import SelectedFoods from "./components/SelectedFoods/";
// import FoodSearch from "./components/FoodSearch/";
// import logo from "./assets/images/logo.png";
import LoginForm from "./components/LoginForm";
import User from "./components/pages/User"
import Search from "./components/pages/Search"
import SearchResults from "./components/pages/SearchResult"
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useAuth0 } from './contexts/auth0-context';
import Navbar from './components/Navbar';
import history from "./utils/history";
import SignUpForm from "./components/SignupForm";
import axios from 'axios'
import Carousel from './components/pages/Carousel'

// const fixedMenuStyle = {
//   backgroundColor: '#ececec',
//   border: '1px solid #ddd',
//   boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
// };

// class App extends Component {
  // state = {
  //   selectedFoods: []
  // };

  // removeFoodItem = itemIndex => {
  //   const filteredFoods = this.state.selectedFoods.filter(
  //     (item, idx) => itemIndex !== idx
  //   );
  //   this.setState({ selectedFoods: filteredFoods });
  // };

  // addFood = food => {
  //   const newFoods = this.state.selectedFoods.concat(food);
  //   this.setState({ selectedFoods: newFoods });
  // };


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

      {/* <Header />
      <div className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            {!isLoading && !user && (
              <>
                <h1>Please login below:</h1>
                <hr />
                <button onClick={loginWithRedirect} className="button is-danger">Login</button>
              </>
            )}
            {!isLoading && user && (
              <>
                <h1>You are logged in!</h1>
              </>
            )}
          </div>
        </div>
      </div> */}
      </Router>
    </>
  );
}
}

export default App;


//   render() {
//     return (
//       <Router>
//         <div>
        // <Route exact path="/user" component={Homepage} />
        // <Route exact path="/signup" component={SignupForm} />
//         </div>
//       </Router>
//       // <LoginForm />
//       // <div style={{ padding: '1.2em' }}>
        
//       //   <Menu borderless fixed="top" style={fixedMenuStyle}>
//       //     <Container fluid>
//       //       <Menu.Item>
//       //         <Image size="mini" src={logo} />
//       //       </Menu.Item>
//       //       <Menu.Item header style={{ fontSize: 22 }}>Super Holiday Shopper</Menu.Item>
//       //     </Container>
//       //   </Menu>

//       //   <Container fluid style={{ marginTop: '4.6em' }}>
//       //     <Grid divided="vertically">
//       //       <Grid.Row columns="2">
//       //         <Grid.Column>
//       //           <FoodSearch onFoodClick={this.addFood} />
//       //         </Grid.Column>
//       //         <Grid.Column>
//       //           <SelectedFoods foods={selectedFoods} onFoodClick={this.removeFoodItem} />
//       //         </Grid.Column>
//       //       </Grid.Row>
//       //     </Grid>
//       //   </Container>
//       // </div>
//     );
//   }
// }

// export default App;

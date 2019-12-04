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
import Header from './components/Header/Header';
import history from "./utils/history";
import SignUpForm from "./components/SignupForm";


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


function App() {
  return (
    <>
    <Router history={history}>
    <Route exact path="/" component={Search} />
    <Route exact path="/search" component={SearchResults} />
    <Route exact path="/profile" component={User} />
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/signup" component={SignUpForm} />

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

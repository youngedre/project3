import React, { Component } from "react";
import { Grid, Container, Menu, Image } from 'semantic-ui-react';
import ItemSearch from '../ItemSearch';
import SelectedFoods from '../SelectedFoods'
import logo from '../../assets/images/logo.png'
import Header from '../Header/Header'

const fixedMenuStyle = {
    backgroundColor: '#ececec',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
  };

class Homepage extends Component {
    state = {
      selectedFoods: []
    };
  
    removeFoodItem = itemIndex => {
      const filteredFoods = this.state.selectedFoods.filter(
        (item, idx) => itemIndex !== idx
      );
      this.setState({ selectedFoods: filteredFoods });
    };
  
    addFood = food => {
      const newFoods = this.state.selectedFoods.concat(food);
      this.setState({ selectedFoods: newFoods });
    };
    render(){
        const { selectedFoods } = this.state;
        return(
     <div style={{ padding: '1.2em' }}>
        
      <Header />

        <Container fluid style={{ marginTop: '4.6em' }}>
          <Grid divided="vertically">
            <Grid.Row columns="2">
              <Grid.Column>
                <ItemSearch onFoodClick={this.addFood} />
              </Grid.Column>
              <Grid.Column>
                <SelectedFoods foods={selectedFoods} onFoodClick={this.removeFoodItem} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>

        )
    }
}  
export default Homepage;
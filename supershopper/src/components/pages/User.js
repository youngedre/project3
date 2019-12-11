import React, { Component } from "react";
import { Grid, Container } from 'semantic-ui-react';
import ItemSearch from '../ItemSearch';
import SelectedFoods from '../SelectedFoods'


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
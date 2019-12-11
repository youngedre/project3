import React, { Component } from "react";
import { Grid, Container } from 'semantic-ui-react';
import ItemSearch from '../../ItemSearch';
import RecentSearch from '../../RecentSearch'


class Homepage extends Component {
    state = {
    };
  
    render(){
        return(
     <div style={{ padding: '1.2em' }}>
        
        <Container fluid style={{ marginTop: '4.6em' }}>
          <Grid divided="vertically">
            <Grid.Row columns="2">
              <Grid.Column>
                <ItemSearch />
              </Grid.Column>
              <Grid.Column>
                <RecentSearch />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>

        )
    }
}  
export default Homepage;
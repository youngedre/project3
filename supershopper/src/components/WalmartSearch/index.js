import PropTypes from 'prop-types'
import React, { Component } from 'react'
// import ItemSearch from '../ItemSearch';
import API from "../../utils/Api";
// import AmazonSearch from '../AmazonSearch'
// import WalmartSearch from '../WalmartSearch'
import { Button, Container, Card, Divider, Grid, Header, Input, Icon, ImageBackground, List, Menu, Table, Responsive, Segment, Sidebar, Visibility } from 'semantic-ui-react'
import GlobalHeader from '../Header/Header'

class WalmartSearch extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

//     state = {
//     items: [],
//     searchValue: ""
//   };
//   handleSearchChange = (e) => {
//     const value = e.target.value;

//     this.setState({
//       searchValue: value
//     }, function(){console.log(this.state.searchValue)});

//     if (value === "") {
//       this.setState({
//         items: []
//       });
//     } 
//   }
//   fetchFoods = (query) => {
//     // console.log("show me that you work")
//     API.search(query, result => {
//       const items = result
//       this.setState({ items }, function () {console.log(this.state.items)});
//     });
//   }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    
    const { children } = this.props
    // const { fixed, items } = this.state
    const walmartItems = this.props.data || [] //items.filter(item => item.storeSource === 'Walmart')
    const walmartItemRows = walmartItems.slice(0,10).map((item, idx) => (
      <Table.Row key={idx}>
        <Table.Cell className="right aligned">{item.title}</Table.Cell>
        <Table.Cell className="right aligned">{item.price}</Table.Cell>
        <Table.Cell className="right aligned" ><a href={item.itemLink} rel='noopener noreferrer' target='_blank'><img src={item.image} border = '0' alt='' height='150px' width='100px'/></a></Table.Cell>
        {/* <Table.Cell className="right aligned">{item.storeSource}</Table.Cell> */}
      </Table.Row>
    ));
return (
<>
<Card fluid color='yellow' style={{ marginBottom: '2em' }}>
<Card.Content header="Walmart Item Results"></Card.Content>
<Card.Content>
  <Table striped selectable fixed size="small" basic='very' style={{ marginBottom: '3em' }}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width="eight">Description</Table.HeaderCell>
        <Table.HeaderCell textAlign='right'>Price</Table.HeaderCell>
        <Table.HeaderCell textAlign='right'>Link</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {walmartItemRows}
    </Table.Body>
  </Table>
</Card.Content>
</Card>
      </>
      );
    }
  }
  
  export default WalmartSearch;
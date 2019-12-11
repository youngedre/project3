import React, { Component } from 'react'
import API from "../../utils/Api";
import { Card, Table } from 'semantic-ui-react'


class TargetSearch extends Component {
state = {
    items: [],
    searchValue: ""
  };
  handleSearchChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value
    }, function(){console.log(this.state.searchValue)});

    if (value === "") {
      this.setState({
        items: []
      });
    } 
  }
  fetchFoods = (query) => {
    // console.log("show me that you work")
    API.search(query, result => {
      const items = result
      this.setState({ items }, function () {console.log(this.state.items)});
    });
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    
    const targetItems = this.props.data || [] 
    const targetItemRows = targetItems.slice(0,10).map((item, idx) => (
      <Table.Row key={idx}>
        <Table.Cell className="right aligned">{item.title}</Table.Cell>
        <Table.Cell className="right aligned">{item.price}</Table.Cell>
        <Table.Cell className="right aligned" ><a href={item.itemLink} rel='noopener noreferrer' target='_blank'><img src={item.image} border = '0' alt='' height='150px' width='100px'/></a></Table.Cell>
      </Table.Row>
    ));
return (
<>
<Card fluid color='yellow' style={{ marginBottom: '2em' }}>
<Card.Content header="Target Item Results"></Card.Content>
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
      {targetItemRows}
    </Table.Body>
  </Table>
</Card.Content>
</Card>
      </>
      );
    }
  }
  
  export default TargetSearch;
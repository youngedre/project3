import React, { Component } from 'react'
import { Card, Table} from 'semantic-ui-react'


class WalmartSearch extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    
    let walmartItemRows;
    const walmartItems = this.props.data || []
    if(walmartItems.length > 0){
    walmartItemRows = walmartItems.slice(0,10).map((item, idx) => (
      <Table.Row key={idx}>
        <Table.Cell className="right aligned">{item.title}</Table.Cell>
        <Table.Cell className="right aligned">{item.price}</Table.Cell>
        <Table.Cell className="right aligned" ><a href={item.itemLink} rel='noopener noreferrer' target='_blank'><img src={item.image} border = '0' alt='' height='150px' width='100px'/></a></Table.Cell>
      </Table.Row>
    ))};
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
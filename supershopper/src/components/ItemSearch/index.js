import React from "react";
import { Card, Icon, Table } from 'semantic-ui-react';
import API from "../../utils/Api";

const MATCHING_ITEM_LIMIT = 25; 

//!!!!!!!!!!!!KEEP THIS FUNCTION TO PREVENT OVERLOAD!!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~
const debounce = (fn, delay) => {
  let timer = null;
  return function(...args) {
    const context = this;
    timer && clearTimeout(timer);
    timer = setTimeout(() => fn.apply(context, args), delay);
  };
};

class ItemSearch extends React.Component {
  state = {
    items: [],
    showRemoveIcon: false,
    searchValue: ""
  };

  constructor(props) {
    super(props);
    this.fetchFoods = debounce(this.fetchFoods, 1000);
  }

  handleSearchChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value
    });

    if (value === "") {
      this.setState({
        items: [],
        showRemoveIcon: false
      });
    } else {
      this.setState({
        showRemoveIcon: true
      });
      this.fetchFoods(value);
    }
  }

  fetchFoods = (query) => {
    console.log("show me that you work")
    API.search(query, result => {
      const items = result.slice(0, MATCHING_ITEM_LIMIT)
      this.setState({ items });
    });
  }

  handleSearchCancel = () => {
    this.setState({
      items: [],
      showRemoveIcon: false,
      searchValue: ""
    });
  };

  render() {
    const { showRemoveIcon, items } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: "hidden" };

    const itemRows = items.map((item, idx) => (
      <Table.Row key={idx} onClick={() => this.props.onFoodClick(item)}>
        <Table.Cell className="right aligned">{item.title}</Table.Cell>
        <Table.Cell className="right aligned">{Number(item.price).toFixed(2)}</Table.Cell>
        <Table.Cell className="right aligned" ><a href={item.itemLink}><img src={item.image} border = '0'/></a></Table.Cell>
        <Table.Cell className="right aligned">{item.storeSource}</Table.Cell>
      </Table.Row>
    ));

    return (
      <>
        <div className="ui fluid search">
          <div className="ui icon input">
            <input
              className="prompt"
              type="text"
              placeholder="Search products..."
              value={this.state.searchValue}
              onChange={this.handleSearchChange}
            />
            <i className="search icon" />
          </div>
          <i
            className="remove icon"
            onClick={this.handleSearchCancel}
            style={removeIconStyle}
          />
        </div>
        <Card fluid color='yellow' style={{ marginBottom: '2em' }}>
          <Card.Content header="Saved Items"></Card.Content>
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
                {itemRows}
              </Table.Body>
            </Table>
          </Card.Content>
          <Card.Content extra>
            {itemRows.length === 0 && <><Icon name='search' />No Saved Searches</>}
            {itemRows.length === 1 && <><Icon name='search' />1 Saved Search</>}
            {itemRows.length > 1 && <><Icon name='search' />{itemRows.length} Saved Searches</>}
          </Card.Content>
        </Card>
      </>
    );
  }
}

export default ItemSearch;

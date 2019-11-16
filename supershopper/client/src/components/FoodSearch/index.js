import React from "react";
import { Card, Icon, Table } from 'semantic-ui-react';
import API from "../../utils/Api";

const MATCHING_ITEM_LIMIT = 25; 

const debounce = (fn, delay) => {
  let timer = null;
  return function(...args) {
    const context = this;
    timer && clearTimeout(timer);
    timer = setTimeout(() => fn.apply(context, args), delay);
  };
};

class FoodSearch extends React.Component {
  state = {
    foods: [],
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
        foods: [],
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
    API.search(query, result => {
      const foods = result.slice(0, MATCHING_ITEM_LIMIT)
      this.setState({ foods });
    });
  }

  handleSearchCancel = () => {
    this.setState({
      foods: [],
      showRemoveIcon: false,
      searchValue: ""
    });
  };

  render() {
    const { showRemoveIcon, foods } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: "hidden" };

    const foodRows = foods.map((food, idx) => (
      <Table.Row key={idx} onClick={() => this.props.onFoodClick(food)}>
        <Table.Cell>{food.description}</Table.Cell>
        <Table.Cell className="right aligned">{food.kcal}</Table.Cell>
        <Table.Cell className="right aligned">{food.protein_g}</Table.Cell>
        <Table.Cell className="right aligned">{Number(food.fat_g).toFixed(2)}</Table.Cell>
        <Table.Cell className="right aligned">{food.carbohydrate_g}</Table.Cell>
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
                {foodRows}
              </Table.Body>
            </Table>
          </Card.Content>
          <Card.Content extra>
            {foodRows.length === 0 && <><Icon name='search' />No Saved Searches</>}
            {foodRows.length === 1 && <><Icon name='search' />1 Saved Search</>}
            {foodRows.length > 1 && <><Icon name='search' />{foodRows.length} Saved Searches</>}
          </Card.Content>
        </Card>
      </>
    );
  }
}

export default FoodSearch;

import React from "react";
import { Card, Icon, Table } from 'semantic-ui-react';

export default function SelectedFoods(props) {
  const { foods } = props;

  const foodRows = foods.map((food, idx) => (
    <Table.Row clickable="true" key={idx} onClick={() => props.onFoodClick(idx)}>
      <Table.Cell>{food.description}</Table.Cell>
      <Table.Cell textAlign='right'>{food.kcal}</Table.Cell>
      <Table.Cell textAlign='right'>{food.protein_g}</Table.Cell>
      <Table.Cell textAlign='right'>{Number(food.fat_g).toFixed(2)}</Table.Cell>
      <Table.Cell textAlign='right'>{food.carbohydrate_g}</Table.Cell>
    </Table.Row>
  ));

  return (
    <Card fluid color='red' style={{ marginTop: '3.6em' }}>
      <Card.Content header="Recent Searches"></Card.Content>
      <Card.Content>
        <Table striped selectable fixed size="small" basic='very'>
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
        {foodRows.length === 0 && <><Icon name='search' />No Recent Searches</>}
        {foodRows.length === 1 && <><Icon name='search' />1 Recent</>}
        {foodRows.length > 1 && <><Icon name='search' />{foodRows.length} Recent Searches</>}
      </Card.Content>
    </Card>
  );
}

function sum(foods, prop) {
  return foods
    .reduce((memo, food) => parseFloat(food[prop], 10) + memo, 0.0)
    .toFixed(2);
}

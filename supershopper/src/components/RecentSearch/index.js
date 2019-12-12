import React from "react";
import { Card, Icon, Table } from 'semantic-ui-react';

export default function SelectedItems(props) {

  const itemRows = 
   <Table.Row clickable="true">
      <Table.Cell> </Table.Cell>
      <Table.Cell textAlign='right'> </Table.Cell>
      <Table.Cell textAlign='right'> </Table.Cell>
    </Table.Row>
  ;

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
            {itemRows}
          </Table.Body>
        </Table>
      </Card.Content>
      <Card.Content extra>
        {itemRows.length === 0 && <><Icon name='search' />No Recent Searches</>}
        {itemRows.length === 1 && <><Icon name='search' />1 Recent</>}
        {itemRows.length > 1 && <><Icon name='search' />{itemRows.length} Recent Searches</>}
      </Card.Content>
    </Card>
  );
}
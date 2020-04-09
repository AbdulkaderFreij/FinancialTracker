/* eslint-disable no-multi-spaces */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Icon, Grid } from 'semantic-ui-react';

const TransactionsTable = (props) => (

  <Grid columns={7} textAlign="center">
    <Grid.Column>{props.id}</Grid.Column>
    <Grid.Column>{props.value.date}</Grid.Column>
    <Grid.Column>{props.value.type === 'Fixed Income' || props.value.type === 'Recurring Income' ? <Icon name='arrow left'/> : props.value.type === 'Fixed Expense' || props.value.type === 'Recurring Expense' ? <Icon name='arrow right'/> : null}</Grid.Column>
    <Grid.Column>{props.value.category}</Grid.Column>
    <Grid.Column>{props.value.type === 'Fixed Income' || props.value.type === 'Recurring Income' ? `+ ${props.value.amount}` : props.value.type === 'Fixed Expense' || props.value.type === 'Recurring Expense' ? `- ${props.value.amount}` : null }</Grid.Column>
    <Grid.Column>{props.value.currency}</Grid.Column>
    <Grid.Column><Button  icon floated="right" onClick={() => props.editTransaction(props.id)}> <Icon name='edit'/></Button> <Button  icon floated="right" onClick={() => props.deleteTransaction(props.id)}> <Icon name='delete'/></Button></Grid.Column>
  </Grid>

);

export default TransactionsTable;

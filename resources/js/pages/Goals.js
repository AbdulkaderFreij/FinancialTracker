import React, { Component } from 'react'
import GoalsTable from '../components/GoalsTable';
import { Button} from 'semantic-ui-react'
import {  List } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { Header, Image, Modal } from 'semantic-ui-react'
import { Form, Label } from 'semantic-ui-react'
// import  '../Transactions/Transactions.css';


const category = [
  { key: 'groceries', text: 'groceries', value: 'groceries' },
  { key: 'salary', text: 'salary', value: 'salary' },
  { key: 'rent', text: 'rent', value: 'rent' },
  { key: 'car loan', text: 'car loan', value: 'car loan' },
  { key: 'mobile bill', text: 'mobile bill', value: 'mobile bill' },
]

export default class Transactions extends Component {
    constructor(props){
        super(props);
        this.state = {
          list: [],
          date: '',
          description:'',
          amount:'',
          category:category,
          currency:'',
          editing: false,
          editingIndex: -1,
          isOpen: false
        }
      }

      handleOpen = () => {
        this.setState({ isOpen: true })
      }

      handleClose = () => {
      this.setState({ isOpen: false })
      }

       date = e => {
        e.preventDefault();
        this.setState({ date: e.target.value });
      };
      description = e => {
        e.preventDefault();
        this.setState({ description: e.target.value });
      };
      amount = e => {
        e.preventDefault();
        this.setState({ amount: e.target.value });
      };
      currency = e => {
        e.preventDefault();
        this.setState({ currency: e.target.value });
      };

      handleAddition = (e, { value }) => {
        this.setState((prevState) => ({
          category: [{ text: value, value }, ...prevState.category],
        }))
      }

      handleChange = (e, { value }) => this.setState({ currentValue: value })

      addGoal() {
        let newList = this.state.list;
        const input = {
          date: this.state.date,
          description:this.state.description,
          amount:this.state.amount,
          currency:this.state.currency,
          category:this.state.currentValue
        }
        console.log(input);
        newList.push(input);
            this.setState({ list: newList, isOpen:false, date: "", description: "", amount: "", currency: "", category:category });
      }

deleteGoal=(id)=> {
        console.log(id);
        let arr = this.state.list;
        const result = arr.filter((transaction, index) => index !== id);
        this.setState({ list: result });
      }

      editGoal = id => {
        const transaction = this.state.list.find((transaction,index) => index === id);
        console.log(id);
        this.setState({
          editing: true,
          isOpen:true,
          date: transaction.date,
          description: transaction.description,
          amount: transaction.amount,
          currency: transaction.currency,
          category: category,
          editingIndex: id
        });
      };
      updateGoal = () => {
        this.setState({
          list: this.state.list.map((transaction,index) =>
            index === this.state.editingIndex
              ? { ...transaction, date: this.state.date, description:this.state.description, amount:this.state.amount, currency:this.state.currency, category:this.state.currentValue }
              : transaction
          ),
          editing: false,
          isOpen:false,
          date: "",
          description: "",
          amount: "",
          currency: "",
          category: category
        });
      };

    render() {
        return (<>
            <div className="transaction-container">
              <div className="transaction-flex">
              <h1 className="transaction-item">Goals</h1>
              <div className="trigger-button">
                <Modal trigger={<Button content="New" icon='edit'/>} centered={false}             on='click'
            open={this.state.isOpen}
            onClose={this.handleClose}
            onOpen={this.handleOpen}>
                <Modal.Header>Goals</Modal.Header>
                <Modal.Content image>
      <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
      <Modal.Description>
        <Header>Set a Goal</Header>
        <Form onSubmit={event => {event.preventDefault();}}>
    <Form.Field>
      <input type = "date" value={this.state.date} onChange={e => this.date(e)} />
      <Label basic color='red' pointing>
        Please enter a date
      </Label>
    </Form.Field>
    <Form.Field>
    <Input type='text' placeholder='Enter description..' value={this.state.description} onChange={e=>this.description(e)}/>
      <Label basic color='red' pointing>
        Please enter a description
      </Label>
    </Form.Field>
    <Form.Field>
    <Dropdown
        options={this.state.category}
        placeholder='Choose a Category'
        search
        selection
        fluid
        allowAdditions
        value={this.state.currentValue}
        onAddItem={this.handleAddition}
        onChange={this.handleChange}
      />
    </Form.Field>
    <Form.Field>
      <input type='number' placeholder='Enter an amount' value = {this.state.amount} onChange = {e => this.amount(e)} />
      <Label basic color='red' pointing>
        Please enter an amount
      </Label>
    </Form.Field>
    <Form.Field>
      <input type='text' placeholder='Enter a currency' value = {this.state.currency} onChange = {e => this.currency(e)} />
      <Label basic color='red' pointing>
        Please enter a currency
      </Label>
    </Form.Field>
              {this.state.editing ? <Button negative onClick={ e => this.updateGoal() && this.handleClose }>Update</Button>  :  <Button positive onClick={ e => this.addGoal() && this.handleClose
              }>Add</Button>}
    </Form>
      </Modal.Description>
    </Modal.Content>
  </Modal>
  </div>
  </div>
         <div className="container__table">
    {this.state.list.map((goal, index) =>
<List key={index}>
<List.Item>
<GoalsTable
            id = {index}
            value = {goal}
            deleteGoal = {this.deleteGoal}
            editGoal = {this.editGoal}
          />
      </List.Item>
       <List.Item>
       </List.Item>
        </List>)
        }
               </div>
            </div>
                        </>
        )
    }
}

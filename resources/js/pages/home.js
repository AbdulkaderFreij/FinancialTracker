import React, { Component } from "react";
import { Transition, List, Grid, Icon, Table} from "semantic-ui-react";
import "./Transactions.css";
import {getTransactions} from '../../js/api/functionsList';
import { getCategories,  getCurrencies } from '../api/functionsList';
import {useAuth} from '../context/auth';

const WelcomeUser = () => {
  let { currentUser } = useAuth();
  return(<div className="container p-2 mx-auto flex flex-col">
  <h1>Welcome back {currentUser.name}</h1>
</div>)
}

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          list: [],
          start_date: new Date(),
          end_date: null,
          type: "",
          amount: "",
          title:"",
          description:"",
          interval: "",
          categories: [],
          currencies: [],
        };
      }

      componentDidMount(){
        this.getAll();
    }

    getAll= async() => {
        const categories =  await getCategories();
        const currencies = await getCurrencies();
        console.log(currencies);
        console.log(categories);
         getTransactions().then(data=>{
             this.setState({start_date:'',end_date:'',type:'',amount:'',title:'',description:'',interval:'', list:[...data], categories, currencies}, ()=>console.log(this.state.list))
         })
       }

  render() {
    function sumProperty(arr) {
      return arr.reduce((total, obj) => {
        if (typeof obj["type"] === "string") 
        {
          if (obj["type"] === "Fixed Income" || obj["type"] === "Recurring Income")
            return total + obj["amount"];
          else return total - obj["amount"];
        }
        return total;
      }, 0);
    }
    let totalAmount = sumProperty(this.state.list).toFixed(2);
    console.log(totalAmount);

    function sumIncome(arr) {
      return arr.reduce((total, obj) => {
        console.log( "income", obj["type"]);
        if (typeof obj["type"] === "string") 
        {
          if (obj["type"] === "Fixed Income" || obj["type"] === "Recurring Income")
          {
            console.log(total + obj["amount"])
            return total + Number(obj["amount"]);
          }
          else return total;
        }
        else return total;
      }, 0);
    }
    let totalIncome = sumIncome(this.state.list).toFixed(2);
    console.log(totalIncome);

    function sumExpense(arr) {
      return arr.reduce((total, obj) => {
        if (typeof obj["type"] === "string") 
        {
          if (obj["type"] === "Fixed Expense" || obj["type"] === "Recurring Expense")
            return total + obj["amount"];
          else return total;
        }
        else return total;
      }, 0);
    }
    let totalExpense = sumExpense(this.state.list).toFixed(2);
    console.log(totalExpense);

    return (
      <>
      <WelcomeUser/>
        <div className="transaction-container">
          <div className="transaction-flex">
            <h1 className="transaction-item">Transactions</h1>
          </div>
          <div className="container__table">
          <Table celled compact definition>
    <Table.Header fullWidth>
      <Table.Row>
        <Table.HeaderCell>SN</Table.HeaderCell>
        <Table.HeaderCell>Start Date</Table.HeaderCell>
        <Table.HeaderCell>End Date</Table.HeaderCell>
        <Table.HeaderCell>Interval</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Category</Table.HeaderCell>
        <Table.HeaderCell>amount</Table.HeaderCell>
        <Table.HeaderCell>Currency</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    
            {this.state.list.map((transaction) => (
                <Table.Body key={transaction.id}>
        <Table.Row>
     <Table.Cell> {transaction.id} </Table.Cell>
     <Table.Cell>{transaction.start_date}</Table.Cell>
     <Table.Cell>{transaction.end_date}</Table.Cell>
     <Table.Cell>{transaction.interval}</Table.Cell>
     <Table.Cell>{transaction.type}</Table.Cell>
     <Table.Cell>{transaction.categories_id.name}</Table.Cell>
     <Table.Cell>{transaction.amount}</Table.Cell>
     <Table.Cell>{transaction.currencies_id.code}</Table.Cell>
  </Table.Row>
  </Table.Body>
  ))}
  </Table>
          </div>
        </div>
        <div className="total-amount">
        <Table celled compact definition collapsing>
    <Table.Header fullWidth>
      <Table.Row>
        <Table.HeaderCell>Total Income</Table.HeaderCell>
        <Table.HeaderCell>Total Expense</Table.HeaderCell>
        <Table.HeaderCell>Savings</Table.HeaderCell>
        </Table.Row>
    </Table.Header>
    <Table.Body>
            <Table.Cell> {totalIncome} </Table.Cell>
            <Table.Cell> {totalExpense} </Table.Cell>
            <Table.Cell> {totalAmount} </Table.Cell>
    </Table.Body>
    </Table>
        </div>
      </>
    );
  }
}


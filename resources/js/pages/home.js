import React, { Component } from "react";
import { Transition, List, Grid, Icon} from "semantic-ui-react";
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

    getAll=async () => {
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
          <Transition.Group animation='scale' duration={500}>
            {this.state.list.map((transaction) => (
              <List key={transaction.id}>
                <List.Item>
                <Grid columns={7} textAlign="center">
    {JSON.stringify(transaction.value)}
    <Grid.Column>{transaction.id}</Grid.Column>
    <Grid.Column>{transaction.title}</Grid.Column>
    <Grid.Column>{transaction.type === 'Fixed Income' || transaction.type === 'Recurring Income' ? <Icon name='arrow left'/> : transaction.type === 'Fixed Expense' || transaction.type === 'Recurring Expense' ? <Icon name='arrow right'/> : null}</Grid.Column>
    <Grid.Column>{transaction.categories_id.name}</Grid.Column>
    <Grid.Column>{transaction.type === 'Fixed Income' || transaction.type === 'Recurring Income' ? `+ ${transaction.amount}` : transaction.type === 'Fixed Expense' || transaction.type === 'Recurring Expense' ? `- ${transaction.amount}` : null }</Grid.Column>
    <Grid.Column>{transaction.currencies_id.symbol}</Grid.Column>
  </Grid>
                </List.Item>
              </List>
            ))}
            </Transition.Group>
          </div>
        </div>
        <div className="total-amount">
        <h2>Total Income:{totalIncome}</h2>
        <h2>Total Expense:{totalExpense}</h2>
        <h2>Savings:{totalAmount}</h2>
        </div>
      </>
    );
  }
}


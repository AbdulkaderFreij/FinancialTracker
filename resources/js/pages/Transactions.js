import React, { Component } from "react";
import TransactionsTable from "../components/TransactionsTable";
import { Header, Image, Modal, Transition,Form, Dropdown, Input, List, Button} from "semantic-ui-react";
import "./Transactions.css";
import {getTransactions, addItemTransaction, deleteItemTransaction, updateItemTransaction} from '../../js/api/functionsList';
import logo from '../images/logo.svg';
import { getCategories, addItemCategory, getCurrencies } from '../api/functionsList';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// const category = [
//   { key: "groceries", text: "groceries", value: "groceries" },
//   { key: "salary", text: "salary", value: "salary" },
//   { key: "rent", text: "rent", value: "rent" },
//   { key: "car loan", text: "car loan", value: "car loan" },
//   { key: "mobile bill", text: "mobile bill", value: "mobile bill" }
// ];
// const currency = [
//   { key: "USD", currency: "USD", value: "USD", text: "USD", symbol: "$" },
//   { key: "EUR", currency: "EUR", value: "EUR", text: "EUR", symbol: "€" },
//   { key: "JPY", currency: "JPY", value: "JPY", text: "JPY", symbol: "¥" }
// ];

export default class Transactions extends Component {
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
          isRecurring: false,
          categories: [],
          currencies: [],
          editing: false,
          editingIndex: -1,
          isOpen: false,
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

      handleOpen = () => {
        this.setState({ isOpen: true });
      };

      handleClose = () => {
        this.setState({ isOpen: false });
      };

      startDate = date => {
        this.setState({
          start_date: date
        });
      };


    endDate = date => {
        this.setState({
          end_date: date
        });
      };

      type = e => {
        e.preventDefault();
        this.setState({ type: e.target.value });
        console.log("type", e.target.value);
        e.target.value === "Recurring Income" || e.target.value === "Recurring Expense" ? this.setState({isRecurring: true}) : this.setState({isRecurring:false})
      };
      amount = e => {
        e.preventDefault();
        this.setState({ amount: e.target.value });
      };

      title = e => {
        e.preventDefault();
        this.setState({ title: e.target.value });
      };

      description = e => {
        e.preventDefault();
        this.setState({ description: e.target.value });
      };

      interval = e => {
        e.preventDefault();
        this.setState({ interval: e.target.value });
      };

      handleAddition = async (e, { value }) => {
          const category = await addItemCategory(value);

        this.setState(prevState => ({
          categories: [{ key: category.id, text: category.name, value: category.id }, ...prevState.categories]
        }));
      };

      handleChange = (e, { value }) => this.setState({ currentValue: value });

      handleChangeCurrency = (e, { value }) =>
        this.setState({ currentValueCurrency: value });


        addTransaction(){
          addItemTransaction(this.state.title,this.state.description,this.state.start_date,this.state.end_date,this.state.type,this.state.amount,this.state.interval,this.state.currentValueCurrency,this.state.currentValue ).then(()=>{
              this.getAll()
          })
          this.setState({isOpen: false,start_date: "",end_date: "",type: "",amount: "",title:"",description:"",interval:""})
      }


          deleteTransaction=(id)=>{
            deleteItemTransaction(id)
            this.getAll();
        }

      editTransaction = id => {
        const transaction = this.state.list.find(
          (transaction) => transaction.id === id
        );
        console.log(id);
        this.setState({
          editing: true,
          isOpen: true,
          start_date: new Date(transaction.start_date),
          end_date: transaction.end_date !== null? new Date(transaction.end_date): null,
          type: transaction.type,
          amount: transaction.amount,
          title:transaction.title,
          description:transaction.description,
          interval: transaction.interval,
          currency: currency,
          editingIndex: id
        });
      };


      updateTransaction=()=>{
        updateItemTransaction(this.state.title,this.state.description,this.state.start_date.toLocaleDateString(),this.state.end_date,this.state.type,this.state.amount,this.state.interval,this.state.currentValueCurrency,this.state.currentValue,this.state.editingIndex).then(()=>{
            this.getAll();
        })
        this.setState({ editing: false, isOpen: false,start_date: "",end_date: "",type: "",amount: "",title:"",description:"",interval:""})
        this.getAll();
    }
  render() {
    function sumProperty(arr) {
      return arr.reduce((total, obj) => {
        if (typeof obj["type"] === "string") {
         // console.log( obj["type"]);
          if (
            obj["type"] === "Fixed Income" ||
            obj["type"] === "Recurring Income"
          )
            return total + obj["amount"];
          else return total - obj["amount"];
        }
        return total;// + obj[type];
      }, 0);
    }
    let totalAmount = sumProperty(this.state.list).toFixed(2);
    console.log(totalAmount);

    function sumIncome(arr) {
      return arr.reduce((total, obj) => {
        console.log( "income", obj["type"]);
        if (typeof obj["type"] === "string") {
          if (
            obj["type"] === "Fixed Income" ||
            obj["type"] === "Recurring Income"
          ){
            console.log(total + obj["amount"])
            return total + Number(obj["amount"]);
          }
           // return total + Number(obj["amount"]);
          else return total;
        }
        else
        return total ;//+ obj[type];
      }, 0);
    }
    let totalIncome = sumIncome(this.state.list).toFixed(2);
    console.log(totalIncome);

    function sumExpense(arr) {
      return arr.reduce((total, obj) => {
        if (typeof obj["type"] === "string") {
          if (
            obj["type"] === "Fixed Expense" ||
            obj["type"] === "Recurring Expense"
          )
            return total + obj["amount"];
          else return total;
        }
        else
        return total;// + obj[type];
      }, 0);
    }
    let totalExpense = sumExpense(this.state.list).toFixed(2);
    console.log(totalExpense);

    return (
      <>
        <div className="transaction-container">
          <div className="transaction-flex">
            <h1 className="transaction-item">Transactions</h1>
            <div className="trigger-button">
              <Modal
                trigger={<Button content="New" icon="edit" />}
                centered={false}
                on="click"
                open={this.state.isOpen}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
              >
                <Modal.Header>Transactions</Modal.Header>
                <Modal.Content image>
                  <Image
                    wrapped
                    size="medium"
                    src={logo}
                  />
                  <Modal.Description>
                    <Header>Add a Transaction</Header>
                    <Form
                      onSubmit={event => {
                        event.preventDefault();
                      }}
                    >
                      {/* <Form.Field>
                        <input
                        placeholder="Enter Start Date"
                          type="datetime-local"
                          value={this.state.start_date}
                          onChange={e => this.startDate(e)}/>
                      </Form.Field> */}

                      {/* */}
                       <Form.Field>
                       <DatePicker
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Click to select a date"
                        selected={this.state.start_date}
                        onChange={e => this.startDate(e)}/>
                      </Form.Field>

                      <Form.Field>
                       <DatePicker
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Click to select a date"
                        selected={this.state.end_date}
                        onChange={e => this.endDate(e)}/>
                      </Form.Field>

                      <Form.Field>
                        <Input
                          list="type"
                          placeholder="Choose type..."
                          value={this.state.type}
                          onChange={e => this.type(e)}
                        />
                        <datalist id="type">
                          <option value="Fixed Income" />
                          <option value="Recurring Income" />
                          <option value="Fixed Expense" />
                          <option value="Recurring Expense" />
                        </datalist>

                      </Form.Field>
                      {this.state.isRecurring ? (<Form.Field>
                        <input
                          type="number"
                          placeholder="Enter an interval"
                          value={this.state.interval}
                          onChange={e => this.interval(e)}
                        />

                      </Form.Field>) : null}
                        <Form.Field>
                        <Dropdown
                          options={this.state.categories}
                          placeholder="Choose a Category"
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
                        <input
                          type="number"
                          placeholder="Enter an amount"
                          value={this.state.amount}
                          onChange={e => this.amount(e)}
                        />
                      </Form.Field>

                      <Form.Field>
                        <input
                          type="text"
                          placeholder="Enter a title"
                          value={this.state.title}
                          onChange={e => this.title(e)}
                        />
                      </Form.Field>

                      <Form.Field>
                        <input
                          type="text"
                          placeholder="Enter a description"
                          value={this.state.description}
                          onChange={e => this.description(e)}
                        />
                      </Form.Field>

                      <Form.Field>
                        <Dropdown
                          options={this.state.currencies}
                          placeholder="Choose a currency"
                          search
                          selection
                          fluid
                          value={this.state.currentValueCurrency}
                          onChange={this.handleChangeCurrency}
                        />
                      </Form.Field>
                      {this.state.editing ? (
                        <Button
                          negative
                          onClick={() =>
                            this.updateTransaction() && this.handleClose
                          }
                        >
                          Update
                        </Button>
                      ) : (
                        <Button
                          positive
                          onClick={() =>
                            this.addTransaction() && this.handleClose
                          }
                        >
                          Add
                        </Button>
                      )}
                    </Form>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </div>
          </div>
          <div className="container__table">
          <Transition.Group animation='scale' duration={500}>
            {this.state.list.map((transaction) => (
              <List key={transaction.id}>
                <List.Item>
                  <TransactionsTable id={transaction.id} value={transaction} deleteTransaction={this.deleteTransaction} editTransaction={this.editTransaction} />
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

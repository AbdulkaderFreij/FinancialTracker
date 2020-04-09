import React, { Component } from "react";
import TransactionsTable from "../components/TransactionsTable";
import { Header, Image, Modal, Transition,Form, Dropdown, Input, List, Button} from "semantic-ui-react";
import "./Transactions.css";
import {getTransactions, addItemTransaction, deleteItemTransaction, updateItemTransaction} from '../../js/api/functionsList';

const category = [
  { key: "groceries", text: "groceries", value: "groceries" },
  { key: "salary", text: "salary", value: "salary" },
  { key: "rent", text: "rent", value: "rent" },
  { key: "car loan", text: "car loan", value: "car loan" },
  { key: "mobile bill", text: "mobile bill", value: "mobile bill" }
];
const currency = [
  { key: "USD", currency: "USD", value: "USD", text: "USD", symbol: "$" },
  { key: "EUR", currency: "EUR", value: "EUR", text: "EUR", symbol: "€" },
  { key: "JPY", currency: "JPY", value: "JPY", text: "JPY", symbol: "¥" }
];

export default class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
          list: [],
          start_date: "",
          end_date:"",
          type: "",
          amount: "",
          title:"",
          description:"",
          interval: "",
          isRecurring: false,
          category: category,
          currency: currency,
          editing: false,
          editingIndex: -1,
          isOpen: false
        };
      }

      componentDidMount(){
        this.getAll();
    }


    getAll= () => {
      getTransactions().then(data=>{
          this.setState({start_date:'',end_date:'',type:'',amount:'',title:'',description:'',interval:'',category:category, currency:currency, list:[...data]}, ()=>console.log(this.state.list))
      })
    }

      handleOpen = () => {
        this.setState({ isOpen: true });
      };

      handleClose = () => {
        this.setState({ isOpen: false });
      };

      startDate = e => {
        e.preventDefault();
        this.setState({ start_date: e.target.value });
      };

      endDate = e => {
        e.preventDefault();
        this.setState({ end_date: e.target.value });
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

      handleAddition = (e, { value }) => {
        this.setState(prevState => ({
          category: [{ text: value, value }, ...prevState.category]
        }));
      };

      handleChange = (e, { value }) => this.setState({ currentValue: value });
      handleChangeCurrency = (e, { value }) =>
        this.setState({ currentValueCurrency: value });


        addTransaction(){
          addItemTransaction(this.state.title,this.state.description,this.state.start_date,this.state.end_date,this.state.type,this.state.amount,this.state.interval,this.state.currentValueCurrency,this.state.currentValue ).then(()=>{
              this.getAll()
          })
          this.setState({isOpen: false,start_date: "",end_date: "",type: "",amount: "",title:"",description:"",interval:"",currency: currency,category: category})
      }


      // addTransaction() {
      //   let newList = this.state.list;
      //   const input = {
      //     title:this.state.title,
      //     description:this.state.description,
      //     start_date: this.state.start_date,
      //     end: this.state.end_date,
      //     type: this.state.type,
      //     amount: this.state.amount,
      //     interval:this.state.interval,
      //     currency: this.state.currentValueCurrency,
      //     category: this.state.currentValue
      //   };
      //   console.log(input);
      //   newList.push(input);
      //   this.setState({
      //     list: newList,
      //     isOpen: false,
      //     start_date: "",
      //     end_date: "",
      //     type: "",
      //     amount: "",
      //     title:"",
      //     description:"",
      //     interval:"",
      //     currency: currency,
      //     category: category
      //   });
      // }

      // deleteTransaction = id => {
      //   console.log(id);
      //   let arr = this.state.list;
      //   const result = arr.filter((transaction, index) => index !== id);
      //   this.setState({ list: result });
      // };

          deleteTransaction=(id)=>{
            deleteItemTransaction(id)
            this.getAll();
        }

      editTransaction = id => {
        const transaction = this.state.list.find(
          (transaction, index) => index === id
        );
        console.log(id);
        this.setState({
          editing: true,
          isOpen: true,
          start_date: transaction.start_date,
          end_date: transaction.end_date,
          type: transaction.type,
          amount: transaction.amount,
          title:transaction.title,
          description:transaction.description,
          interval: transaction.interval,
          currency: currency,
          category: category,
          editingIndex: id
        });
      };
      // updateTransaction = () => {
      //   this.setState({
      //     list: this.state.list.map((transaction, index) =>
      //       index === this.state.editingIndex
      //         ? {
      //             ...transaction,
      //             start_date: this.state.start_date,
      //             end_date: this.state.end_date,
      //             type: this.state.type,
      //             amount: this.state.amount,
      //             title:this.state.title,
      //             description:this.state.description,
      //             interval:this.state.interval,
      //             currency: this.state.currentValueCurrency,
      //             category: this.state.currentValue
      //           }
      //         : transaction
      //     ),
      //     editing: false,
      //     isOpen: false,
      //     start_date: "",
      //     end_date: "",
      //     type: "",
      //     title:"",
      //     description:"",
      //     amount: "",
      //     interval:"",
      //     currency: currency,
      //     category: category
      //   });
      // };


      updateTransaction=()=>{
        updateItemTransaction(this.state.title, this.state.id,this.state.title,this.state.description,this.state.start_date,this.state.end_date,this.state.type,this.state.amount,this.state.interval,this.state.currentValueCurrency,this.state.currentValue).then(()=>{
            this.getAll();
        })
        this.setState({ editing: false, isOpen: false,start_date: "",end_date: "",type: "",amount: "",title:"",description:"",interval:"",currency: currency,category: category })
        this.getAll();
    }
  render() {
    function sumProperty(arr, type) {
      return arr.reduce((total, obj) => {
        if (typeof obj[type] === "string") {
          if (
            obj["type"] === "Fixed Income" ||
            obj["type"] === "Recurring Income"
          )
            return total + Number(obj[type]);
          else return total - Number(obj[type]);
        }
        return total + obj[type];
      }, 0);
    }
    let totalAmount = sumProperty(this.state.list, "amount").toFixed(2);
    console.log(totalAmount);

    function sumIncome(arr, type) {
      return arr.reduce((total, obj) => {
        if (typeof obj[type] === "string") {
          if (
            obj["type"] === "Fixed Income" ||
            obj["type"] === "Recurring Income"
          )
            return total + Number(obj[type]);
          else return total;
        }
        return total + obj[type];
      }, 0);
    }
    let totalIncome = sumIncome(this.state.list, "amount").toFixed(2);
    console.log(totalIncome);

    function sumExpense(arr, type) {
      return arr.reduce((total, obj) => {
        if (typeof obj[type] === "string") {
          if (
            obj["type"] === "Fixed Expense" ||
            obj["type"] === "Recurring Expense"
          )
            return total - Number(obj[type]);
          else return total;
        }
        return total + obj[type];
      }, 0);
    }
    let totalExpense = sumExpense(this.state.list, "amount").toFixed(2);
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
                    src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
                  />
                  <Modal.Description>
                    <Header>Add a Transaction</Header>
                    <Form
                      onSubmit={event => {
                        event.preventDefault();
                      }}
                    >
                      <Form.Field>
                        <input
                        placeholder="Enter Start Date"
                          type="datetime-local"
                          value={this.state.start_date}
                          onChange={e => this.startDate(e)}/>
                      </Form.Field>


                      <Form.Field>
                        <input
                        placeholder="Enter End Date"
                          type="datetime-local"
                          value={this.state.end_date}
                          onChange={e => this.endDate(e)}
                        />
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
                          options={this.state.category}
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
                          options={this.state.currency}
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
                          onClick={e =>
                            this.updateTransaction() && this.handleClose
                          }
                        >
                          Update
                        </Button>
                      ) : (
                        <Button
                          positive
                          onClick={e =>
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
            {this.state.list.map((transaction, index) => (
              <List key={index}>
                <List.Item>
                  <TransactionsTable
                    id={index}
                    value={transaction}
                    deleteTransaction={this.deleteTransaction}
                    editTransaction={this.editTransaction}
                  />
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

import React, { Component } from 'react';
import {Form, Button, Dropdown} from "semantic-ui-react";
import { getCategories, addItemCategory, getCurrencies,updateItemCategory, deleteItemCategory } from '../api/functionsList';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currencies: [],
      name: "",
      editing: false,
      editingIndex: -1,
    };
    this.onSubmit=this.onSubmit.bind(this);
    this.onChange=this.onChange.bind(this);
}

componentDidMount(){
    this.getAll()
}

onChange=e=>{
    this.setState({[e.target.name]:e.target.value})
}

handleChangeCurrency = (e, { value }) =>
this.setState({ currentValueCurrency: value });

getAll= async()=>{
    const currencies = await getCurrencies();
    getCategories().then(data=>{
        this.setState({name:'', categories:[...data]}, ()=>console.log(this.state.categories))
    })
}

onSubmit=(e)=>{
    e.preventDefault();
    addItemCategory(this.state.name).then(()=>{
        this.getAll()
    })
    this.setState({name:''})
}

onUpdate=(e)=>{
    e.preventDefault();
    updateItemCategory(this.state.name, this.state.id).then(()=>{
        this.getAll();
    })
    this.setState({
        name:'',
        editing:''
    })
    this.getAll();
}

onEdit=(itemid,e)=>{
    e.preventDefault();
    const data=[...this.state.categories]
    data.forEach((value,index)=>{
        if(value.key===itemid){
            this.setState({
                key:value.key,
                name: value.name,
                editing:true,
            })
        }
    })
}

onDelete=(val,e)=>{
    e.preventDefault();
    deleteItemCategory(val)
    this.getAll();
}

  render () {
    return (
    <>
        <h1 className="container p-10 mx-auto">Here you can change currency and add categories.</h1>
        <div className="container p-10 mx-auto flex flex-row">
        <Form onSubmit= {this.handleAddition}>
       <Form.Field width= 'sixteen'>
         <label>Add Category</label>
         <input type="text" className="form-control" id="name" name="name" value={this.state.name || ""} onChange={this.onChange.bind(this)}/>
       </Form.Field>
       {!this.state.editing ? (
                        <Button primary onClick={this.onSubmit.bind(this)} type="submit">Submit</Button>
                    ) : ""}

                    {this.state.editing ? (
                        <Button secondary onClick={this.onUpdate.bind(this)} type="submit">Update</Button>
                    ):""}
       </Form>
       <Form className="pl-20 pt-1 font-bold">
         Change Currency
       <Form.Field width= 'sixteen'>
         <Dropdown options={this.state.currencies} placeholder="Choose a currency" search selection fluid value={this.state.currentValueCurrency} onChange={this.handleChangeCurrency}/>
       </Form.Field>
       <Button primary type='submit'>Submit</Button>
       </Form>
      </div>
      <table className="table">
                    <tbody>
                        {this.state.categories.map((value, index)=>(
                            <tr key={index}>
                                <td className="text-left">
                                    {value.name} {JSON.stringify(value)}

                                </td>
                                <td className="text-right">
                                    <button className="btn btn-info ar-1" href="" disable={this.state.editing.toString()} onClick={this.onEdit.bind(this, value.key)}>Edit</button>
                                    <button className="btn btn-danger" href="" disable={this.state.editing.toString()} onClick={this.onDelete.bind(this, value.key)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
     </>
    );
  }
}

export default Profile;

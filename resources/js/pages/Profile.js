import React, { Component } from 'react';
import {Form, Button, Dropdown} from "semantic-ui-react";
import { getCategories, addItemCategory, getCurrencies,updateItemCategory, deleteItemCategory } from '../api/functionsList';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      name: "",
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

getAll= async()=>{
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


onDelete=(val,e)=>{
    e.preventDefault();
    deleteItemCategory(val)
    this.getAll();
}

  render () {
    return (
    <>
        <h1 className="container p-10 mx-auto">Here you can add categories.</h1>
        <div className="container p-10 mx-auto flex flex-row">
        <Form onSubmit= {this.handleAddition}>
       <Form.Field width= 'sixteen'>
         <label>Add Category</label>
         <input type="text" className="form-control" id="name" name="name" value={this.state.name || ""} onChange={this.onChange.bind(this)}/>
       </Form.Field>
        <Button primary onClick={this.onSubmit.bind(this)} type="submit">Submit</Button>
       </Form>
      </div>
      <table className="table">
                    <tbody>
                        {this.state.categories.map((value, index)=>(
                            <tr key={index}>
                                <td className="text-left">
                                {value.id} - {value.name}

                                </td>
                                <td className="text-right">
                                    <Button secondary className="btn btn-danger"  onClick={this.onDelete.bind(this, value.id)}>Delete</Button>
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

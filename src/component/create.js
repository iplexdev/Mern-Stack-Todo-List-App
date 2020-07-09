import React, { Component } from 'react'
import axios from 'axios';
import { NotificationManager } from 'react-notifications'
export default class Create extends Component {
    constructor(props) {
        super(props)
        // binding method's
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.state ={
            todo_name: '',
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            formErrors: {
                todo_name: '',
                todo_description: '',
                todo_responsible: '',
            },
            todoNameValid:false,
            todoDescriptionValid: false,
            todoResponsibleValid: false,
            formValid: false,
        }
    }
    onChangeTodoPriority(proi) {
        this.setState({
            todo_priority: proi.target.value
        })
    }
    // ON CHANGE HANDLER
    onChangeHandler(event) {
        const name = event.target.name;
        const value = event.target.value
        this.setState({
            [name]: value
        },() => {
            this.validateFields(name, value)
        })
    }
    // VALIDATE FIELDS.....
    validateFields(fieldName, value) {     
        console.log('checing field name', fieldName);
        
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.todoNameValid;
        let descriptionValid = this.state.todoDescriptionValid;
        let reponsibleValid = this.state.todoResponsibleValid;

        // using switch statement to validate with name
        switch (fieldName) {
            case 'todo_name':
                nameValid = value.match(/^[a-zA-Z ]*$/);
                fieldValidationErrors.todo_name = nameValid ? '' : 'is invalid';
                break;
                case 'todo_description':
                descriptionValid = value.match(/^[a-zA-Z ]*$/);
                fieldValidationErrors.todo_description = descriptionValid ? '' : 'is invalid';
                break;
                case 'todo_responsible':
                reponsibleValid = value.match(/^[a-zA-Z ]*$/);
                fieldValidationErrors.todo_responsible = reponsibleValid ? '' : 'is invalid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            todoNameValid: nameValid,
            todoDescriptionValid: descriptionValid,
            todoResponsibleValid: reponsibleValid
        }, this.validateForm)
        
    }
    // Validate From .....
    validateForm() {
        this.setState({
            formValid: this.state.todoNameValid && this.state.todoDescriptionValid && this.state.todoResponsibleValid
        })    
    }
    onSubmit(values) {
        values.preventDefault(); 
        const newOrder = {
            todo_name :this.state.todo_name,
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority
        }
        axios.post('http://localhost:4000/todos/add',newOrder).then(
            res => {
                this.setState({
                    todo_name: '',
                    todo_description: '',
                    todo_responsible: '',
                    todo_priority: ''
                })
                this.props.history.push('/');
                NotificationManager.success('You have added a new Order!', 'Successful!', 2000);
            }
            ).catch(err => {
                console.log('Error created new Order', err);
                NotificationManager.error('Error while Creating new Order!', 'Error!');
            })
    }
    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }
    render() {
        // for Internal styling
            const container = {
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            marginTop:10,
            flexDirection:'column',            
            };
            const form_btn = {
                cursor: 'not-allowed',
                pointerEvents: "all !important",
            };
            const no_class = {

            };
        return (
            <div style={container}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                        <label>Name: </label>
                             <input  type="text"
                                className="form-control"
                                name="todo_name"
                                value={this.state.todo_name}
                                onChange={this.onChangeHandler}
                                required
                            />
                    </div>
        <div className="errorMsg" style={{color: 'red'}}>{this.state.formErrors.todo_name}</div>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                name="todo_description"
                                value={this.state.todo_description}
                                onChange={this.onChangeHandler}
                                required
                                />
                    </div>
                    <div className="errorMsg" style={{color: 'red'}}>{this.state.formErrors.todo_description}</div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                name="todo_responsible"
                                value={this.state.todo_responsible}
                                onChange={this.onChangeHandler}
                                required
                                />
                    </div>
                    <div className="errorMsg" style={{color: 'red'}}>{this.state.formErrors.todo_responsible}</div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.todo_priority==='Low'} 
                                    onChange={this.onChangeTodoPriority}
                                    required
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.todo_priority==='Medium'} 
                                    onChange={this.onChangeTodoPriority}
                                    required
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.todo_priority==='High'} 
                                    onChange={this.onChangeTodoPriority}
                                    required
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" style={!this.state.formValid?form_btn:no_class} disabled={!this.state.formValid}  className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

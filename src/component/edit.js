import React, { Component } from 'react'
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
export default class Edit extends Component {
    constructor(props) {
        super(props)
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.state ={
            todo_name: '',
            todo_description: '',
            todo_responsible: '',
            todo_priority: ''
        }
    }
    componentDidMount(){
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                todo_name: response.data.todo_name,
                todo_description: response.data.todo_description,
                todo_responsible: response.data.todo_responsible,
                todo_priority: response.data.todo_priority
            })
        }).catch(err => {
            console.log('fetching id error' + err);
            
        })
    }
    //  ON CHANGE HANDLER 
    onChangeHandler(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name] : value
        })
    }
    // Update Priority
    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        })
    }
    // submit the updated form
    onSubmit(value) {
        value.preventDefault(); 
        let updatedOrder = {
            todo_name : this.state.todo_name,
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority
        }
        
        axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, updatedOrder).then(
            res => {
                console.log('Data is updated successfully', res.data);
                 // Redirect to default routes
                 this.props.history.push('/');
                 NotificationManager.success('Order is updated!', 'Successful!', 2000);
            }).catch(err => {
                console.log('Order is not updated', err);
                NotificationManager.error('Error while Updated Order!', 'Error!');
            })
           
    }
    render() {
        const container = {
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            marginTop:10,
            flexDirection:'column',            
            };
        return (
            <div style={container}>
                <h3>Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                        <label>Name: </label>
                             <input  type="text"
                                className="form-control"
                                value={this.state.todo_name}
                                name="todo_name"
                                onChange={this.onChangeHandler}
                                required
                            />
                    </div>
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
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

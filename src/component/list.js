import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
const Order = props => {
    return(
    <tr>
        <td>{props.order.todo_name}</td>
        <td>{props.order.todo_description}</td>
        <td>{props.order.todo_responsible}</td>
        <td>{props.order.todo_priority}</td>
        <td><Link to={"/edit/"+props.order._id} className="btn btn-primary"> Edit</Link>
        <button onClick={() => Delete(props.order._id)} style={{marginLeft:20}} className="btn btn-danger">Delete</button>
        </td>
    </tr>
    )
}
function Delete(id) {
    axios.get('http://localhost:4000/todos/delete/'+id).then(res => {
        console.log('data is deleted successfully', res);
        if(res.status === 200) {
            NotificationManager.info('Order Deleted!', 'Successful!', 2000);
            setTimeout(function() {
                window.location.reload(true);
            },2000)
        }
    }).catch(err => {console.log('error for deleted data ', err)
    NotificationManager.error('Error while deleting Order!', 'Error!');
})
    // for refresh page after deleting the data
    // 
}
export default class List extends Component {
    constructor(props) {
        super(props)
        this.state ={
            orderList: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/todos/').then(
            res =>{
                this.setState({
                    orderList:res.data
                })
                
            }
        ).catch(function(err) {
            console.log('data not fetch',err);
            
        })
    }
    orderList() {
        return this.state.orderList.map(function(data, i){
            return <Order order ={data} key={i}/>
        })
    }
    render() {
        const heading = {
            display: 'flex',
            justifyContent:'center',
        }
        return (
            <div>
            <h3 style={heading}>Todo List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Position</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { this.orderList() }
                </tbody>
            </table>
        </div>
        )
    }
}

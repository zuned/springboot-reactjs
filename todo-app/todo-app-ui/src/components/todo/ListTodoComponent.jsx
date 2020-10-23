import React, {Component} from 'react';
import TodoDataService from '../../services/TodoDataService.js';
import AuthenticationService from './AuthenticationService.js';
import moment from 'moment' 

class ListTodoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todos : [],
            message : null
        }
        
        this.refereshTodos = this.refereshTodos.bind(this);
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);
    }

    // This is method is called when class is loaded
    componentDidMount() {
        this.refereshTodos();
    }

    refereshTodos(){
        let username = AuthenticationService.getLoggedInUsername();
        TodoDataService.retrieveAllTodos(username)
        .then(response => {
            this.setState({ todos : response.data })
        })
    }

    updateTodoClicked(id) {
        this.props.history.push(`/todos/${id}`);
    }

    addTodoClicked() {
        this.props.history.push(`/todos/-1`);
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUsername();
        TodoDataService.deleteTodo(username , id)
        .then(response => {
            this.setState({ message : `Delete of todo ${id} is successfull` });
            this.refereshTodos();
        })
    }
    render() {
        return (
            <div>
                <h1>List Todos</h1>
        {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Is Completed?</th>
                                <th>Date of Completion</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map (
                                todo=> 
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                    <td><button className="btn btn-success" onClick={()=>this.updateTodoClicked(todo.id)}>Update</button></td>
                                    <td><button className="btn btn-warning" onClick={()=>this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                </tr>   
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked} >Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListTodoComponent;
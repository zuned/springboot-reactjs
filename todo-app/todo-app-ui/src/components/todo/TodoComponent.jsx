import React, { Component } from 'react';
import moment from 'moment';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import AuthenticationService from './AuthenticationService.js';
import TodoDataService from '../../services/TodoDataService.js';


class TodoComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            id  : parseInt(this.props.match.params.id),
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validateForm = this.validateForm.bind(this)
    }

    componentDidMount(){
        if(this.state.id === -1)
            return;

        let username = AuthenticationService.getLoggedInUsername();
        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response=>{
                this.setState(
                    {
                        description: response.data.description,
                        targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
                    }
                )
            })
    }
    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUsername();
        if(this.state.id === -1)
        {
            TodoDataService.createTodo(username , {
               // id: this.state.id,
                description:values.description,
                targetDate:values.targetDate
            }).then(()=> this.props.history.push('/todos'))

        }else{
            TodoDataService.updateTodo(username , this.state.id , {
                id: this.state.id,
                description:values.description,
                targetDate:values.targetDate
            }).then(() =>  this.props.history.push('/todos') )
        }
       
        
    }
    validateForm(values) {
        let errors = {}
        if(!values.description){
            errors.description = 'Enter Description'
        }else if(values.description.length<5){
            errors.description = 'Enter at least 5 charachter'
        }

        if(!moment(values.targetDate).isValid()){
            errors.targetDate = 'Enter valid target date'
        }
        return errors
    }
    render(){
        let {description , targetDate} = this.state;
    return (
    <div>
        <h1>Todo</h1>
        <div className="container">
            <Formik initialValues={{ description ,targetDate }}
             onSubmit={this.onSubmit} 
             validate={this.validateForm}
             validateOnChange={false}
             enableReinitialize={true}
            >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage className="alert alert-warning" component="div"
                                name="description" />
                            <ErrorMessage className="alert alert-warning" component="div"
                                name="targetDate" />
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field className="form-control" type="text" name="description"></Field>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field className="form-control" type="date" name="targetDate"></Field>
                            </fieldset>
                            <button className="btn btn-success" type="submit" >Save</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    </div>
    )
    }
}

export default TodoComponent;
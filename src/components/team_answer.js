import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {loadInitialDataSocket, addNewItemSocket, AddItem} from '../actions'
import io from "socket.io-client"
// import {List as List} from 'immutable';

let socket;

class TeamAnswer extends Component {
  constructor(props)
  {
    super(props)
    const { dispatch } = this.props

    socket = io.connect("http://localhost:8080")
    dispatch(loadInitialDataSocket(socket))

    socket.on('itemAdded',(res)=>{
      dispatch(AddItem(res))
    })
  }

  componentWillUnmount() {
    socket.disconnect()
    alert("Disconnecting Socket as component will unmount")
  }


  // Single answer window
  createAnswerForm(dispatch, item) {
    const answerText = item.answer ? `Previous answer: ${item.answer}` : "";

    return(
      <li>
        <p>{answerText}</p>
        <form onSubmit={dispatch(addNewItemSocket(socket,newItem)) }>
          <Field
            label="Answer"
            name={item.id}
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </li>
    );
  }
  // Single form
  renderField(field) {
    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
      </div>
    )
  }
  render() {
    const {dispatch,items} = this.props
		if(!items) return (<div>Waiting for game to start</div>);
		return(
			<div>
				<h3>Questions and answers</h3>
				<ul>
					{items.map(dispatch, item => this.createAnswerForm.bind(this))}
				</ul>
			</div>
		);
  }
}

// this.props === ownProps
const mapStateToProps = (state = {}) => {
    return {...state};
};

export default connect(mapStateToProps)(TeamAnswer);

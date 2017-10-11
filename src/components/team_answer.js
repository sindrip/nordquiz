import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {socket, loadInitialDataSocket, addNewItemSocket, AddItem} from '../actions';

class TeamAnswer extends Component {
  constructor(props)
  {
    super(props)
    const { dispatch } = this.props

    dispatch(loadInitialDataSocket(socket))

    socket.on('itemAdded',(res)=>{
      dispatch(AddItem(res))
    })
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
    const {dispatch,game} = this.props
		if(!game) return (<div>Waiting for game to start</div>);
		return(
			<div>
				<h3>Questions and answers</h3>
				<ul>
					{game.map(dispatch, item => this.createAnswerForm.bind(this))}
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

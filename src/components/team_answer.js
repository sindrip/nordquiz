import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {socket, loadInitialDataSocket, addNewItemSocket, AddItem} from '../actions';
import TeamAnswerForm from './team_answer_field';

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

  onSubmit(values) {
    console.log(this);
    console.log(values);
  }
  handleClick(values) {
    console.log('daaaaaaaak');
    console.log(this);
    console.log(values);
  }

  // Single answer window
  createAnswerForm(item) {
    const answerText = item.answer ? `Previous answer: ${item.answer}` : "";
    const { dispatch, handleSubmit } = this.props;
    return(
      <li key={item.id}>
        <p>{answerText}</p>
        {/*<form onSubmit={dispatch(addNewItemSocket(socket,"2")) }>*/}
        <form key={item.id} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
      <div>
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

		if(Object.keys(game).length === 0) return (<div>Waiting for game to start</div>);

		return(
			<div>
        <TeamAnswerForm />
				<h3>Questions and answers</h3>
				<ul>
					{_.map(game, item => this.createAnswerForm(item))}
				</ul>
			</div>
		);
  }
}

// Validates form
function validate(values) {
  const errors = {};
  return errors;
}
// this.props === ownProps
const mapStateToProps = (state = {}) => {
    return {...state};
};

export default reduxForm({
  validate,
  form: 'GameJoinForm',
}) (connect(mapStateToProps)(TeamAnswer));

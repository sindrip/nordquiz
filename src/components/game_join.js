import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { socket } from '../actions';

class GameJoin extends Component {
  constructor(props)
  {
    super(props)

    socket.on('res',(res)=>{
      if(res.code === 'joinGameSuccess') {
        this.props.history.push(`/game/${res.roomName}`);
      } else {
        this.props.history.push('/join');
      }
    })
  }
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  // Handles submit
  onSubmit(values) {
    socket.emit('joinGame',values);
  }

  render() {
    // Middleware for form
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Game name"
          name="roomName"
          component={this.renderField}
        />
        <Field
          label="Team name"
          name="playerName"
          component={this.renderField}
        />
        <Field
          label="Team code"
          name="code"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

// Validates form
function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if(!values.title) {
    errors.title = "Enter a game name!";
  }
  if(!values.categories) {
    errors.categories = "Enter a team name!";
  }
  if(!values.content) {
    errors.content = "Enter a team code!";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux assumes form is invalid
  return errors
}

export default reduxForm({
  validate,
  form: 'GameJoinForm',
})(
  (GameJoin)
);

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';


class TeamAnswerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }
  // Single answer window
  createAnswerForm(item) {
    const answerText = item.answer ? `Previous answer: ${item.answer}` : "";
    const buttonText = item.answer ? "Resubmit" : "Submit";
    const { dispatch, handleSubmit } = this.props;

    return(
        <div>
          <p>{answerText}</p>
          <form formName={this.props.id} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Answer"
              name="Ans"
              component={this.renderField}
            />
            <button type="submit" className="btn btn-primary">{buttonText}</button>
          </form>
        </div>
    );
  }
  // Single form
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

  onSubmit(values) {
    this.props.onSubmit('rrr');
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        {this.createAnswerForm(this.props.item)}
      </div>
    );
  }
}
// Validates form
function validate(values) {
  const errors = {};

  if(!values.Ans) {
    errors.Ans = "Enter a answer!";
  }

  return errors;
}

const mapStateToProps = (state, ownProps) => {
    return {
        form: ownProps.id,
    }
}

export default compose(
    connect(mapStateToProps),
    reduxForm({
        validate,
    })
)(TeamAnswerForm);

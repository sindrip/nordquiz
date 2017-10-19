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
    this.renderTextField = this.renderTextField.bind(this);
  }
  renderImage(item) {
    return <div>test</div>
  }
  // Single answer window
  createAnswerForm(item) {
    const { dispatch, handleSubmit } = this.props;
    // Show previous answer text
    const answerText = item.answer ? `Previous answer: ${item.answer}` : "";
    // Text in submit button
    const buttonText = item.answer ? "Resubmit" : "Submit";
    // If image tag is on item
    const imageTag = item.hasImage ? this.renderImage(item) : "";
    // Shows dropdown if has dropdown property
    const formType = item.type === 'dropdown' ? this.renderDropDown(item) : this.renderTextField();
    return(
      <div className="list-answer">
        <div className="list-answer-id">
          <p>
            <span className="list-answer-id-span">Question number: </span>
            {this.props.id}
          </p>
        </div>
        <div>
          <p className="list-answer-text">{answerText}</p>
          <form formName={this.props.id} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            {formType}
            <button type="submit" className="btn btn-primary">{buttonText}</button>
          </form>
        </div>
        <div className="list-answer-image">
          {imageTag}
        </div>
      </div>
    );
  }
  // Handles the dropdown
  renderDropDown(item) {
    return(
      <Field
        name="ans"
        component="select"
        className="form-control">
        {item.dropdown.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </Field>
    )
  }
  test() {
    return (
      <select></select>
    )
  }
  // Handles the text field
  renderTextField() {
    return(
      <Field
        label="Answer"
        name="Ans"
        component={this.renderField}
      />
    )
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
    this.props.onSubmit(values, this.props.id);
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

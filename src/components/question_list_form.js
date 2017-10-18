import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';


class TeamAnswerForm extends Component {
  renderImage(image) {
    if(!image) return;
    return (
      <div className="list-answer-image">
        <img src={require(`../../static/ugla.jpg`)} />
      </div>
    )
  }
  //  <img src={require(`../../static/${image}.jpg`)} />
  render() {
    const { item } = this.props;

    return (
      <div className="list-answer">
        <div className="list-answer-id">
          <span className="list-answer-id-span">Question number: </span>
          {item.id}
        </div>
        <div className="list-question-content">
          <p className="list-answer-text">
            {item.question}
          </p>
          {this.renderImage(item.image)}
        </div>
      </div>
    );
  }
}

export default TeamAnswerForm;

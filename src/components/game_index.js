import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const BUTTONS = {
  join: {
    path: 'join',
    text: 'Join a game!'
  },
  create: {
    path: 'create',
    text: 'Create a game',
  },
  admin: {
    path: 'admin',
    text: 'Manage games',
  }
}

class GameIndex extends Component {

  renderButton(button) {
    return (
      <Link key={button.path} className="btn btn-primary" to={`/${button.path}`}>
        {button.text}
      </Link>
    )
  }
  handleClick(e) {
    console.log('da');
  }
  render() {
    return(
      <div>
        <h2> Nörd quiz </h2>
        {_.map(BUTTONS, this.renderButton.bind(this))}
        <div>
          <p>
            Test button
          </p>
          <button onClick={this.handleClick.bind(this)}>
            Test socket
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state = {}) => {
    return {...state};
};

export default connect(mapStateToProps)(GameIndex);

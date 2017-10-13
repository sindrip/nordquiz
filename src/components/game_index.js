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
      <Link key={button.path} className="btn btn-primary index-route-button" to={`/${button.path}`}>
        {button.text}
      </Link>
    )
  }
  render() {
    return(
      <div>
        <h2> Nörd quiz </h2>
        <div className="index-route">
          {_.map(BUTTONS, this.renderButton.bind(this))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state = {}) => {
    return {...state};
};

export default connect(mapStateToProps)(GameIndex);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {socket, adminSocket} from '../actions';

class AdminPage extends Component {
  constructor(props)
  {
    super(props)
    console.log('const');
    const { dispatch } = this.props;
    dispatch(adminSocket(socket));
    console.log(this.props.login);

    this.state = {
      admin: false
    };
  }
  componentWillReceiveProps(d) {
    console.log(d);
  }
  render() {

    if(!this.props.login.admin) {
      //this.props.history.push('/create');
    }
    const wat = this.state.admin ? "admin!!" :  "no admin :( :( :("
		return(
			<div>
        <p>
          {wat}
        </p>
			</div>
		);
  }
}

// this.props === ownProps
const mapStateToProps = (state = {}) => {
    return {...state};
};

export default (connect(mapStateToProps)(AdminPage));

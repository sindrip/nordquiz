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
    socket.emit('validate','here');
    socket.on('admin',(res)=>{
      if(!res.admin) {
        this.props.history.push('/join');
      }
    })
  }

  render() {
    console.log('render');
    console.log(this.props.login);
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

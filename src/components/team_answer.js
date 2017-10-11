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

  handleSubmit(values) {
    console.log(values);
  }

  render() {
    const {dispatch,game} = this.props

		if(Object.keys(game).length === 0) return (<div>Waiting for game to start</div>);

		return(
			<div>
        {}
				<h3>Questions and answers</h3>
				<ul className="list-group">
					{_.map(game, item => <li className="list-group-item" key={item.id}>
                                <TeamAnswerForm
                                  item={item}
                                  id={item.id}
                                  onSubmit={this.handleSubmit}
                                />
                              </li>)}
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

export default (connect(mapStateToProps)(TeamAnswer));

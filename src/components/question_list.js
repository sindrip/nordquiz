import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import {socket, loadInitialDataSocket, UpdateGame} from '../actions';
import QuestionListForm from './question_list_form';

class QuestionList extends Component {
  constructor(props)
  {
    super(props)
    const { dispatch } = this.props;

    dispatch(loadInitialDataSocket(socket));

    socket.on('newQuestion',(res)=>{
      dispatch(UpdateGame(res))
    })
  }
  scrollToBottom = () => {
    //const node = ReactDOM.findDOMNode(this.messagesEnd);
    //node.scrollIntoView({ behavior: "smooth" });
    window.scrollTo(0,document.body.scrollHeight);
    //document.getElementsByClassName("container")[0].animate({scrollTop:document.body.scrollHeight},'50');
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    const {dispatch,game} = this.props;

		if(Object.keys(game).length === 0) return (<div>Waiting for game to start</div>);

		return(
			<div>
				<h3>Questions</h3>
				<ul className="list-group">
					{_.map(game, item => <li className="list-group-item" key={item.id}>
                                <QuestionListForm
                                  item={item}
                                  onSubmit={this.handleSubmit}
                                />
                              </li>)}
				</ul>
			</div>
		);
  }
}

// this.props === ownProps
const mapStateToProps = (state = {}) => {
    return {...state};
};

export default (connect(mapStateToProps)(QuestionList));

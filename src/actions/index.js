import axios from 'axios';
import openSocket from 'socket.io-client';

export const socket = openSocket('http://localhost:3000');

export const JOIN_GAME = 'join_game';
export const ADD_ANSWER = 'add_answer';
export const INITIAL_ITEMS = 'initial_items';

// Socket items
export const AddItem = (res) => ({
	type: ADD_ANSWER,
	payload: res,
})

export const initialItems = (res) => ({
	type: INITIAL_ITEMS,
	payload: [{ id: 2, answer: 3}, { id: 2, answer: 3}]
})

// Team Answer
export const loadInitialDataSocket = (socket) => {
	initialItems("s")
	return (dispatch) => {
		socket.on('init',(res)=>{
		   console.dir(res)
		   dispatch(initialItems(res))
	   })
	}
}

export const addNewItemSocket = (socket,item) => {
	console.log('baaaaaaaaaaaaaaaaaa');
	return (dispatch) => {
		let postData = {
				item:item,
				completed:false
		     }
	    socket.emit('addItem',postData)
	}
}

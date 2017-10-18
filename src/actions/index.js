import axios from 'axios';
import openSocket from 'socket.io-client';

export const socket = openSocket('https://nordquizserver.herokuapp.com/');

export const JOIN_GAME = 'join_game';
export const ADD_ANSWER = 'add_answer';
export const UPDATE_GAME = 'update_game'
export const INITIAL_ITEMS = 'initial_items';
export const IS_ADMIN = 'is_admin';

// Socket items
export const AddItem = (res) => ({
	type: ADD_ANSWER,
	payload: res,
})
export const UpdateGame = (res) => ({
	type: UPDATE_GAME,
	payload: res,
})

export const initialItems = (res) => ({
	type: INITIAL_ITEMS,
	payload: res,
})
export const checkAdmin = (res) => ({
	type: IS_ADMIN,
	payload: res,
})

// Team Answer
export const adminSocket = (socket) => {
	var maybeTrue = Math.random() < 0.5;
	return checkAdmin(maybeTrue)
	/*some admin socket here*/
}

// Team Answer
export const loadInitialDataSocket = (socket) => {
	return (dispatch) => {
		socket.on('allQuestions',(res)=>{
		   dispatch(initialItems(res))
	   })
	}
}

export const addNewItemSocket = (socket,item) => {
	socket.emit('answerQuestion',{
		questionNumber: item.id,
		answer: item.text,
	})
}

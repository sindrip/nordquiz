import axios from 'axios';

export const JOIN_GAME = 'join_game';
export const ADD_ANSWER = 'add_answer';
export const INITIAL_ITEMS = 'initial_items';


const ROOT_URL = 'http://coolurl.herokuapp.com/api';

// Socket items
export const AddItem = (res) => ({
	type: ADD_ANSWER,
	payload: res,
})

export const initialItems = (res) => ({
	type: INITIAL_ITEMS,
	payload: res
})

export const loadInitialDataSocket = (socket) => {
	return (dispatch) => {
		socket.on('initialList',(res)=>{
		   console.dir(res)
		   dispatch(initialItems(res))
	   })
	}
}

export const addNewItemSocket = (socket,item) => {
	return (dispatch) => {
		let postData = {
				item:item,
				completed:false
		     }
	    socket.emit('addItem',postData)
	}
}

// React items
export function joinGame(values, callback) {
  // send registration to server, return true if game exists
  //const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
  //  .then(res => callback(res.data));
  callback({url:`${values.game}/${values.team}`})
  return {
    type: JOIN_GAME,
    payload: request,
  }
}

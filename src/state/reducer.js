// import { getMessages } from "../hooks/getMessages";
import * as actions from "./actionTypes";
import { initialState } from "./actionTypes";

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case actions.MARK_AS_READ:
      newState = { ...state };
      console.log(newState);
      newState.messages.map((message, index) => {
        if (index === action.payload.messageIndex) {
          message.isRead = true;
          console.log(message);
          return message;
        } else {
          console.log("could not find the message");
        }
        return message;
      });
      console.log(newState);
      return newState;
    case actions.ADD_MESSAGES:
      newState = { ...state };
      newState.messages = [...action.payload.messages, ...newState.messages];
      return newState;
    case actions.SIGN_IN:
      newState = { ...state };
      newState.user = action.payload;
      return newState;
    case actions.SIGN_OUT:
      newState = { ...state };
      newState.user = null;
      return newState;
    default:
      return state;
  }
}

export { reducer };

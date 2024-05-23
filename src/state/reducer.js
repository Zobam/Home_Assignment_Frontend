// import { getMessages } from "../hooks/getMessages";
import { updateMessage } from "../hooks/updateMessage";
import * as actions from "./actionTypes";
import { initialState } from "./actionTypes";

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case actions.MARK_AS_READ:
      newState = { ...state };
      newState.messages.map((message, index) => {
        if (index === action.payload.messageIndex) {
          message.isRead = true;
          updateMessage(message._id);
          return message;
        }
        return message;
      });
      console.log(newState);
      return newState;
    case actions.ADD_NOTES:
      newState = { ...state };
      newState.messages = action.payload.messages;
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

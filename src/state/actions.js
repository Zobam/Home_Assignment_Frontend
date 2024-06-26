import * as actionTypes from "./actionTypes";

function markAsRead(payload) {
  return {
    type: actionTypes.MARK_AS_READ,
    payload,
  };
}
function addMessages(payload) {
  return {
    type: actionTypes.ADD_MESSAGES,
    payload,
  };
}
function signUp(payload) {
  return {
    type: actionTypes.SIGN_IN,
    payload,
  };
}
function signIn(payload) {
  return {
    type: actionTypes.SIGN_IN,
    payload,
  };
}
function signOut(payload) {
  return {
    type: actionTypes.SIGN_OUT,
    payload,
  };
}
export { markAsRead, addMessages, signOut, signIn, signUp };

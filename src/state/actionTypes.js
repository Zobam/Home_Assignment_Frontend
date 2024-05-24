export const MARK_AS_READ = "markAsRead";
export const ADD_MESSAGES = "addMessages";
export const SIGN_OUT = "signOut";
export const SIGN_IN = "signIn";
export const SIGN_UP = "signUp";

const initialState = {
  user: null,
  users: [],
  messages: [],
  apiURL: "https://home-assignment-full-stack-dev-1.onrender.com",
};
export { initialState };

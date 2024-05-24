import axios from "axios";
import { useState } from "react";
import { connect } from "react-redux";
import { addMessages, signIn, signUp } from "../state/actions";
import { useNavigate } from "react-router-dom";
import { getResource } from "../hooks/getResource";

function SignIn({ signIn, signUp, addMessages, state }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();
  //   add field to user object
  const addField = (e) => {
    const filedName = e.target.name;
    setUser((value) => {
      const newVal = { ...value, [`${filedName}`]: e.target.value };
      return newVal;
    });
  };
  //   signInSignUp
  const signInSignUp = async () => {
    setLoading(true);
    const linkPostfix = isSignUp ? "up" : "in";

    let apiLink = `${state.apiURL}/sign-${linkPostfix}`;
    try {
      const { data } = await axios.post(apiLink, user);
      console.log(data);
      if (data.status === "success") {
        if (isSignUp) {
          setIsSignUp(false);
        } else {
          signIn(data.user);
          //   fetch messages
          const messages = await getResource(
            data.user,
            `${state.apiURL}/messages`
          );
          addMessages({ messages });

          navigate("/");
        }
      }
    } catch (error) {
      console.log("error signing " + linkPostfix, error);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="text-center my-4 font-bold text-2xl">
        {isSignUp ? "Create an account" : "Sign in"}
      </h1>
      <section className="px-4">
        {isSignUp && (
          <div className="">
            <label htmlFor="userName">Username:</label>
            <input
              type="text"
              name="userName"
              className="block border-2 mb-4 rounded-lg shadow-sm p-1"
              onChange={addField}
            />
          </div>
        )}
        <div className="">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            className="block border-2 mb-4 rounded-lg shadow-sm p-1"
            onChange={addField}
          />
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="block border-2 mb-4 rounded-lg shadow-sm p-1"
            onChange={addField}
          />
        </div>
        {hasError && (
          <div className="text-red-500 text-xs">
            incorrect credentials. check and try again
          </div>
        )}
        {!isSignUp ? (
          <div>
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setIsSignUp(true)}
            >
              Create account
            </span>
          </div>
        ) : (
          <div>
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setIsSignUp(false)}
            >
              Sign in
            </span>
          </div>
        )}
        <div className="text-center">
          <button
            className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-900"
            onClick={signInSignUp}
          >
            {loading ? (
              <span className="animate-ping inline-block text-2xl">. . . </span>
            ) : isSignUp ? (
              "Sign up"
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </section>
    </>
  );
}
function mapStateToProps(state) {
  return { state };
}

const mapDispatchToProps = {
  signUp,
  signIn,
  addMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

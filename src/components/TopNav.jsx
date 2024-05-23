import { useEffect } from "react";
import { connect } from "react-redux";
import { getMessages } from "../hooks/getMessages";
import { addMessages, signOut } from "../state/actions";
import "../styles/TopNav.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

function TopNav(props) {
  const navigate = useNavigate();
  // add messages to state
  const handleAddMessages = (messages) => {
    props.addMessages({ messages });
  };
  //   get unread messages count
  const unreadMessagesCount = props.state.messages.filter(
    (message) => !message.isRead
  ).length;
  useEffect(() => {
    // make api call to fetch messages
    async function fetchMessages() {
      const messages = await getMessages();
      handleAddMessages(messages);
    }
    fetchMessages();
  }, []);
  const signOut = (e) => {
    e.preventDefault();
    props.signOut({});
    navigate("/sign-in");
  };
  return (
    <nav>
      <div className="">
        <p>
          {props.state.user && (
            <>
              {props.state.user.name} |{" "}
              <span className={!unreadMessagesCount ? "read" : "unread"}>
                {unreadMessagesCount} unread messages
              </span>
            </>
          )}
        </p>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/inbox">Inbox</Link>
        </li>
        <li>
          {props.state.user ? (
            <a href="#out" onClick={signOut}>
              Sign out
            </a>
          ) : (
            <Link to="/sign-in">Sign in</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

function mapStateToProps(state) {
  return { state: state };
}

const mapDispatchToProps = {
  addMessages,
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);

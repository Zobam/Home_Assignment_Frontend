import { useEffect } from "react";
import { connect } from "react-redux";
import { getResource } from "../hooks/getResource";
import { addMessages, signOut } from "../state/actions";
import "../styles/TopNav.css";
import { Link, useNavigate } from "react-router-dom";

function TopNav(props) {
  const navigate = useNavigate();
  // add messages to state
  const handleAddMessages = (messages) => {
    props.addMessages({ messages });
  };
  //   get unread messages count
  const unreadMessagesCount = props.state.messages?.filter(
    (message) => !message.isRead
  ).length;
  useEffect(() => {
    // make api call to fetch messages
    async function fetchMessages() {
      const messages = await getResource(props.state.user, "messages");
      handleAddMessages(messages);
    }
    fetchMessages();
  }, []);
  const signOut = (e) => {
    e.preventDefault();
    props.signOut({});
    navigate("/user");
  };
  return (
    <nav>
      <div className="">
        <p>
          {props.state.user && (
            <>
              {props.state.user.userName} |{" "}
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
          <Link to="/create">Create+</Link>
        </li>
        <li>
          {props.state.user ? (
            <a href="#out" onClick={signOut}>
              Sign out
            </a>
          ) : (
            <Link to="/user">Sign in</Link>
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

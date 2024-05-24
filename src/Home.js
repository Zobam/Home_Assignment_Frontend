import "./styles/Home.css";
import Button from "./components/Button";
import { markAsRead } from "./state/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Home(props) {
  // get count of unread messages
  const unreadMessagesCount = props.messages.filter(
    (message) => !message.isRead
  ).length;
  return (
    <div className="home">
      <h2>Hello {props.user.userName}</h2>
      <h3>
        You have {unreadMessagesCount} unread message out of{" "}
        {props.messages.length} total
      </h3>
      <Link to="/inbox">
        <Button text="View Messages" />
      </Link>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    user: state.user,
  };
}

const mapDispatchToProps = {
  markAsRead,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

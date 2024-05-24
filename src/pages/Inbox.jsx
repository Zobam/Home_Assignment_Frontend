import { connect } from "react-redux";
import "../styles/Inbox.css";
import { Link } from "react-router-dom";
import { getMessageExcerpt } from "../hooks/getMessageExcerpt";

function Inbox(props) {
  return (
    <section id="inbox-container">
      <h1 className="my-4 font-bold text-xl">Messages</h1>
      <ul>
        {props.messages.map((message, index) => (
          <li key={index}>
            <Link to={`/messages/${++index}`}>
              <div id="inbox" className={message.isRead ? "read" : ""}>
                <h3 className="font-bold">{message.subject}</h3>
                <p>{getMessageExcerpt(message.content)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);

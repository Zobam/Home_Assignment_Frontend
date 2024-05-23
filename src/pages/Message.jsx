import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { markAsRead } from "../state/actions";
import { useEffect } from "react";
import "../styles/Message.css";

function Message(props) {
  const messageIndex = useParams().messageIndex - 1;
  // navigate to inbox if messages are not yet loaded into state
  if (!props.messages.length) {
    window.location = "/inbox";
  }
  const message = props.messages[messageIndex];
  useEffect(() => {
    if (!message.isRead) {
      props.markAsRead({ messageIndex });
    }
  }, []);
  return (
    <section id="message">
      <h1>{message.subject}</h1>
      <div className="">
        <p>{message.content}</p>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
  };
}

const mapDispatchToProps = {
  markAsRead,
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);

import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { markAsRead } from "../state/actions";
import { useEffect } from "react";
import "../styles/Message.css";
import { updateMessage } from "../hooks/updateMessage";

function Message({ user, messages, markAsRead, apiURL }) {
  const messageIndex = useParams().messageIndex - 1;
  // navigate to inbox if messages are not yet loaded into state
  if (!messages.length) {
    window.location = "/inbox";
  }
  const message = messages[messageIndex];
  useEffect(() => {
    if (!message.isRead) {
      console.log("about to mark message as read");
      markAsRead({ messageIndex });
      updateMessage(user, `${apiURL}/messages/${message._id}`);
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
    ...state,
  };
}

const mapDispatchToProps = {
  markAsRead,
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);

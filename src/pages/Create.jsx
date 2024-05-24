import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getResource } from "../hooks/getResource";
import axios from "axios";
import { addMessages } from "../state/actions";
import "../styles/Create.css";
import { useNavigate } from "react-router-dom";

function Create({ user, apiURL, addMessages }) {
  const [messageData, setMessageData] = useState({ senderID: user.id });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  //   add field to user object
  const addField = (e) => {
    const filedName = e.target.name;
    setMessageData((value) => {
      const newVal = { ...value, [`${filedName}`]: e.target.value };
      setHasError(false);
      return newVal;
    });
  };
  const sendMessage = async () => {
    // basic form validation
    if (Object.keys(messageData).length === 1) {
      setHasError(true);
    } else {
      for (const field in messageData) {
        if (messageData[field].length < 3) {
          setHasError(true);
          break;
        }
      }
    }

    if (hasError) return;

    setLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${user.accessToken}` },
    };
    try {
      const { data } = await axios.post(
        `${apiURL}/messages`,
        messageData,
        config
      );
      if (data.status === "success") {
        addMessages({ messages: [data.data] });
        navigate("/inbox");
      }
    } catch (error) {
      console.log("message creation error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    async function fetchUsers() {
      const users = await getResource(user, `${apiURL}/users`);
      setUsers(users);
    }
    fetchUsers();
  }, []);
  return (
    <section id="create">
      <h1 className="text-center my-4 font-bold text-2xl">Send a Message</h1>
      <section className="px-4">
        <div className="">
          <label htmlFor="userName">Subject:</label>
          <input
            type="text"
            name="subject"
            className="block border-2 mb-4 rounded-lg shadow-sm p-1"
            onChange={addField}
          />
        </div>
        <div className="">
          <label htmlFor="email">Content:</label>
          <textarea
            name="content"
            className="block border-2 mb-4 rounded-lg shadow-sm p-1"
            onChange={addField}
          ></textarea>
        </div>
        <div className="">
          <label htmlFor="password">Recipient</label>
          <select
            name="receiverID"
            className="block border-2 mb-4 rounded-lg shadow-sm p-1"
            onChange={addField}
          >
            <option value="">Select the Receiver</option>
            {users.map((userM, index) => (
              <option value={userM._id} key={index}>
                {userM.userName} (
                {userM._id === user.id ? "send to yourself" : userM.email})
              </option>
            ))}
          </select>
        </div>
        {hasError && (
          <div className="text-red-600 text-xs">
            provide value for all the fields
          </div>
        )}
        <div className="text-center">
          <button
            className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-900"
            onClick={sendMessage}
          >
            {loading ? (
              <span className="animate-ping inline-block text-2xl">. . . </span>
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </section>
    </section>
  );
}
function mapStateToProps(state) {
  return { ...state };
}

const mapDispatchToProps = {
  addMessages,
};
export default connect(mapStateToProps, mapDispatchToProps)(Create);

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getResource } from "../hooks/getResource";
import axios from "axios";
import { addMessages } from "../state/actions";

function Create({ user, apiURL, addMessages }) {
  const [messageData, setMessageData] = useState({ senderID: user.id });
  const [users, setUsers] = useState([]);
  //   add field to user object
  const addField = (e) => {
    const filedName = e.target.name;
    setMessageData((value) => {
      const newVal = { ...value, [`${filedName}`]: e.target.value };
      return newVal;
    });
  };
  const sendMessage = async () => {
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
        // addMessages([{}])
        console.log("message sent.", data.data);
      }
    } catch (error) {
      console.log("user token: ", user.accessToken);
      console.log("message creation error", error);
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
    <>
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
        <div className="text-center">
          <button
            className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-900"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </div>
      </section>
    </>
  );
}
function mapStateToProps(state) {
  return { ...state };
}

const mapDispatchToProps = {
  addMessages,
};
export default connect(mapStateToProps, mapDispatchToProps)(Create);

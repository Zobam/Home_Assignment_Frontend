import axios from "axios";

export async function updateMessage(messageID) {
  try {
    const { data } = await axios.put(
      `http://localhost:3200/messages/${messageID}`
    );
    // console.log(data);
    if (data.status === "success") {
      console.log(data);
    }
  } catch (error) {
    console.log("an error occurred fetching messages from server.", error);
  }
}

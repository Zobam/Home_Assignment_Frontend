import axios from "axios";

export async function getMessages() {
  try {
    const { data } = await axios.get("http://localhost:3200/messages");
    // console.log(data);
    if (data.status === "success") {
      return data.data;
    }
  } catch (error) {
    console.log("an error occurred fetching messages from server.", error);
  }
}

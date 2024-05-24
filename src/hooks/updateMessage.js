import axios from "axios";

export async function updateMessage(user, link) {
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  try {
    await axios.put(`${link}`, {}, config);
    // console.log(data);
    /* if (data.status === "success") {
      console.log(data);
    } */
  } catch (error) {
    console.log("an error occurred updating messages from server.", error);
  }
}

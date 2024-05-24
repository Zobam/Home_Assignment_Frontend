import axios from "axios";

export async function updateMessage(user, link) {
  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  try {
    console.log("this is link: ", link);
    console.log(config);
    const { data } = await axios.put(`${link}`, {}, config);
    // console.log(data);
    if (data.status === "success") {
      console.log(data);
    }
  } catch (error) {
    console.log("an error occurred updating messages from server.", error);
  }
}

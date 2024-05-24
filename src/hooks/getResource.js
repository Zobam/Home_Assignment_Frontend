import axios from "axios";

export async function getResource(user, link) {
  if (!user) return [];

  const config = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  };
  try {
    const { data } = await axios.get(`${link}`, config);
    if (data.status === "success") {
      return data.data;
    }
  } catch (error) {
    console.log("an error occurred fetching messages from server.", error);
    return;
  }
}

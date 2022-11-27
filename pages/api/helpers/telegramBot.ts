import axios from "axios";

export default function sendMessage(): any {
  const token = process.env.NEXT_PUBLIC_TG_KEY;
  const chat_id = process.env.NEXT_PUBLIC_CHAT_ID;
  const text = "Hello World!";
  return axios
    .post(
      `https://api.telegram.org/bot${token}/sendMessage?text=${text}&chat_id=${chat_id}`
      //`https://api.telegram.org/bot${token}/getMe`
    )
    .then((response) => {
      return;
    })
    .catch((error) => {
      return;
    });
}

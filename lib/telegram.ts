import axios from "axios";
import { shortenAddress } from "./helpers/shortenAddress";

interface Trade {
  __typename: string;
  id: string;
  account: string;
  collateralToken: string;
  collateralDelta: string;
  collateral: string;
  timestamp: Date;
  isLong: boolean;
  closedPosition: boolean | null;
  liquidatedPosition: boolean | null;
  settledTimestamp: boolean | null;
  sizeDelta: string;
  size: string;
  averagePrice: string;
}

export function sendMessage(trade: Trade): any {
  const token = process.env.TG_KEY;
  const chat_id = process.env.CHAT_ID;
  const text = `New trade from ${shortenAddress(trade.account)}`;
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

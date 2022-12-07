import { getLastTrades } from "./dmx";
import { checkIfTxInDb, addTxInDb } from "@/lib/db/db";
import { sendMessage } from "./telegram";

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

type JSONResponse = {
  data?: {
    trade: Omit<Trade, "fetchedAt">;
  };
  errors?: Array<{ message: string }>;
};

const addresses = [
  "0xfee7640faf953cb620a40c68c1d06bcc984032a1",
  "0xc48cdc9f5b35bb6679dbe9a36a359ffb2de8733e",
  "0xcb696fd8e239dd68337c70f542c2e38686849e90",
  "0xc84c3fefdc10a3a888057aa5167fd2e9522eb21a",
  "0x812e168a932bed88c7de5a6efa97b19b1ab03070",
  "0x4ebe485c1df060f6fc6e3c3b200ebc21fe11a94d",
  "0x4ff43de2f698fa27fbbcd5be8c54cdbefddaf5b4",
  "0x9b8886e0f9041c1559f1f987ade7914ead26cf29",
  "0x7a1a490afa6ce3c5b0233651b3390892af980dd9",
  "0x301913c74aeef82a808ded986613d733a7063c82",
  "0xb09c48582db808c8043d0eb982b9610d79d9c0e1",
  "0x36a26590360797e9795d31c103f87f79e52ecf7a",
  "0xb7dc41706c8d093ab3c83aff6146438813a2946d",
];
//Here I'll do all my fetch and checks
export async function cron() {
  //Fetch data form TheGraph
  const lastTrades = await getLastTrades();

  lastTrades.map(async (element: Trade) => {
    for (let i = 0; i < addresses.length; i++) {
      if (addresses[i] === element.account) {
        //Check if new trades
        let isInDb = await checkIfTxInDb(element.id);
        if (!isInDb) {
          //If new trades store them + send notification on TG
          addTxInDb(element.id);
          sendMessage(element);
        }
      }
    }
  });
  return lastTrades;
}

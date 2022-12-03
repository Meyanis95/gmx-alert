import { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/nextjs";
import { getLastTrades } from "./dmx";
import checkIfTxInDb from "pages/api/db/checkIfTxInDb";
import addTxInDb from "pages/api/db/addTxInDb";
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

//Here I'll do all my fetch and checks
export async function cron() {
  const lastTrades = await getLastTrades();

  lastTrades.map((element: Trade) => {
    if (!checkIfTxInDb(element.id)) {
      addTxInDb(element.id);
      sendMessage(element);
    }
  });
  console.log(typeof lastTrades);
  return lastTrades;
  //Fetch data form TheGraph
  //Check if new trades
  //If new trades store them + send notification on TG
}

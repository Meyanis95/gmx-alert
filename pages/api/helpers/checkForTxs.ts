import { textSpanContainsTextSpan } from "typescript";

const targetAddress = "";

interface txType {
  __typename: string;
  account: string;
  collateralToken: string;
  collateralDelta: string;
  collateral: string;
  timestamp: Date;
  isLong: boolean;
  closedPosition: boolean;
  liquidatedPosition: boolean;
  settledTimestamp: Date;
  sizeDelta: string;
  size: string;
  averagePrice: string;
}

export default function checkForTxs(Txs: any): any {
  // const [lastCheckedId, latestPostId] = await Promise.all([
  //     getLastCheckedId(),
  //     getLatestPost(),
  //   ]);

  if (Txs) {
    Txs.map((tx: txType) => {
      if (tx.account === targetAddress) {
        //send a message
      }
    });
  }
}

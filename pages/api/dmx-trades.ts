import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import checkIfTxInDb from "../../lib/db/checkIfTxInDb";
import addTxInDb from "../../lib/db/addTxInDb";
import { sendMessage } from "@/lib/telegram";

const APIURL = "https://api.thegraph.com/subgraphs/name/nissoh/gmx-arbitrum";

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

const tradesQuery = `
  query($first: Int) {
    trades(
      first: $first,
      where: {timestamp_gte: 1668445986}
    ) {
        id
        account
        collateralToken
        collateralDelta
        collateral
        timestamp
        isLong
        closedPosition {
          id
        }
        liquidatedPosition {
          id
        }
        settledTimestamp
        sizeDelta
        size
        averagePrice
        settledTimestamp
        closedPosition {
          id
        }
      }
  }
`;

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    client
      .query({
        query: gql(tradesQuery),
        variables: {
          first: 1000,
        },
      })
      .then((data: any) => {
        //console.log("Subgraph data: ", data);
        data.data.trades.map(async (element: any) => {
          for (let i = 0; i < addresses.length; i++) {
            if (addresses[i] === element.account) {
              let isInDb = await checkIfTxInDb(element.id);
              console.log(isInDb);
              if (!isInDb) {
                addTxInDb(element.id);
                sendMessage(element);
              }
            }
          }
        });

        //console.log(database);
        res.status(200).json({ trades: data.data.trades });
      })
      .catch((err: any) => {
        console.log("Error fetching data: ", err);
        res.status(400).json({ error: err.message });
      });
  } else {
    // Handle any other HTTP method
  }
}

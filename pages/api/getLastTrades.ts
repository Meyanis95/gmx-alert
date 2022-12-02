import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import checkIfTxInDb from "./db/checkIfTxInDb";
import addTxInDb from "./db/addTxInDb";

const APIURL = "https://api.thegraph.com/subgraphs/name/nissoh/gmx-arbitrum";

const tradesQuery = `
  query {
    trades {
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

const addresses = [
  "0xfee7640faf953cb620a40c68c1d06bcc984032a1",
  "0xc48cdc9f5b35bb6679dbe9a36a359ffb2de8733e",
  "0xcb696fd8e239dd68337c70f542c2e38686849e90",
];

export default function getLastTrades() {
  client
    .query({
      query: gql(tradesQuery),
    })
    .then((data) => {
      return data.data.trades;
    })
    .catch((err) => {
      console.log("Error fetching data: ", err);
      return err.messge;
    });
}

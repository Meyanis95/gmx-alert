import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const APIURL = "https://api.thegraph.com/subgraphs/name/nissoh/gmx-arbitrum";

const tradesQuery = `
  query {
    trades {
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
      })
      .then((data) => {
        console.log("Subgraph data: ", data);
        data.data.trades.forEach((element: any) => {
          console.log(element);
        });
        res.status(200).json({ trades: data.data.trades });
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
        res.status(400).json({ error: err.message });
      });
  } else {
    // Handle any other HTTP method
  }
}

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { getDate } from "./helpers/getDate";

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
};

type ErrorResponse = {
  errors?: Array<{ message: string }>;
};

const APIURL = "https://api.thegraph.com/subgraphs/name/nissoh/gmx-arbitrum";

const tradesQuery = (timestamp: any) => {
  return `
  query($first: Int) {
    trades(
      first: $first,
      where: {timestamp_gte: ${timestamp}}
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
};

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

export async function getLastTrades() {
  let timestamp = getDate();
  const trades = tradesQuery(timestamp);
  return client
    .query({
      query: gql(trades),
      variables: {
        first: 1000,
      },
    })
    .then((data) => {
      const trades = data?.data?.trades;
      return trades;
    })
    .catch((err: ErrorResponse) => {
      return err;
    });
}

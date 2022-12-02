import { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/nextjs";

//Here I'll do all my fetch and checks
export async function cron() {
  //Fetch data form TheGraph
  //Check if new trades
  //If new trades store them + send notification on TG
}

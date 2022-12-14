import type { NextApiRequest, NextApiResponse } from "next";
import { getAllTxsInDb } from "@/lib/db/db";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  // if (await isDuplicateCron()) {
  //   // check if this is a duplicate cron job (threshold of 5s)
  //   return res.status(500).json({ message: "Duplicate cron job" });
  // }
  try {
    //const response = await getAllTxsInDb();
    //console.log("Cron job successful! Response:", response);
    //res.status(200).json(response);
  } catch (err) {
    console.log("Cron job error:", err);
    await console.log(
      "Cron job error: \n" + "```" + JSON.stringify(err) + "```"
    );
    res.status(500).json({ statusCode: 500, message: err });
  }
}

/**
 * verifySignature will try to load `QSTASH_CURRENT_SIGNING_KEY` and `QSTASH_NEXT_SIGNING_KEY` from the environment.
 * To test out the endpoint manually (wihtout using QStash), you can do `export default handler` instead and
 * hit this endpoint via http://localhost:3000/api/cron
 */

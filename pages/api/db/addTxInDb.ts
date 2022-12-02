import supabase from "./supabase";

export default async function addTxInDb(txId: string) {
  try {
    const { data, error } = await supabase
      .from("Transactions Ids")
      .insert({ id: txId });
  } catch (error) {
    console.log(error);
  }
}

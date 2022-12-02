import supabase from "./supabase";

export default async function checkIfTxInDb(txId: string) {
  try {
    const { data, error } = await supabase
      .from("Transactions Ids")
      .select("id")
      .eq("id", txId);

    if (data?.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

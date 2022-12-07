import supabase from "./supabase";

export async function checkIfTxInDb(txId: string) {
  try {
    const { data, error } = await supabase
      .from("Transactions Ids")
      .select("id")
      .eq("id", txId);

    if (error) {
      throw new Error(
        `SupabaseError: query failed: \n${JSON.stringify(error)}`
      );
    }

    if (data?.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return error;
  }
}

export async function addTxInDb(txId: string) {
  try {
    const { data, error } = await supabase
      .from("Transactions Ids")
      .insert({ id: txId });

    if (error) {
      throw new Error(
        `SupabaseError: query failed: \n${JSON.stringify(error)}`
      );
    }
  } catch (error) {
    return error;
  }
}

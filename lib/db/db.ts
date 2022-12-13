import supabase from "./supabase";

export async function checkIfTxInDb(txId: string) {
  try {
    const { data, error } = await supabase
      .from("Transactions Ids")
      .select("id")
      .eq("id", txId);

    console.log("Data form checkIf:", data);
    console.log("Error form checkIf:", error);

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

    console.log("Data form addIn:", data);
    console.log("Error form addIn:", error);

    if (error) {
      throw new Error(
        `SupabaseError: query failed: \n${JSON.stringify(error)}`
      );
    }

    return data;
  } catch (error) {
    return error;
  }
}

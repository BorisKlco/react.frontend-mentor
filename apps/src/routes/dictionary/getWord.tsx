export async function getWord({
  queryKey,
}: {
  queryKey: string[] | undefined;
}) {
  console.log("fetching", queryKey);
  if (!queryKey) return [];
  console.log("qKey not empty", queryKey);
  const word = queryKey[1];
  console.log("destructing Word", queryKey);
  if (!word.length) return [];
  console.log("Word is not empty", queryKey);

  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  if (res.status === 404) {
    return [{ error: "not found" }];
  }
  if (!res.ok) {
    throw new Error("error Fetch");
  }

  return res.json();
}

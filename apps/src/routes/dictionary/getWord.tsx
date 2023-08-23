export async function getWord({
  queryKey,
}: {
  queryKey: string[] | undefined;
}) {
  if (!queryKey) return [];
  const word = queryKey[1];
  if (!word.length) return [];

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

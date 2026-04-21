export type Country = { country_id: string; probability: number };
export type NationalizeResponse = {
  count: number;
  name: string;
  country: Country[];
};

export async function fetchNationalize(name: string, signal?: AbortSignal) {
  const url = `https://api.nationalize.io/?name=${encodeURIComponent(name)}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as NationalizeResponse;
}

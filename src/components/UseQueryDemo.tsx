import React, { useState } from "react";
import { useNationalize } from "../hooks/useNationalize";
import type { Country } from "../api/nationalize";

export default function UseQueryDemo() {
  const [name, setName] = useState("");
  const [query, setQuery] = useState<string | null>(null); // last submitted name

  // useQuery() effect used here
  const { data, isLoading, error } = useNationalize(query);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Disable default HTML behavior of refreshing the page on form submit
    setQuery(name.trim() || null);
  }

  const countries: Country[] = data?.country ?? []; // if data exists, get the countries. If no countries, return empty array

  return (
    <div className="card">
      <h2>useQuery() example</h2>
      <section>
        <h3 style={{ marginBottom: 12 }}>Guess countries from a name</h3>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <input
            aria-label="name"
            placeholder="Enter a name"
            value={name}
            onChange={(e) => setName(e.target.value)} // when there's an event on this input, setName with the input value (e.target.value)
            style={{
              padding: "6px 8px",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "1px solid transparent",
              backgroundColor:
                isLoading || !name.trim() ? "#9ca3af" : "#4f46e5",
              color: "#ffffff",
            }}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && (
          <div style={{ color: "crimson" }}>Error: {error.message}</div>
        )}

        {!error && !isLoading && countries.length === 0 && query && (
          <div>No results for “{query}”.</div>
        )}

        {!error && countries.length > 0 && (
          <ol>
            {countries.slice(0, 3).map((c: Country) => (
              <li key={c.country_id}>
                {c.country_id} — {(c.probability * 100).toFixed(1)}%
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}

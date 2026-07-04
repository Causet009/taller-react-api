import { useEffect, useState } from "react";
import Header from "./components/Header";
import CharacterList from "./components/CharacterList";
import Stats from "./components/Stats";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getCharacters() {
      try {
        const response = await fetch("https://rickandmortyapi.com/api/character");

        if (!response.ok) {
          throw new Error("No se pudo cargar la información");
        }

        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        setError("Ocurrió un error al consultar la API");
      } finally {
        setLoading(false);
      }
    }

    getCharacters();
  }, []);

  return (
    <>
      <Header />

      <main className="container">
        <Stats total={characters.length} />

        {loading && <p className="message">Cargando personajes...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && <CharacterList characters={characters} />}
      </main>
    </>
  );
}

export default App;
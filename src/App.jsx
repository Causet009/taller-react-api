import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CharacterList from "./components/CharacterList";
import FavoritesPanel from "./components/FavoritesPanel";
import Stats from "./components/Stats";

function App() {
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
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

  function handleToggleFavorite(character) {
    const characterIsFavorite = favorites.some(
      (favorite) => favorite.id === character.id
    );

    if (characterIsFavorite) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.id !== character.id
      );

      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, character]);
    }
  }

  function handleRemoveFavorite(characterId) {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== characterId
    );

    setFavorites(updatedFavorites);
  }

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />

      <main className="container">
        <Stats
          total={characters.length}
          favoritesCount={favorites.length}
          blockedCount={0}
        />

        <SearchBar search={search} setSearch={setSearch} />

        {loading && <p className="message">Cargando personajes...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <div className="layout">
            <section>
              {filteredCharacters.length === 0 && (
                <p className="message">No se encontraron personajes.</p>
              )}

              {filteredCharacters.length > 0 && (
                <CharacterList
                  characters={filteredCharacters}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              )}
            </section>

            <FavoritesPanel
              favorites={favorites}
              onRemoveFavorite={handleRemoveFavorite}
            />
          </div>
        )}
      </main>
    </>
  );
}

export default App;
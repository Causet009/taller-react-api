import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CharacterList from "./components/CharacterList";
import FavoritesPanel from "./components/FavoritesPanel";
import BlockedPanel from "./components/BlockedPanel";
import Stats from "./components/Stats";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useLocalStorage("rick-favorites", []);
  const [blocked, setBlocked] = useLocalStorage("rick-blocked", []);
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

  function handleBlockCharacter(character) {
    const characterIsBlocked = blocked.some(
      (blockedCharacter) => blockedCharacter.id === character.id
    );

    if (!characterIsBlocked) {
      setBlocked([...blocked, character]);
    }

    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== character.id
    );

    setFavorites(updatedFavorites);
  }

  function handleUnblockCharacter(characterId) {
    const updatedBlocked = blocked.filter(
      (blockedCharacter) => blockedCharacter.id !== characterId
    );

    setBlocked(updatedBlocked);
  }

  const filteredCharacters = characters.filter((character) => {
    const matchesSearch = character.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const isBlocked = blocked.some(
      (blockedCharacter) => blockedCharacter.id === character.id
    );

    return matchesSearch && !isBlocked;
  });

  return (
    <>
      <Header />

      <main className="container">
        <Stats
          total={characters.length}
          favoritesCount={favorites.length}
          blockedCount={blocked.length}
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
                  onBlockCharacter={handleBlockCharacter}
                />
              )}
            </section>

            <div className="side-column">
              <FavoritesPanel
                favorites={favorites}
                onRemoveFavorite={handleRemoveFavorite}
              />

              <BlockedPanel
                blocked={blocked}
                onUnblockCharacter={handleUnblockCharacter}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
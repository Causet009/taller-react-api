import CharacterCard from "./CharacterCard";

function CharacterList({ characters, favorites, onToggleFavorite }) {
  return (
    <section className="grid">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          isFavorite={favorites.some((favorite) => favorite.id === character.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  );
}

export default CharacterList;
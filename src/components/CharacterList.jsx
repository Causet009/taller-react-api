import CharacterCard from "./CharacterCard";

function CharacterList({
  characters,
  favorites,
  onToggleFavorite,
  onBlockCharacter,
}) {
  return (
    <section className="grid">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          isFavorite={favorites.some((favorite) => favorite.id === character.id)}
          onToggleFavorite={onToggleFavorite}
          onBlockCharacter={onBlockCharacter}
        />
      ))}
    </section>
  );
}

export default CharacterList;
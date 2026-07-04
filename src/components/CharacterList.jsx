import CharacterCard from "./CharacterCard";

function CharacterList({ characters }) {
  return (
    <section className="grid">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </section>
  );
}

export default CharacterList;
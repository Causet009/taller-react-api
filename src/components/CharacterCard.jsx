function CharacterCard({ character }) {
  return (
    <article className="card">
      <img src={character.image} alt={character.name} />

      <div className="card-body">
        <h3>{character.name}</h3>

        <p>
          <strong>Especie:</strong> {character.species}
        </p>

        <p>
          <strong>Estado:</strong> {character.status}
        </p>
      </div>
    </article>
  );
}

export default CharacterCard;
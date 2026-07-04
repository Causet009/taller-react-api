function CharacterCard({ character, isFavorite, onToggleFavorite }) {
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

        <div className="card-actions">
          <button
            className={isFavorite ? "btn favorite active" : "btn favorite"}
            onClick={() => onToggleFavorite(character)}
          >
            {isFavorite ? "Quitar favorito" : "Agregar favorito"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default CharacterCard;
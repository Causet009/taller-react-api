function FavoritesPanel({ favorites, onRemoveFavorite }) {
  return (
    <aside className="side-panel">
      <h2>Favoritos</h2>

      {favorites.length === 0 && (
        <p className="empty-text">Todavía no hay favoritos.</p>
      )}

      {favorites.map((character) => (
        <div className="favorite-item" key={character.id}>
          <img src={character.image} alt={character.name} />

          <div>
            <h4>{character.name}</h4>
            <button onClick={() => onRemoveFavorite(character.id)}>
              Quitar
            </button>
          </div>
        </div>
      ))}
    </aside>
  );
}

export default FavoritesPanel;
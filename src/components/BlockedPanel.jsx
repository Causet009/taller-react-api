function BlockedPanel({ blocked, onUnblockCharacter }) {
  return (
    <aside className="side-panel">
      <h2>Bloqueados</h2>

      {blocked.length === 0 && (
        <p className="empty-text">No hay personajes bloqueados.</p>
      )}

      {blocked.map((character) => (
        <div className="favorite-item" key={character.id}>
          <img src={character.image} alt={character.name} />

          <div>
            <h4>{character.name}</h4>
            <button onClick={() => onUnblockCharacter(character.id)}>
              Desbloquear
            </button>
          </div>
        </div>
      ))}
    </aside>
  );
}

export default BlockedPanel;
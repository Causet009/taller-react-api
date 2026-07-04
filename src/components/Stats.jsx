function Stats({ total, favoritesCount, blockedCount }) {
  return (
    <section className="stats">
      <div>
        <strong>{total}</strong>
        <span>Total</span>
      </div>

      <div>
        <strong>{favoritesCount}</strong>
        <span>Favoritos</span>
      </div>

      <div>
        <strong>{blockedCount}</strong>
        <span>Bloqueados</span>
      </div>
    </section>
  );
}

export default Stats;
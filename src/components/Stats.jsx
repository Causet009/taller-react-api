function Stats({ total }) {
  return (
    <section className="stats">
      <div>
        <strong>{total}</strong>
        <span>Total</span>
      </div>

      <div>
        <strong>0</strong>
        <span>Favoritos</span>
      </div>

      <div>
        <strong>0</strong>
        <span>Bloqueados</span>
      </div>
    </section>
  );
}

export default Stats;
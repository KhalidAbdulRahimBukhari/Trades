/**
 * StatsBar
 * Displays 4 computed stats above the trade table.
 * All values are derived client-side from the trades array — no extra API call.
 */
function StatsBar({ stats }) {
  const cards = [
    {
      label: 'Total Trades',
      value: stats.total,
      className: 'stat-total',
      icon: '◈',
    },
    {
      label: 'Total Volume',
      value: `$${stats.volume.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      className: 'stat-volume',
      icon: '◎',
    },
    {
      label: 'Pending',
      value: stats.pending,
      className: 'stat-pending',
      icon: '◷',
    },
    {
      label: 'Settled',
      value: stats.settled,
      className: 'stat-settled',
      icon: '◉',
    },
  ]

  return (
    <div className="stats-bar">
      {cards.map(card => (
        <div key={card.label} className={`stat-card ${card.className}`}>
          <span className="stat-icon">{card.icon}</span>
          <div className="stat-body">
            <span className="stat-value">{card.value}</span>
            <span className="stat-label">{card.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsBar

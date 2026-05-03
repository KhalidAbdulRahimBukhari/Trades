import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Colors match CSS status badge palette
const COLORS = {
  PENDING:  '#f59e0b',
  SETTLED:  '#10b981',
}

/**
 * TradeChart
 * Shows a pie chart of PENDING vs SETTLED trade count.
 * Uses Recharts — installed via: npm install recharts
 *
 * If there are no trades yet, it shows an empty state instead of
 * a broken chart.
 */
function TradeChart({ stats }) {
  if (stats.total === 0) {
    return (
      <div className="card chart-card">
        <h2>Distribution</h2>
        <div className="chart-empty">No trades to display yet.</div>
      </div>
    )
  }

  // Recharts needs an array of { name, value }
  const data = [
    { name: 'Pending',  value: stats.pending  },
    { name: 'Settled',  value: stats.settled  },
  ].filter(d => d.value > 0) // hide zero slices so the chart looks clean

  // Custom label inside each slice: show percentage
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.08) return null // don't label tiny slices
    const RADIAN = Math.PI / 180
    const r = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + r * Math.cos(-midAngle * RADIAN)
    const y = cy + r * Math.sin(-midAngle * RADIAN)
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
            fontSize={13} fontWeight={600} fontFamily="IBM Plex Mono">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="card chart-card">
      <h2>Distribution</h2>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={85}
            dataKey="value"
            labelLine={false}
            label={renderLabel}
            strokeWidth={2}
            stroke="var(--bg)"
          >
            {data.map(entry => (
              <Cell
                key={entry.name}
                fill={COLORS[entry.name.toUpperCase()]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} trade${value !== 1 ? 's' : ''}`, name]}
            contentStyle={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              fontFamily: 'IBM Plex Mono',
              fontSize: '12px',
            }}
          />
          <Legend
            formatter={(value) => (
              <span style={{ fontFamily: 'IBM Plex Sans', fontSize: '13px', color: 'var(--text-secondary)' }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TradeChart

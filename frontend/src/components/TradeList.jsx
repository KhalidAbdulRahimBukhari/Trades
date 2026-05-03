/**
 * TradeList
 * Renders the filtered + sorted trades as a table.
 *
 * New in this version:
 *  - Settle button is disabled while the request is in-flight (settlingIds)
 *  - Optimistic update already applied by useTrades hook before this renders
 *  - Improved empty state message that distinguishes "no trades" from "no matches"
 */
function TradeList({ trades, totalCount, settlingIds, onSettle }) {
  // No trades at all vs filters produced no results
  if (totalCount === 0) {
    return (
      <div className="card">
        <div className="empty-state">
          <span className="empty-icon">◈</span>
          <p className="empty-title">No trades yet</p>
          <p className="empty-sub">Use the form above to submit your first trade.</p>
        </div>
      </div>
    )
  }

  if (trades.length === 0) {
    return (
      <div className="card">
        <div className="empty-state">
          <span className="empty-icon">⌕</span>
          <p className="empty-title">No matches</p>
          <p className="empty-sub">Try adjusting your search or filter.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card table-card">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Volume</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trades.map(trade => {
              const isSettling = settlingIds.has(trade.id)

              return (
                <tr key={trade.id} className={isSettling ? 'row-settling' : ''}>
                  <td className="td-id">#{trade.id}</td>
                  <td className="td-product">{trade.product}</td>
                  <td>{trade.quantity.toLocaleString()}</td>
                  <td>${trade.price.toLocaleString()}</td>
                  {/* Computed volume shown inline */}
                  <td className="td-volume">
                    ${(trade.quantity * trade.price).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </td>
                  <td>
                    <span className={`badge badge-${trade.status.toLowerCase()}`}>
                      {trade.status}
                    </span>
                  </td>
                  <td>
                    {trade.status === 'PENDING' ? (
                      <button
                        className="btn-settle"
                        onClick={() => onSettle(trade.id)}
                        disabled={isSettling}
                        title={isSettling ? 'Settling…' : 'Mark as settled'}
                      >
                        {isSettling ? (
                          <span className="spinner" />
                        ) : (
                          'Settle'
                        )}
                      </button>
                    ) : (
                      <span className="td-done">✓</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TradeList

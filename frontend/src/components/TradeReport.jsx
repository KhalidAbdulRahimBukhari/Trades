/**
 * Shows the trade report: total count and total volume.
 * Data is fetched by the parent (App.jsx) and passed as props.
 */
function TradeReport({ report }) {
  if (!report) {
    return (
      <div className="card">
        <h2>Report</h2>
        <p>Loading report...</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Report</h2>
      <div className="report-grid">
        <div className="report-item">
          <span className="report-label">Total Trades</span>
          <span className="report-value">{report.totalTrades}</span>
        </div>
        <div className="report-item">
          <span className="report-label">Total Volume</span>
          <span className="report-value">${report.totalVolume.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

export default TradeReport

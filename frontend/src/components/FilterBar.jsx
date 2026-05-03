/**
 * FilterBar
 * Three controls that let the user narrow down the trade list:
 *  1. Text search by product name
 *  2. Status filter: ALL / PENDING / SETTLED
 *  3. Sort: Newest / Price / Quantity
 *
 * All state lives in the parent (via useTrades hook) — this component
 * is purely presentational and calls the setters passed as props.
 */
function FilterBar({ searchQuery, setSearchQuery, statusFilter, setStatusFilter, sortBy, setSortBy, visibleCount, totalCount }) {
  const statusOptions = ['ALL', 'PENDING', 'SETTLED']
  const sortOptions = [
    { value: 'newest',   label: 'Newest first' },
    { value: 'price',    label: 'Price ↓' },
    { value: 'quantity', label: 'Quantity ↓' },
  ]

  return (
    <div className="filter-bar">
      {/* Search input */}
      <div className="filter-search">
        <span className="filter-search-icon">⌕</span>
        <input
          type="text"
          placeholder="Search product..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="filter-input"
        />
        {searchQuery && (
          <button className="filter-clear-btn" onClick={() => setSearchQuery('')}>✕</button>
        )}
      </div>

      {/* Status filter pills */}
      <div className="filter-pills">
        {statusOptions.map(opt => (
          <button
            key={opt}
            className={`pill ${statusFilter === opt ? 'pill-active' : ''}`}
            onClick={() => setStatusFilter(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <select
        className="filter-select"
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
      >
        {sortOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {/* Result count */}
      <span className="filter-count">
        {visibleCount === totalCount
          ? `${totalCount} trade${totalCount !== 1 ? 's' : ''}`
          : `${visibleCount} of ${totalCount}`}
      </span>
    </div>
  )
}

export default FilterBar

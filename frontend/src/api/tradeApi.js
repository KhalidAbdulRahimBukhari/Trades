// All API calls live here. Backend is unchanged.
// If you move the backend, only update BASE_URL.

const BASE_URL = 'http://localhost:8080/api/trades'

export async function createTrade(tradeData) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tradeData),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to create trade')
  }
  return response.json()
}

export async function fetchAllTrades() {
  const response = await fetch(BASE_URL)
  if (!response.ok) throw new Error('Failed to fetch trades')
  return response.json()
}

export async function settleTrade(id) {
  const response = await fetch(`${BASE_URL}/${id}/settle`, { method: 'POST' })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to settle trade')
  }
  return response.json()
}

export async function fetchReport() {
  const response = await fetch(`${BASE_URL}/report`)
  if (!response.ok) throw new Error('Failed to fetch report')
  return response.json()
}

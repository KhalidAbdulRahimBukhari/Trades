import { useState } from 'react'
import { createTrade } from '../api/tradeApi'

/**
 * CreateTradeForm
 * Lets the user submit a new trade.
 *
 * Improvements over original:
 *  - Submit button disabled + shows "Submitting…" during API call
 *  - Auto-dismissing success message (clears after 3s)
 *  - Input validation feedback inline
 */
function CreateTradeForm({ onTradeCreated }) {
  const [product,  setProduct]  = useState('')
  const [quantity, setQuantity] = useState('')
  const [price,    setPrice]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)
  const [success,  setSuccess]  = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await createTrade({
        product,
        quantity: parseFloat(quantity),
        price:    parseFloat(price),
      })

      // Reset form
      setProduct('')
      setQuantity('')
      setPrice('')
      setSuccess(true)
      onTradeCreated()

      // Auto-dismiss success banner after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card form-card">
      <h2>New Trade</h2>
      <form onSubmit={handleSubmit} className="trade-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <input
              id="product"
              type="text"
              placeholder="e.g. Electricity"
              value={product}
              onChange={e => setProduct(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              placeholder="e.g. 100"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              min="0.01"
              step="any"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              id="price"
              type="number"
              placeholder="e.g. 50"
              value={price}
              onChange={e => setPrice(e.target.value)}
              min="0.01"
              step="any"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group form-submit-group">
            <label>&nbsp;</label>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? (
                <><span className="spinner" /> Submitting…</>
              ) : (
                '+ Submit Trade'
              )}
            </button>
          </div>
        </div>

        {success && (
          <div className="msg msg-success">
            ✓ Trade submitted successfully
          </div>
        )}
        {error && (
          <div className="msg msg-error">
            ✕ {error}
          </div>
        )}
      </form>
    </div>
  )
}

export default CreateTradeForm

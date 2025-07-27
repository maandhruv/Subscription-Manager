'use client';

import { useAuth } from "@/context/authContext";

const SubscriptionForm = (props) => {
  const { closeInput, formData, handleChange, handleResetForm } = props
  const { handleAddSubscription } = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    handleAddSubscription(formData);
    handleResetForm();
    closeInput();
  }

  return (
    <section>
      <h2>Add a new Subscription</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Subscription Name</span>
          <input value={formData.name} onChange={handleChange} type="text" name="name" placeholder='e.g. Netlfix, Spotify, AWS hosting' required />
        </label>
        <label>
          <span>Category</span>
          <select name="category" value={formData.category} onChange={handleChange}>
            {['Entertainment', 'Music','Software', 'Food', 'Health', 'Other'].map((category, catIndex) => (
              <option key={catIndex}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Cost</span>
          <input value={formData.cost} onChange={handleChange} type="number" name="cost" step="0.01" placeholder='e.g. 9.99' required />
        </label>
        <label>
          <span>Currency</span>
          <select name="currency" value={formData.currency} onChange={handleChange}>
            {['USD'].map((currency, currIndex) => (
              <option key={currIndex}>
                {currency}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Billing Frequency</span>
          <select name="billingFrequency" value={formData.billingFrequency} onChange={handleChange}>
            {['Monthly', 'Quarterly', 'Yearly', 'One-time'].map((frequency, freqIndex) => (
              <option key={freqIndex}>
                {frequency}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Payment Method</span>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            {['Credit Card', 'PayPal', 'Bank Transfer', 'Cryptocurrency'].map((method, methodIndex) => (
              <option key={methodIndex}>
                {method}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Start Date</span>
          <input value={formData.startDate} onChange={handleChange} type="date" name="startDate" required />
        </label>
        <label>
          <span>Status</span>
          <select name="status" value={formData.status} onChange={handleChange}>
            {['Active', 'Paused', 'Cancelled'].map((status, statusIndex) => (
              <option key={statusIndex}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label className="fat-column">
          <span>Notes</span>
          <textarea value={formData.notes} onChange={handleChange} name="notes" placeholder="e.g. Shared with family, includes cloud storage" />
        </label>
        <div className="fat-column form-submit-btns">
          <button onClick={closeInput}>Cancel</button>
          <button type="submit">Add Subscription</button>
        </div>
      </form>
    </section>
  )
}

export default SubscriptionForm

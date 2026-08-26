function AddApplicationForm({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        required
      />

      <input
        name="job_title"
        placeholder="Job Title"
        value={formData.job_title}
        onChange={handleChange}
        required
      />

      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="applied">Applied</option>
        <option value="interviewing">Interviewing</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>

      <input
        name="salary"
        placeholder="Salary"
        value={formData.salary}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date_applied"
        value={formData.date_applied}
        onChange={handleChange}
      />

      <input
        name="url"
        placeholder="Job Link"
        value={formData.job_link}
        onChange={handleChange}
      />

      <input
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
      />

      <button type="submit">Add Application</button>
    </form>
  )
}

export default AddApplicationForm
import AddApplicationForm from "../components/AddApplicationForm"
import ApplicationList from "../components/ApplicationList"


function Applications({ 
  applications,
  handleStatusUpdate,
  handleEditClick,
  handleDelete,
  editingApplication,
  editFormData,
  handleEditChange,
  handleEditSubmit,
  setEditingApplication,
  formData,
  handleChange,
  handleSubmit,
 }) {
  return (
    <>
      <h1>Applications</h1>

      <AddApplicationForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {editingApplication && (
        <form onSubmit={handleEditSubmit}>
          <input
            name="company"
            value={editFormData.company}
            onChange={handleEditChange}
          />

          <input
            name="job_title"
            value={editFormData.job_title}
            onChange={handleEditChange}
          />

          <input
            name="location"
            value={editFormData.location}
            onChange={handleEditChange}
          />

          <select
            name="status"
            value={editFormData.status}
            onChange={handleEditChange}
          >
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>

          <input
            name="salary"
            placeholder="Salary"
            value={editFormData.salary}
            onChange={handleEditChange}
          />

          <input
            type="date"
            name="date_applied"
            value={editFormData.date_applied}
            onChange={handleEditChange}
          />

          <input
            name="job_link"
            placeholder="Job Link"
            value={editFormData.job_link}
            onChange={handleEditChange}
          />

          <input
            name="notes"
            placeholder="Notes"
            value={editFormData.notes}
            onChange={handleEditChange}
          />

          <button type="submit">Save Changes</button>

          <button type="button" onClick={() => setEditingApplication(null)}>
            Cancel
          </button>
        </form>
      )}

      <ApplicationList
        applications={applications}
        handleStatusUpdate={handleStatusUpdate}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default Applications
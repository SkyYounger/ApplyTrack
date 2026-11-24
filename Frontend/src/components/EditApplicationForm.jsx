function EditApplicationForm({
    editFormData,
    handleEditChange,
    handleEditSubmit,
    setEditingApplication,
    setEditFormData,
}) {
    return (
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

          {editFormData.status === "interviewing" && (
            <div className="form-field">
              <label>Interview Date</label>

              <input
                type="date"
                name="interview_date"
                value={editFormData.interview_date}
                onChange={handleEditChange}
              />
            </div>
          )}

          <div className="form-field">
            <label htmlFor="edit-follow-up-date">
              Follow-Up Date
            </label>

            <input
              type="date"
              id="edit-follow-up-date"
              name="follow_up_date"
              value={editFormData.follow_up_date}
              onChange={handleEditChange}
            />
          </div>

          <label className="follow-up-checkbox">
            <input
            type="checkbox"
            name="follow_up_completed"
            checked={editFormData.follow_up_completed}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                follow_up_completed: e.target.checked
              })
            }
            />
            Follow-up completed
          </label>

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            min="0"
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
    )
}

export default EditApplicationForm
function ApplicationList({
  applications,
  handleStatusUpdate,
  handleEditClick,
  handleDelete,
}) {
  return (
    <>
      {applications.map((application) => (
        <div className="application-card" key={application.id}>
          <div className="application-main">
            <div>
              <h3>{application.company}</h3>
              <p>{application.job_title}</p>
            </div>

            <div className="application-details">
              <span>📍 {application.location || "No location"}</span>
              <span>💰 {application.salary || "No salary"}</span>
              <span>📅 {application.date_applied || "No date"}</span>
            </div>

            <div>
              <select
                className={`status status-select ${application.status}`}
                value={application.status}
                onChange={(event) =>
                  handleStatusUpdate(application.id, event.target.value, application)
                }
              >
                <option value="applied">APPLIED</option>
                <option value="interviewing">INTERVIEWING</option>
                <option value="offer">OFFER</option>
                <option value="rejected">REJECTED</option>
              </select>
            </div>
          </div>

          {application.notes && (
            <p className="application-notes">
              📝 {application.notes}
            </p>
          )}

          <div className="application-actions">
            <a
              href={application.job_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 View Job Posting
            </a>

            <div className="action-buttons">
              <button onClick={() => handleEditClick(application)}>
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(application.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default ApplicationList
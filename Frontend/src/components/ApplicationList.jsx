import { Fragment } from "react"
import { Link } from "react-router-dom"
import { formatCurrency } from "../utils/formatCurrency"
import EditApplicationForm from "./EditApplicationForm"

function ApplicationList({
  applications,
  handleStatusUpdate,
  handleEditClick,
  handleDelete,
  editingApplication,
  editFormData,
  handleEditChange,
  handleEditSubmit,
  setEditingApplication,
  setEditFormData,
}) {
  return (
    <>
      {applications.map((application) => (
        <Fragment key={application.id}>
          <div className="application-card">
            <div className="application-main">
              <div>
                <h3>{application.company}</h3>
                <p>{application.job_title}</p>
              </div>

              <div className="application-details">
                <span> {application.location || "No location"}</span>
                <span> {formatCurrency(application.salary)}</span>
                <span> {application.date_applied || "No date"}</span>
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
                {application.notes}
              </p>
            )}

            <div className="application-actions">
              {application.job_link && (
                <a
                  href={application.job_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Job Posting
                </a>
              )}

              <div className="action-buttons">
                <Link
                  className="details-btn"
                  to={`/applications/${application.id}`}
                >
                  View Details
                </Link>

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
          {editingApplication?.id === application.id && (
            <EditApplicationForm
              editFormData={editFormData}
              handleEditChange={handleEditChange}
              handleEditSubmit={handleEditSubmit}
              setEditingApplication={setEditingApplication}
              setEditFormData={setEditFormData}
            />
          )}
        </Fragment>
      ))}
    </>
  )
}

export default ApplicationList

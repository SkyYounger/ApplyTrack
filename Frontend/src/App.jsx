import "./App.css"
import { useEffect, useState } from "react"

function App() {
  const [applications, setApplications] = useState([])

  const [formData, setFormData] = useState({
    company: "",
    job_title: "",
    status: "applied",
    salary: "",
    location: "",
    date_applied: "",
    job_link: "",
    notes: "",
  })

  const [editFormData, setEditFormData] = useState({
    company: "",
    job_title: "",
    status: "applied",
    salary: "",
    location: "",
    date_applied: "",
    job_link: "",
    notes: "",
  })

  const [editingApplication, setEditingApplication] = useState(null)

  const totalApplications = applications.length

  const applied = applications.filter(
    (application) => application.status.toLowerCase() === "applied"
  ).length

  const interviewing = applications.filter(
    (application) => application.status.toLowerCase() === "interviewing"
  ).length

  const offers = applications.filter(
    (application) => application.status.toLowerCase() === "offer"
  ).length

  const rejected = applications.filter(
    (application) => application.status.toLowerCase() === "rejected"
  ).length

  useEffect(() => {
    fetch("http://127.0.0.1:8000/applications")
      .then((response) => response.json())
      .then((data) => setApplications(data))
  }, [])

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  function handleEditChange(event) {
    setEditFormData({
      ...editFormData,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    fetch("http://127.0.0.1:8000/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newApplication) => {
        setApplications([...applications, newApplication])

        setFormData({
          company: "",
          job_title: "",
          status: "applied",
          salary: "",
          location: "",
          date_applied: "",
          job_link: "",
          notes: "",
        })
      })
  }

  function handleDelete(id) {
    fetch(`http://127.0.0.1:8000/applications/${id}`, {
      method: "DELETE",
    }).then(() => {
      setApplications(
        applications.filter((application) => application.id !== id)
      )
    })
  }

  function handleEditClick(application) {
    setEditingApplication(application)

    setEditFormData({
      company: application.company,
      job_title: application.job_title,
      status: application.status,
      salary: application.salary,
      location: application.location,
      date_applied: application.date_applied,
      job_link: application.job_link,
      notes: application.notes,
    })
  }

  function handleEditSubmit(event) {
    event.preventDefault()

    fetch (`http://127.0.0.1:8000/applications/${editingApplication.id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFormData),
    })
      .then((response) => response.json())
      .then((updatedApplication) => {
        setApplications(
          applications.map((application) =>
          application.id === updatedApplication.id ? updatedApplication: application
        )
        )
        setEditingApplication(null)
      })
  }

  function handleStatusUpdate(id, newStatus, application) {
    const updatedApplication = {
      ...application,
      status: newStatus,
    }

    fetch(`http://127.0.0.1:8000/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedApplication),
    })
      .then((response) => response.json())
      .then((updatedData) => {
        setApplications(
          applications.map((app) =>
            app.id === id ? updatedData : app
          )
        )
      })
  }
   

  return (
    <div className="container">
      <h1>ApplyTrack</h1>
      <p>Job Application Tracker</p>

      <div className="stats">
        <div className="card">
          <h2>{totalApplications}</h2>
          <p>Total</p>
        </div>

        <div className="card">
          <h2>{applied}</h2>
          <p>Applied</p>
        </div>

        <div className="card">
          <h2>{interviewing}</h2>
          <p>Interviewing</p>
        </div>

        <div className="card">
          <h2>{offers}</h2>
          <p>Offers</p>
        </div>

        <div className="card">
          <h2>{rejected}</h2>
          <p>Rejected</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />

        <input
          name="job_title"
          placeholder="Job Title"
          value={formData.job_title}
          onChange={handleChange}
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
          name="job_link"
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

      <h2>Applications</h2>

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

          <button type="submit">
            Save Changes
          </button>

          <button type="button" onClick={() => setEditingApplication(null)}>
            Cancel
          </button>
        </form>
      )}

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
    </div>
  )
}

export default App
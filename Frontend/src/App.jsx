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

            <span className={`status ${application.status}`}>
              {application.status}
            </span>
          </div>

          <div className="application-actions">
            <a
              href={application.job_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 View Job Posting
            </a>

            <button
              className="delete-btn"
              onClick={() => handleDelete(application.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
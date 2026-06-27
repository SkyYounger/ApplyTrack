import "./App.css"
import { useEffect, useState } from "react"

function App() {
  const [applications, setApplications] = useState([])

  const [formData, setFormData] = useState({
    company: "",
    job_title: "",
    status: "",
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
      })

      setFormData({
        company: "",
        job_title: "",
        status: "",
        salary: "",
        location: "",
        date_applied: "",
        job_link: "",
        notes: "",
      })
        }
       
  function handleDelete(id) {
    fetch(`http://127.0.0.1:8000/applications/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setApplications(applications.filter((application) => application.id !== id))
      })
  }      


  return (
    <div className="container">
      <h1>ApplyTrack</h1>
      <p>Job Application Tracker</p>

      <div className="stats">
        <div className="card">Total: {totalApplications}</div>
        <div className="card">Applied: {applied}</div>
        <div className="card">Interviewing: {interviewing}</div>
        <div className="card">Offers: {offers}</div>
        <div className="card">Rejected: {rejected}</div>
      </div>

      <form onSubmit={handleSubmit}>
        <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} />
        <input name="job_title" placeholder="Job Title" value={formData.job_title} onChange={handleChange} />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="applied">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <input name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
        <input
          type="date"
          name="date_applied"
          value={formData.date_applied}
          onChange={handleChange}
        />
        <input name="date_applied" placeholder="Date Applied" value={formData.date_applied} onChange={handleChange} />
        <input name="job_link" placeholder="Job Link" value={formData.job_link} onChange={handleChange} />
        <input name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />

        <button type="submit">Add Application</button>
      </form>

      <h2>Applications</h2>

      {applications.map((application) => (
        <div className="card" key={application.id}>
          <h3>{application.company}</h3>
          <p>{application.job_title}</p>
          <p>{application.status}</p>
          <a href={application.job_link} target="_blank">
            View Job Posting
          </a>

          <button onClick={() => handleDelete(application.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default App
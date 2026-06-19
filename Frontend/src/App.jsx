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

      <form onSubmit={handleSubmit}>
        <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} />
        <input name="job_title" placeholder="Job Title" value={formData.job_title} onChange={handleChange} />
        <input name="status" placeholder="Status" value={formData.status} onChange={handleChange} />
        <input name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
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

          <button onClick={() => handleDelete(application.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default App
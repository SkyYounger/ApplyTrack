import { useEffect, useState } from "react"

function App() {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/applications")
      .then((response) => response.json())
      .then((data) => setApplications(data))
  }, [])

  return (
    <div>
      <h1>ApplyTrack</h1>
      <p>Job Application Tracker</p>

      <h2>Applications</h2>

      {applications.map((application) => (
        <div key={application.id}>
          <h3>{application.company}</h3>
          <p>{application.job_title}</p>
          <p>{application.status}</p>
        </div>
      ))}
    </div>
  )
}

export default App
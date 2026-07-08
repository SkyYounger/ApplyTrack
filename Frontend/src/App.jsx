import "./App.css"
import { useEffect, useState } from "react"
import {Routes, Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Applications from "./pages/Applications"
import Navbar from "./components/Navbar"

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

  const [searchTerm, setSearchTerm] = useState("")

  const [statusFilter, setStatusFilter] = useState("all")

  const [sortOption, setSortOption] = useState("newest")

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

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = 
      statusFilter === "all" || application.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.date_applied) - new Date(a.date_applied)
    }
  
    if(sortOption === "oldest") {
      return new Date(a.date_applied) - new Date(b.date_applied)
    }

    if (sortOption === "company") {
      return a.company.localeCompare(b.company)
    }

    if (sortOption === "salary") {
      return Number(b.salary) - Number(a.salary)
    }

    return 0
  })

  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.date_applied) - new Date(a.date_applied))
    .slice(0, 3)


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
    <Navbar />

    <Routes>
      <Route path="/" element={<Dashboard applications={applications} />} />
      <Route path="/dashboard" element={<Dashboard applications={applications} />} />
      <Route 
        path="/applications" 
        element={
        <Applications 
          applications={sortedApplications} 
          handleStatusUpdate={handleStatusUpdate}
          handleEditClick={handleEditClick}
          handleDelete={handleDelete}
          editingApplication={editingApplication}
          editFormData={editFormData}
          handleEditChange={handleEditChange}
          handleEditSubmit={handleEditSubmit}
          setEditingApplication={setEditingApplication}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          />} />
    </Routes>
  </div>
  )
}

export default App
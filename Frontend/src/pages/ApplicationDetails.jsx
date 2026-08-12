import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getApplication } from "../api/applications"

function ApplicationDetails() {
    const { id } = useParams()

    const[application, setApplication] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        getApplication(id)
            .then((data) => {
                setApplication(data)
            })
            .catch(() => {
                setError("Application could not be found.")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    if(loading) {
        return <p>Loading application...</p>
    }

    if (error) {
        return (
            <div className="empty-state">
                <h2>{error}</h2>
                <Link to="applications">Back to applications</Link>
            </div>
        )
    }

    return (
        <section className="application-details-page">
            <Link className="back-link" to="/applications">
            Back to applications
            </Link>

            <div className="details-card">
                <div className="details-header">
                    <div>
                        <h1>{application.company}</h1>
                        <p>{application.job_title}</p>
                    </div>

                    <span className={`status ${application.status}`}>
                        {application.status}
                    </span>
                </div>
                
                <div className="details-grid">
                    <div>
                        <span className="details-label">Location</span>
                        <p>{application.location || "Not provided"}</p>
                    </div>

                    <div>
                        <span className="details-label">Salary</span>
                        <p>
                            {application.salary
                            ? `$${Number(application.salary).toLocaleString()}`
                            : "Not provided"}
                        </p>
                    </div>

                    <div>
                        <span className="details-label">Date applied</span>
                        <p>{application.date_applied || "Not provided"}</p>
                    </div>

                    <div>
                        <span className="details-label">Status</span>
                        <p>{application.status}</p>
                    </div>
                </div>

                <div className="details-notes">
                    <span className="details-label">Notes</span>
                    <p>{application.notes || "No notes added."}</p>
                </div>

                {application.job_link && (
                    <a
                        className="job-link-button"
                        href={application.job_link}
                        target="_blank"
                        rel="noreferrer"
                    >
                        View job posting
                    </a>
                )}
            </div>
        </section>
    )
}

export default ApplicationDetails
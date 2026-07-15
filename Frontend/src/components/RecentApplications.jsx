import { Link } from "react-router-dom"

function RecentApplications({ applications }) {
  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.date_applied) - new Date(a.date_applied))
    .slice(0, 3)

  return (
    <section className="recent-section">
      <div className="section-header">
        <h2>Recently Applied</h2>

        <Link to="/applications">
          View All
        </Link>
      </div>

      {recentApplications.length === 0 ? (
        <div className="recent-empty">
          <p>No applications yet.</p>
        </div>
      ) : (
        <div className="recent-list">
          {recentApplications.map((application) => (
            <div className="recent-card" key={application.id}>
              <div className="recent-card-top">
                <div>
                  <h3>{application.company}</h3>
                  <p>{application.job_title}</p>
                </div>

                <span className={`status recent-status ${application.status}`}>
                  {application.status}
                </span>
              </div>

              <div className="recent-card-details">
                <span>📍 {application.location || "No location"}</span>
                <span>📅 {application.date_applied || "No date"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default RecentApplications
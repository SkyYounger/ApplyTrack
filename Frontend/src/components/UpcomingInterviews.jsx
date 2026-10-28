import { Link } from "react-router-dom"

function UpcomingInterviews({ applications }) {
    const today = new Date().toLocaleDateString("en-CA")

    const upcomingInterviews = applications
        .filter((application) =>
            application.interview_date &&
            application.interview_date >= today &&
            application.status === "interviewing"
        )
        .sort((a, b) =>
            a.interview_date.localeCompare(b.interview_date)
        )
    
    return (
        <section className="upcoming-section">
            <div className="section-header">
                <h2>Upcoming Interviews</h2>
            </div>
            
            {upcomingInterviews.length === 0 ? (
                <div className="empty-state">
                    <p>No upcoming interviews scheduled.</p>
                </div>
                ) : (
                    <div className="upcoming-list">
                        {upcomingInterviews.map((application) => (
                            <Link
                                to={`/applications/${application.id}`}
                                className="upcoming-card"
                                key={application.id}
                                >
                                <div>
                                    <h3>{application.company}</h3>
                                    <p>{application.job_title}</p>
                            </div>

                            <div className="upcoming-date">
                                <span> Interview Date</span>
                                <strong>{application.interview_date}</strong>
                            </div>
                        </Link>
                        ))}
                    </div>
                )}


        </section>
    )
}

export default UpcomingInterviews
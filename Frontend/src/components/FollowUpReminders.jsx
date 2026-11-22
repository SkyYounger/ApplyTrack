import { Link } from "react-router-dom"

function FollowUpReminders({ applications }) {
    const now = new Date()

    const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),].join("-")

    const pendingFollowUps = applications
    .filter((application) =>
        application.follow_up_date &&
        !application.follow_up_completed
    )
    .sort((a, b) =>
        a.follow_up_date.localeCompare(b.follow_up_date))

    const overdueFollowUps = pendingFollowUps.filter(
        (application) => application.follow_up_date < today
    )

    const upcomingFollowUps = pendingFollowUps.filter(
        (application) => application.follow_up_date >= today
    )

    return (
        <section className="follow-up-section">
            <h2>Follow-Up Reminders</h2>

            <div className="follow-up-grid">
                
                <div className="follow-up-group">
                    <h3>Overdue ({overdueFollowUps.length})</h3>

                    {overdueFollowUps.length === 0 ? (
                        <p>No overdue follow-ups.</p>
                    ) : (
                        overdueFollowUps.map((application) =>(
                            <Link
                                to={`/applications/${application.id}`}
                                className="follow-up-card"
                                key={application.id}
                            >
                                <div>
                                    <h4>{application.company}</h4>
                                    <p>{application.job_title}</p>
                                </div>

                                <span className="follow-up-date overdue">
                                    {application.follow_up_date}
                                </span>
                            </Link>
                        ))
                    )}
                </div>

                <div className="follow-up-group">
                    <h3>Upcoming ({upcomingFollowUps.length})</h3>

                    {upcomingFollowUps.length === 0 ? (
                        <p>No upcoming follow-ups.</p>
                    ): (
                        upcomingFollowUps.map((application) => (
                            <Link
                                to={`/applications/${application.id}`}
                                className="follow-up-card"
                                key={application.id}
                            >
                                <div>
                                    <h4>{application.company}</h4>
                                    <p>{application.job_title}</p>
                                </div>

                                <span className="follow-up-date">
                                    {application.follow_up_date}
                                </span>
                            </Link>
                        ))
                    )}
                    
                </div>
            </div>
        </section>
    )
}

export default FollowUpReminders
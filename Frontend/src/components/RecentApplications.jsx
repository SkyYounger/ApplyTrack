function RecentApplications({ applications }) {
  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.date_applied) - new Date(a.date_applied))
    .slice(0, 3)

  return (
    <>
      <h2>Recently Applied</h2>

      {recentApplications.map((application) => (
        <div className="recent-card" key={application.id}>
          <h3>{application.company}</h3>
          <p>{application.job_title}</p>
          <span>{application.date_applied}</span>
        </div>
      ))}
    </>
  )
}

export default RecentApplications
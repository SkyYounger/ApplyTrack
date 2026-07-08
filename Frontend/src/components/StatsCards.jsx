function StatsCards({applications}) {
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

  return (
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
  )
}

export default StatsCards
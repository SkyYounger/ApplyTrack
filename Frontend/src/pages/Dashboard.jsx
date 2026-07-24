import RecentApplications from "../components/RecentApplications"
import StatsCards from "../components/StatsCards"
import ApplicationChart from "../components/ApplicationChart"

function Dashboard({ applications }) {
  return (
    <>
      <h1>Dashboard</h1>
      <p>Job Application Tracker</p>

      <StatsCards applications={applications} />

      <div className="dashboard-grid">
          <ApplicationChart applications={applications} />
          <RecentApplications applications={applications} />
      </div>

    </>
  )
}

export default Dashboard
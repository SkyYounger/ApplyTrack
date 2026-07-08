import RecentApplications from "../components/RecentApplications"
import StatsCards from "../components/StatsCards"

function Dashboard({ applications }) {
  return (
    <>
      <h1>Dashboard</h1>
      <p>Job Application Tracker</p>

      <StatsCards applications={applications} />

      <RecentApplications applications={applications} />
    </>
  )
}

export default Dashboard
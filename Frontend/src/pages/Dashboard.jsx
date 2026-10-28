import RecentApplications from "../components/RecentApplications"
import StatsCards from "../components/StatsCards"
import ApplicationChart from "../components/ApplicationChart"
import UpcomingInterviews from "../components/UpcomingInterviews"

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

      <UpcomingInterviews applications={applications} />
    </>
  )
}

export default Dashboard
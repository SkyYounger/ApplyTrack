import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar">
      <h2>ApplyTrack</h2>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/applications">Applications</Link>
      </div>
    </nav>
  )
}

export default Navbar
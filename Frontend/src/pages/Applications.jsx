import AddApplicationForm from "../components/AddApplicationForm"
import ApplicationList from "../components/ApplicationList"
import SearchToolbar from "../components/SearchToolbar"

function Applications({ 
  applications,
  handleStatusUpdate,
  handleEditClick,
  handleDelete,
  editingApplication,
  editFormData,
  handleEditChange,
  handleEditSubmit,
  setEditingApplication,
  formData,
  handleChange,
  handleSubmit,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortOption,
  setSortOption,
  setEditFormData,
 }) {
  return (
    <>
      <h1>Applications</h1>

      <SearchToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      <p className="results-count">
        {applications.length} application
        {applications.length !==1 ? "s" : ""} found
      </p>

      <AddApplicationForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {applications.length === 0 ? (
        <div className="empty-state">
          <h3>No applications found</h3>
          <p>Try changing your search or status filter.</p>
        </div>
      ) : (
        <ApplicationList
          applications={applications}
          handleStatusUpdate={handleStatusUpdate}
          handleEditClick={handleEditClick}
          handleDelete={handleDelete}
          editingApplication={editingApplication}
          editFormData={editFormData}
          handleEditChange={handleEditChange}
          handleEditSubmit={handleEditSubmit}
          setEditingApplication={setEditingApplication}
          setEditFormData={setEditFormData}
        />
      )}
    </>
  )
}

export default Applications

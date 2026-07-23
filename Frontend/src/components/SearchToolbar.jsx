function SearchToolbar({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortOption,
    setSortOption,
}) {
    return (
        <div className="search-section">
            <input
                className="search-input"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />

            <div className="toolbar">
                <div className="filter-buttons">
                    <button 
                        className={statusFilter === "all" ? "active-filter" : ""}
                        onClick={() => setStatusFilter("all")}
                    >
                        All
                    </button>

                    <button
                        className={statusFilter === "applied" ? "active-filter" : ""}
                        onClick={() => setStatusFilter("applied")}
                    >
                        Applied
                    </button>

                    <button
                        className={statusFilter === "interviewing" ? "active-filter" : ""}
                        onClick={() => setStatusFilter("interviewing")}
                    >
                        Interviewing
                    </button>

                    <button
                        className={statusFilter === "offer" ? "active-filter" : ""}
                        onClick={() => setStatusFilter("offer")}
                    >
                        Offer
                    </button>

                    <button
                        className={statusFilter === "rejected" ? "active-filter" : ""}
                        onClick={() => setStatusFilter("rejected")}
                    >
                        Rejected
                    </button>
                </div>

                <select
                    className="sort-select"
                    value={sortOption}
                    onChange={(event) => setSortOption(event.target.value)}
                >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="company">Company A-Z</option>
                    <option value="salary">Salary high to low</option>
                </select>
            </div>
        </div>
    )
}

export default SearchToolbar
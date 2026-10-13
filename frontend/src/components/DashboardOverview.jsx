function DashboardOverview() {
    return(
        <section className = "dashboard-overview">
            <div className = "task-overview">

                {/* Task statistics */}
                <h2>Task Overview</h2>

                <div className = "task-stats">
                    <div className = "stat-card">
                        <h3>Total Tasks</h3>
                        <p>0</p>
                    </div>

                    <div className = "stat-card">
                         <h3>Completed</h3>
                         <p>0</p>
                    </div>

                    <div className = "stat-card">
                         <h3>In Progress</h3>
                         <p>0</p>
                    </div>

                    <div className = "stat-card">
                         <h3>Pending</h3>
                         <p>0</p>
                    </div>
                </div>

             </div>

            {/* Upcoming deadlines and recent notes */}
            <div className="dashboard-bottom">
                
                   <div className="upcoming-deadlines">
                      <h2>Upcoming Deadlines</h2>
                      <p>No upcoming deadlines yet.</p>
                   </div>

                   <div className="recent-notes">
                    <h2>Recent Notes</h2>
                    <p>No notes yet.</p>
                   </div>
            </div>

        </section>
    ) 

}

export default DashboardOverview
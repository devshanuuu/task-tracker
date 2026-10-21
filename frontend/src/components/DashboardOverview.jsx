import { useState, useEffect } from 'react'
import api from '../api/axios'


function DashboardOverview() {
    
    const[tasks, setTasks] = useState([])
    const[loading, setLoading] = useState(true)
    const[error, setError] = useState(false)
    const[retryCount, setRetryCount] = useState(0)

    useEffect(() => {
        const fetchTasks = async() => {
            setLoading(true)
            setError(false)

            
            try {
                const response = await api.get('/tasks')
                setTasks(response.data)
            }catch(error) {
                console.log(error)
                setError(true)
            }finally {
                setLoading(false)
            }
        }
        fetchTasks()
    }, [retryCount])
    
    return(
        <section className = "dashboard-overview">
            {loading?(
                <p>Loading Insights</p>
            ): error ?(
                <>
                 <P>Failed to load Insights</P>
                 <button onClick = {() => setRetryCount(retryCount+1)}>
                    Retry
                 </button>
                </>
            ): (
                <>
                  {/* Task statistics */}
                <div className="task-overview">  
                <h2>Task Overview</h2>

                <div className = "task-stats">
                    <div className = "stat-card">
                        <h3>Total Tasks</h3>
                        <p>{tasks.length}</p>
                    </div>

                    <div className = "stat-card">
                         <h3>Completed</h3>
                         <p>{tasks.filter((task) => task.status === 'completed').length}</p>
                    </div>

                    <div className = "stat-card">
                         <h3>In Progress</h3>
                         <p>{tasks.filter((task) => task.status === 'in_progress').length}</p>
                    </div>

                    <div className = "stat-card">
                         <h3>Pending</h3>
                         <p>{tasks.filter((task) => task.status === 'pending').length}</p>
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
                </>
            )}

        </section>
    ) 

}

export default DashboardOverview
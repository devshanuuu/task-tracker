import {useNavigate} from 'react-router-dom'

function QuickActions() {
    const navigate = useNavigate()
    
    return (
        <section className = "quick-actions">
            <div className = "action-card">
                <h2>My Tasks</h2>
                <p>Organize your work and make progress.</p>
                <button onClick = {() => navigate('/tasks')}>View Tasks →</button>               
            </div>

            <div className = "action-card">
                <h2>My Notes</h2>
                <p>Capture your thoughts and important ideas.</p>
                <button>View Notes →</button>
            </div>
        </section>
    )
}

export default QuickActions
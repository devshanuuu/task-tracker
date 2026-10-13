function Sidebar() {
    return (
        <aside className = "sidebar">
            <div className = "sidebar-brand">
                 <h2>🌿 TaskTracker</h2>
            </div>

            <nav className = "sidebar-nav">
                <p className="active">Home</p>
                <p>Tasks</p>
                <p>Notes</p>
            </nav>

            <div className="sidebar-bottom">
                <p>Settings</p>
                <p>Logout</p>
            </div>
        </aside>
    )
}

export default Sidebar
import Sidebar from "./Sidebar"
import WelcomeBanner from "./WelcomeBanner"
import QuickActions from "./QuickActions"
import DashboardOverview from "./DashboardOverview"

function Home() {
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <div className = "dashboard">
            <Sidebar />

            <main className = "dashboard-content">
               <WelcomeBanner name = {user.name} />
               <QuickActions />
               <DashboardOverview />
            </main>
        </div>
    )
}

export default Home



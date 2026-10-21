function WelcomeBanner({ name }) {
    const displayName = name?.trim() || "there"
    const hour = new Date().getHours()
    let greeting

    if(hour<12) {
       greeting = "Good morning,"
    } else if(hour<17) {
       greeting = "Good afternoon,"
    } else {
        greeting = "Good evening,"
    }
    
    return (
        <section className = "welcome-banner">
            <p>{greeting}</p>
            <h1>{displayName} 👋</h1>
            <p>Small steps make big progress.</p>
        </section>
    )
}

export default WelcomeBanner
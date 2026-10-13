function WelcomeBanner({ name }) {
    return (
        <section className = "welcome-banner">
            <p>Good evening,</p>
            <h1>{name} 👋</h1>
            <p>Small steps make big progress.</p>
        </section>
    )
}

export default WelcomeBanner
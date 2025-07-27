 
import '../frontend/styles/home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    
     const categories = [
    { name: 'Plumber', img: '/assets/plumber.jpg' },
    { name: 'Electrician', img: '/assets/electrician.jpg' },
    { name: 'Carpenter', img: '/assets/carpenter.jpg' },
    { name: 'Cleaner', img: '/assets/cleaner.jpg' },
      { name: 'Developer', img: '/assets/developer.jpg' },
        { name: 'Artist', img: '/assets/artist.jpg' },
          { name: 'AC', img: '/assets/ac-mech.jpg' },
            { name: 'farm-work', img: '/assets/farm-worker.jpg' },

  ];
    return (

          <div className="home-container page-fade-in">
        <div className="home-container">
            {/* Hero Section */}
            <div className="hero-section">
                <h1>Welcome to WorkEase</h1>
                <p>Your trusted platform to hire and find skilled workers easily.</p>
                <button className="cta-button" onClick={() => navigate('/search-worker')}>
                    Find a Worker
                </button>
            </div>

            {/* How it Works */}
            <div className="how-it-works">
                <h2>How WorkEase Works</h2>
                <div className="steps">
                    <div className="step">
                        <h3>1. Search</h3>
                        <p>Choose from electricians, plumbers, and more in your area.</p>
                    </div>
                    <div className="step">
                        <h3>2. Hire</h3>
                        <p>Select your preferred worker and schedule the job.</p>
                    </div>
                    <div className="step">
                        <h3>3. Get it Done</h3>
                        <p>The worker completes your task quickly and efficiently.</p>
                    </div>
                </div>
            </div>

            {/* Why Choose Workora */}
            <div className="why-choose">
                <h2> Why Choose WorkEase?</h2>
                <div className="features">
                    <div className="feature-card">
                        <h4>✔ Verified Workers</h4>
                        <p>All workers go through a strict verification process.</p>
                    </div>
                    <div className="feature-card">
                        <h4>✔ Easy Booking</h4>
                        <p>Book your worker in just a few clicks.</p>
                    </div>
                    <div className="feature-card">
                        <h4>✔ Instant Hiring</h4>
                        <p>Hire immediately without long wait times.</p>
                    </div>
                    <div className="feature-card">
                        <h4>✔ Flexible Durations</h4>
                        <p>Need someone for a few hours or days? We’ve got you covered.</p>
                    </div>
                </div>
            </div>

            {/* Top Categories */}
           



             <div className="categories">
        <h2>Popular Categories</h2>
        <div className="category-cards">
          {categories.map(cat => (
            <div
              key={cat.name}
              className="category-card"
              onClick={() => navigate(`/worker-category/${cat.name}`)}
            >
              <img src={cat.img} alt={cat.name} />
              <p>{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

            {/* Call to Action */}
            <div className="cta-section">
                <h2>Need Help Right Away?</h2>
                <p>Get a trusted professional within minutes.</p>
                <button className="cta-button" onClick={() => navigate('/search-worker')}>
                    Hire Now
                </button>
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} WorkEase. All rights reserved.</p>
                <p>Made with ❤️ to connect you with skilled local professionals.</p>
            </footer>
        </div>

         </div>
    );
};

export default Home;

 
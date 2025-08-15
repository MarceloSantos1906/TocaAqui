import logo from '../assets/react.svg';
import musicianCello from '../assets/react.svg';
import musicianFlute from '../assets/react.svg';
import musicianGuitar from '../assets/react.svg';
import professorImg from '../assets/react.svg';
import '../index.css';

const professors = [
    { name: 'Tatiane Santos', location: 'União da Vitória - PR' },
    { name: 'Tatiane Santos', location: 'União da Vitória - PR' },
    { name: 'Tatiane Santos', location: 'União da Vitória - PR' },
    { name: 'Tatiane Santos', location: 'União da Vitória - PR' },
    { name: 'Tatiane Santos', location: 'União da Vitória - PR' },
    { name: 'Tatiane Santos', location: 'União da Vitória - PR' },
];

function HomePage() {
    return (
        <div className="home-container">
            <header className="home-header">
                <img src={logo} alt="Tocaqui Logo" className="home-logo" />
            </header>

            <main>
                <section className="hero-section">
                    <div className="hero-content">
                        <h1>Aulas de iniciação musical com professores particulares</h1>
                        <ul className="hero-features">
                            <li>🏆 A nata das aulas particulares</li>
                            <li>👥 4,373 professores de iniciação musical</li>
                            <li>🔒 Pagamento 100% seguro</li>
                            <li>✏️ Passe Aluno ilimitado</li>
                        </ul>
                        <div className="search-bar">
                            <span className="search-icon">📍</span>
                            <input type="text" placeholder="Local das aulas" />
                            <button className="search-button">🔍</button>
                        </div>
                    </div>
                    <div className="hero-images">
                        <div className="image-arch arch-1">
                            <img src={musicianCello} alt="Violoncelista" />
                        </div>
                        <div className="image-arch arch-2">
                            <img src={musicianFlute} alt="Flautista" />
                        </div>
                        <div className="image-arch arch-3">
                            <img src={musicianGuitar} alt="Guitarrista" />
                        </div>
                    </div>
                </section>

                <section className="instruments-section">
                    <div className="instrument-icon">🎹</div>
                    <div className="instrument-icon">🎤</div>
                    <div className="instrument-icon">🥁</div>
                    <div className="instrument-icon">🎸</div>
                    <div className="instrument-icon">🎷</div>
                    <div className="instrument-icon">🎻</div>
                    <div className="instrument-icon">🎼</div>
                    <div className="instrument-icon">🎺</div>
                    <div className="instrument-icon">🎶</div>
                </section>

                <section className="professors-section">
                    <h2>Os melhores professores particulares de iniciação musical</h2>
                    <div className="professors-grid">
                        {professors.map((prof, index) => (
                            <div className="professor-card" key={index}>
                                <img src={professorImg} alt={prof.name} />
                                <h3>{prof.name}</h3>
                                <p>{prof.location}</p>
                            </div>
                        ))}
                    </div>
                    <button className="more-professors-btn">
                        Encontrar mais professores <span>&rarr;</span>
                    </button>
                </section>
            </main>

            <footer className="home-footer">
                <p>Todos direitos reservados Tocaqui LTDA.</p>
            </footer>
        </div>
    );
}

export default HomePage;
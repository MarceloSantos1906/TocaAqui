import { Link, useSearchParams } from 'react-router-dom';
import musicianCello from '@/assets/mulher.png';
import musicianFlute from '@/assets/carinha-flauta.png';
import musicianGuitar from '@/assets/carinha-violao.png';
import professorImg from '@/assets/professora.png';
import './Home.css';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import professorsJson from '../../data/professors.json'
import instrumentsJson from '../../data/instruments.json'

interface professors {
    id: number;
    picture: string;
    name: string;
    location: string;
}

interface instruments {
    id: number;
    instrument: string;
}

const professors: professors[] = professorsJson.professors;
const instruments: instruments[] = instrumentsJson.instruments;

function HomePage() {
    const [limit, setLimit] = useState(6);
    const [search, setSearch] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const cityParam = searchParams.get("cidade") || "";
        setSearch(cityParam);
    }, [searchParams]);

    const handleSearch = (param: string) => {
        setSearch(param);

        const newParams = new URLSearchParams(searchParams.toString());
        if (param) {
            newParams.set("cidade", param);
        } else {
            newParams.delete("cidade");
        }
        setSearchParams(newParams);
    };

    return (
        <div className='container'>
            <Header />
            <div className="home-container">
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
                                <input
                                    type="text"
                                    placeholder="Local das aulas"
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                                <button
                                    className="search-button"
                                    onClick={() => handleSearch(search)}
                                >
                                    🔍
                                </button>
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
                        {
                            instruments.map((instrument, index) => {
                                return (
                                    <Link to={'/'} className='instrument-link' key={index}>
                                        <div className="instrument-icon" key={index}>{instrument.instrument}</div>
                                    </Link>
                                )
                            })
                        }
                    </section>

                    <section className="professors-section">
                        <h2>Os melhores professores particulares de iniciação musical</h2>
                        <div className="professors-grid">
                            {professors.map((prof, index) => (
                                index < limit &&
                                <Link to={`/professor/${prof.id}`} className='professor-link' key={index}>
                                    <div className="professor-card" key={index}>
                                        <img src={professorImg} alt={prof.name} />
                                        <h3>{prof.name}</h3>
                                        <p>{prof.location}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <button className="more-professors-btn" onClick={() => setLimit(limit + 6)}>
                            Encontrar mais professores <span>&rarr;</span>
                        </button>
                    </section>
                </main>

                <footer className="home-footer">
                    <p>Todos direitos reservados Tocaqui LTDA.</p>
                </footer>
            </div>
        </div>
    );
}

export default HomePage;
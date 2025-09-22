import { Link, useSearchParams } from 'react-router-dom';
import musicianCello from '@/assets/mulher.png';
import musicianFlute from '@/assets/carinha-flauta.png';
import musicianGuitar from '@/assets/carinha-violao.png';
import professorImg from '@/assets/professora.png';
import './Home.css';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';

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

const professors: professors[] = [
    { id: 1, picture: professorImg, name: 'Tatiane Santos', location: 'União da Vitória - PR' },
    { id: 2, picture: professorImg, name: 'João Silva', location: 'Curitiba - PR' },
    { id: 3, picture: professorImg, name: 'Maria Oliveira', location: 'São Paulo - SP' },
    { id: 4, picture: professorImg, name: 'Carlos Souza', location: 'Rio de Janeiro - RJ' },
    { id: 5, picture: professorImg, name: 'Ana Paula', location: 'Belo Horizonte - MG' },
    { id: 6, picture: professorImg, name: 'Lucas Pereira', location: 'Porto Alegre - RS' },
    { id: 7, picture: professorImg, name: 'Fernanda Lima', location: 'Florianópolis - SC' },
    { id: 8, picture: professorImg, name: 'Rafael Costa', location: 'Salvador - BA' },
    { id: 9, picture: professorImg, name: 'Juliana Rocha', location: 'Fortaleza - CE' },
    { id: 10, picture: professorImg, name: 'Bruno Martins', location: 'Brasília - DF' },
    { id: 11, picture: professorImg, name: 'Patrícia Almeida', location: 'Manaus - AM' },
    { id: 12, picture: professorImg, name: 'Gabriel Fernandes', location: 'Belém - PA' },
    { id: 13, picture: professorImg, name: 'Camila Ribeiro', location: 'Recife - PE' },
    { id: 14, picture: professorImg, name: 'Ricardo Gomes', location: 'Goiânia - GO' },
    { id: 15, picture: professorImg, name: 'Larissa Cardoso', location: 'Campinas - SP' },
    { id: 16, picture: professorImg, name: 'Felipe Teixeira', location: 'Niterói - RJ' },
    { id: 17, picture: professorImg, name: 'Aline Mendes', location: 'Joinville - SC' },
    { id: 18, picture: professorImg, name: 'Thiago Barbosa', location: 'Uberlândia - MG' },
    { id: 19, picture: professorImg, name: 'Vanessa Dias', location: 'Sorocaba - SP' },
    { id: 20, picture: professorImg, name: 'Eduardo Pinto', location: 'Maringá - PR' },
    { id: 21, picture: professorImg, name: 'Beatriz Castro', location: 'Cuiabá - MT' },
    { id: 22, picture: professorImg, name: 'Marcos Araújo', location: 'São Luís - MA' },
    { id: 23, picture: professorImg, name: 'Isabela Nunes', location: 'Campo Grande - MS' },
    { id: 24, picture: professorImg, name: 'Pedro Henrique', location: 'João Pessoa - PB' },
    { id: 25, picture: professorImg, name: 'Letícia Freitas', location: 'Aracaju - SE' },
    { id: 26, picture: professorImg, name: 'André Souza', location: 'Teresina - PI' },
    { id: 27, picture: professorImg, name: 'Marina Lopes', location: 'Natal - RN' },
    { id: 28, picture: professorImg, name: 'Diego Farias', location: 'Maceió - AL' },
    { id: 29, picture: professorImg, name: 'Renata Pires', location: 'São José dos Campos - SP' },
    { id: 30, picture: professorImg, name: 'Gustavo Moreira', location: 'Londrina - PR' },
    { id: 31, picture: professorImg, name: 'Amanda Vieira', location: 'Ribeirão Preto - SP' },
    { id: 32, picture: professorImg, name: 'Rodrigo Cunha', location: 'Juiz de Fora - MG' },
    { id: 33, picture: professorImg, name: 'Paula Tavares', location: 'Blumenau - SC' },
    { id: 34, picture: professorImg, name: 'Vitor Santos', location: 'Caxias do Sul - RS' },
    { id: 35, picture: professorImg, name: 'Débora Rezende', location: 'Vitória - ES' },
    { id: 36, picture: professorImg, name: 'Leonardo Batista', location: 'Pelotas - RS' },
    { id: 37, picture: professorImg, name: 'Sabrina Duarte', location: 'Anápolis - GO' },
    { id: 38, picture: professorImg, name: 'Fábio Lima', location: 'Caruaru - PE' },
    { id: 39, picture: professorImg, name: 'Natália Barros', location: 'Mossoró - RN' },
    { id: 40, picture: professorImg, name: 'Henrique Ramos', location: 'Chapecó - SC' },
    { id: 41, picture: professorImg, name: 'Priscila Monteiro', location: 'Ponta Grossa - PR' },
    { id: 42, picture: professorImg, name: 'Otávio Leite', location: 'Piracicaba - SP' },
    { id: 43, picture: professorImg, name: 'Elaine Costa', location: 'Canoas - RS' },
    { id: 44, picture: professorImg, name: 'Danilo Borges', location: 'São Vicente - SP' },
    { id: 45, picture: professorImg, name: 'Viviane Martins', location: 'Franca - SP' },
    { id: 46, picture: professorImg, name: 'Alexandre Souza', location: 'Itajaí - SC' },
    { id: 47, picture: professorImg, name: 'Cristina Silva', location: 'Petrolina - PE' },
    { id: 48, picture: professorImg, name: 'Maurício Rocha', location: 'Barueri - SP' },
    { id: 49, picture: professorImg, name: 'Simone Ferreira', location: 'Marabá - PA' },
    { id: 50, picture: professorImg, name: 'Douglas Almeida', location: 'Boa Vista - RR' },
];

const instruments: instruments[] = [
    { id: 1, instrument: '🎹' },
    { id: 2, instrument: '🎤' },
    { id: 3, instrument: '🥁' },
    { id: 4, instrument: '🎸' },
    { id: 5, instrument: '🎷' },
    { id: 6, instrument: '🎻' },
    { id: 7, instrument: '🎼' },
    { id: 8, instrument: '🎺' },
    { id: 9, instrument: '🎶' },
]

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
                                    <Link to={'/'} className='instrument-link'>
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
                                        <img src={prof.picture} alt={prof.name} />
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
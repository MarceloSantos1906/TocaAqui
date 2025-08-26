import { useParams } from 'react-router-dom';
import './ProfessorsDetails.css';
import Header from '../../components/Header';

function ProfessorsDetails() {
    const { id } = useParams();

    const professor = {
        name: 'Tatiane Santos',
        rating: 5,
        reviews: 35,
        price: 'R$83',
        duration: '1h',
        students: '50+',
        image: '/src/assets/react.svg', // Placeholder - substitua pela imagem real
        experience: '12+ anos como professora de teclado, 20+ anos como musicista',
        methodology: 'Personalizada e flexível, ajudou mais de 200 alunos',
        highlights: 'Festivais, eventos culturais, colaborações'
    };

    const learningOutcomes = [
        'Ler partituras e cifras com segurança',
        'Tocar músicas do seu estilo preferido (pop/rock, gospel, erudito, etc.)',
        'Desenvolver coordenação, técnica e expressão musical',
        'Harmonia e improvisação no teclado',
        'Construir repertório e confiança para tocar sozinho ou em grupo'
    ];

    const reviews = [
        {
            name: 'Tadeuzinho',
            text: 'Excelente experiência com a aula! Melhorei muito minha escuta musical e compreensão. A Tatiane é uma professora incrível e muito paciente.',
            rating: 5
        },
        {
            name: 'Maria Silva',
            text: 'Aulas muito produtivas e didáticas. A Tatiane tem uma metodologia que realmente funciona. Recomendo muito!',
            rating: 5
        }
    ];

    const otherProfessors = [
        { name: 'João Carlos', rating: 4.8, reviews: 28, price: 'R$75' },
        { name: 'Ana Beatriz', rating: 4.9, reviews: 42, price: 'R$90' },
        { name: 'Pedro Santos', rating: 4.7, reviews: 31, price: 'R$80' }
    ];

    return (
        <div className="professor-details-container">
            <Header />
            <div className="main-content">
                {/* Coluna Esquerda - Conteúdo Principal */}
                <div className="left-column">
                    {/* Título e Descrição do Curso */}
                    <section className="course-intro">
                        <h1 className="course-title">
                            Aprenda e evolua rápido na produção musical com acompanhamento técnico especializado, 
                            comece somente com o seu computador e fones de ouvido. Do zero ao avançado.
                        </h1>
                    </section>

                    {/* Locais das Aulas */}
                    <section className="class-locations">
                        <h2>Locais das aulas</h2>
                        <div className="location-buttons">
                            <button className="location-btn">
                                📍 Na casa do professor (Rua Direita da Vitória)
                            </button>
                            <button className="location-btn">
                                📹 Online
                            </button>
                        </div>
                    </section>

                    {/* Mais sobre o Professor */}
                    <section className="about-professor">
                        <h2>Mais sobre {professor.name}</h2>
                        <p>{professor.experience}. {professor.methodology}. {professor.highlights}.</p>
                        <p>Com uma abordagem personalizada e flexível, Tatiane já ajudou mais de 200 alunos a desenvolverem suas habilidades musicais. Sua experiência inclui participação em diversos festivais e eventos culturais, além de colaborações com outros músicos da região.</p>
                    </section>

                    {/* Sobre a Aula */}
                    <section className="about-class">
                        <h2>Sobre a aula</h2>
                        <div className="class-tags">
                            <span className="tag">Iniciante</span>
                            <span className="tag">Intermediário</span>
                            <span className="tag">Avançado</span>
                            <span className="tag">Português</span>
                        </div>
                        <p>A metodologia é personalizada e focada em desbloquear sua musicalidade, organizar a prática e desenvolver a sensibilidade artística. As aulas são práticas e teóricas, com acompanhamento próximo e material exclusivo.</p>
                        
                        <h3>O que você vai aprender?</h3>
                        <ul className="learning-outcomes">
                            {learningOutcomes.map((outcome, index) => (
                                <li key={index}>{outcome}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Avaliações */}
                    <section className="reviews-section">
                        <h2>Avaliações</h2>
                        <div className="reviews-list">
                            {reviews.map((review, index) => (
                                <div key={index} className="review-item">
                                    <div className="review-avatar">T</div>
                                    <div className="review-content">
                                        <h4>{review.name}</h4>
                                        <p>{review.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Mais Professores */}
                    <section className="more-professors">
                        <h2>Mais professores de 'Matéria aplicada'</h2>
                        <div className="professors-grid">
                            {otherProfessors.map((prof, index) => (
                                <div key={index} className="professor-card-small">
                                    <img src={professor.image} alt={prof.name} />
                                    <h4>{prof.name}</h4>
                                    <p>⭐ {prof.rating} ({prof.reviews} Avaliações)</p>
                                    <p className="price">{prof.price}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Coluna Direita - Perfil do Professor (Fixa) */}
                <div className="right-column">
                    <div className="professor-profile-card">
                        <img src={professor.image} alt={professor.name} className="professor-image" />
                        <h3 className="professor-name">{professor.name}</h3>
                        <div className="rating">
                            ⭐ {professor.rating} ({professor.reviews} Avaliações)
                        </div>
                        
                        <div className="course-details">
                            <div className="detail-item">
                                <span className="label">Valor:</span>
                                <span className="value">{professor.price}</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Tempo:</span>
                                <span className="value">{professor.duration}</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Alunos:</span>
                                <span className="value">{professor.students}</span>
                            </div>
                        </div>

                        <div className="action-buttons">
                            <button className="hire-btn">Contratar</button>
                            <button className="free-class-btn">1a aula grátis</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="professor-footer">
                <p>Todos direitos reservados Tocaqui LTDA.</p>
            </footer>
        </div>
    );
}

export default ProfessorsDetails;
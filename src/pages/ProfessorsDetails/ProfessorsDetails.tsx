import './ProfessorsDetails.css';
import Header from '../../components/Header';
import ProfessorCard from '../../components/ProfessorCard';
import ReviewCard from '../../components/ReviewCard';
import LocationButtons from '../../components/LocationButtons';
import LearningOutcomes from '../../components/LearningOutcomes';
import OtherProfessorsGrid from '../../components/OtherProfessorsGrid';
import CourseIntro from '../../components/CourseIntro';
import type { Professor, Review, OtherProfessor } from '../../types';
import professorImage from '@/assets/professora.png'

function ProfessorsDetails() {
    const professor: Professor = {
        name: 'Tatiane Santos',
        rating: 5,
        reviews: 35,
        price: 'R$83',
        duration: '1h',
        students: '50+',
        image: professorImage,
        experience: '12+ anos como professora de teclado, 20+ anos como musicista',
        methodology: 'Personalizada e flexível, ajudou mais de 200 alunos',
        highlights: 'Festivais, eventos culturais, colaborações',
        matter: 'Teclado'
    };

    const learningOutcomes = [
        'Ler partituras e cifras com segurança',
        'Tocar músicas do seu estilo preferido (pop/rock, gospel, erudito, etc.)',
        'Desenvolver coordenação, técnica e expressão musical',
        'Harmonia e improvisação no teclado',
        'Construir repertório e confiança para tocar sozinho ou em grupo'
    ];

    const reviews: Review[] = [
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

    const locations = [
        '📍 Na casa do professor (Rua Direita da Vitória)',
        '📹 Online'
    ];

    return (
        <div className="professor-details-container">
            <Header />
            <div className="main-content">
                <div className="left-column">
                    <CourseIntro 
                        title="Aprenda e evolua rápido na produção musical com acompanhamento técnico especializado, comece somente com o seu computador e fones de ouvido. Do zero ao avançado."
                    />

                    <section className="class-locations">
                        <h2>Locais das aulas</h2>
                        <LocationButtons locations={locations} />
                    </section>

                    <section className="about-professor">
                        <h2>Mais sobre {professor.name}</h2>
                        <p>{professor.experience}. {professor.methodology}. {professor.highlights}.</p>
                        <p>Com uma abordagem personalizada e flexível, Tatiane já ajudou mais de 200 alunos a desenvolverem suas habilidades musicais. Sua experiência inclui participação em diversos festivais e eventos culturais, além de colaborações com outros músicos da região.</p>
                    </section>

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
                        <LearningOutcomes outcomes={learningOutcomes} />
                    </section>

                    <section className="reviews-section">
                        <h2>Avaliações</h2>
                        <div className="reviews-list">
                            {reviews.map((review, index) => (
                                <ReviewCard key={index} review={review} />
                            ))}
                        </div>
                    </section>
                </div>

                <div className="right-column">
                    <ProfessorCard professor={professor} />
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
import './ScheduleProfessor.css';
import Header from '../../components/Header';
import ProfessorCard from '../../components/ProfessorCard';
import LocationButtons from '../../components/LocationButtons';
import ClassDateTime from '../../components/ClassDateTime'
import professorImage from '@/assets/professora.png'
import type { Professor } from '../../types';

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

    const locations = [
        '📍 Na casa do professor (Rua Direita da Vitória)',
        '📹 Online'
    ];

    const dates = [
        'Segunda-feira',
        'Terça-feira',
        'Sexta-feira'
    ];

    return (
        <div className="professor-details-container">
            <Header />
            <div className="main-content">
                <div className="left-column">
                    <section className="class-locations">
                        <h2>Selecione a metodologia das aulas</h2>
                        <LocationButtons locations={locations} />
                    </section>

                    <section className="class-date-time">
                        <h2>Selecione uma data e hora para suas aulas</h2>
                        <ClassDateTime dates={dates}} />
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
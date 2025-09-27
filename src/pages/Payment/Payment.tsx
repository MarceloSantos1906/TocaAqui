import './Payment.css';
import Header from '../../components/Header';
import ProfessorCard from '../../components/ProfessorCard';
import professorImage from '@/assets/professora.png'
import type { Professor } from '../../types';
import MercadoPagoBrick from '../../components/MercadoPagoBrick';

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

    return (
        <div className="professor-details-container">
            <Header />
            <div className="main-content">
                <div className="left-column">
                    <section className="payment-section">
                        <MercadoPagoBrick publicKey="YOUR_PUBLIC_KEY" preferenceId="YOUR_PREFERENCE_ID" />
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

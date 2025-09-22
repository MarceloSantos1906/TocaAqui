import { Bounce, toast } from 'react-toastify';
import type { Professor } from '../../types';
import './ProfessorCard.css';

interface ProfessorCardProps {
    professor: Professor;
}

function ProfessorCard({ professor }: ProfessorCardProps) {

    const contractProfessor = () => {
        toast.info('Ainda não implementamos essa funcionalidade!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    return (
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
                <button className="hire-btn" onClick={contractProfessor}>Contratar</button>
                <button className="free-class-btn">1a aula grátis</button>
            </div>
        </div>
    );
}

export default ProfessorCard;

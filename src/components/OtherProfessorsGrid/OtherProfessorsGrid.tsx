import type { OtherProfessor } from '../../types';
import './OtherProfessorsGrid.css';

interface OtherProfessorsGridProps {
    professors: OtherProfessor[];
}

function OtherProfessorsGrid({ professors }: OtherProfessorsGridProps) {
    return (
        <div className="professors-grid">
            {professors.map((prof, index) => (
                <div key={index} className="professor-card-small">
                    <img src={prof.image} alt={prof.name} />
                    <h4>{prof.name}</h4>
                    <p>⭐ {prof.rating} ({prof.reviews} Avaliações)</p>
                    <p className="price">{prof.price}</p>
                </div>
            ))}
        </div>
    );
}

export default OtherProfessorsGrid;

import { Link } from 'react-router-dom';
import type { OtherProfessor } from '../../types';
import './OtherProfessorsGrid.css';

interface OtherProfessorsGridProps {
    professors: OtherProfessor[];
}

function OtherProfessorsGrid({ professors }: OtherProfessorsGridProps) {
    return (
        <div className="professors-grid">
            {professors.map((prof, index) => (
                <Link to={`/professor/${prof.id}`} className='professor-link' key={index}>
                    <div key={index} className="professor-card-small">
                        <img src={prof.image} alt={prof.name} />
                        <h4>{prof.name}</h4>
                        <p>⭐ {prof.rating} ({prof.reviews} Avaliações)</p>
                        <p className="price">{prof.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default OtherProfessorsGrid;

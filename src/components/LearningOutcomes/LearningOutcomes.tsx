import './LearningOutcomes.css';

interface LearningOutcomesProps {
    outcomes: string[];
}

function LearningOutcomes({ outcomes }: LearningOutcomesProps) {
    return (
        <ul className="learning-outcomes">
            {outcomes.map((outcome, index) => (
                <li key={index}>{outcome}</li>
            ))}
        </ul>
    );
}

export default LearningOutcomes;

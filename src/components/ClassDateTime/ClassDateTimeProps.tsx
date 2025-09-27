import './ClassDateTimeProps.css';

interface ClassDateTimeProps {
    dates: string[];
}

function ClassDateTime({ dates }: ClassDateTimeProps) {
    return (
        <div className="dates">
            {dates.map((date, dateIndex) => (
                <div key={`date-${dateIndex}`}>
                    <input
                        type="checkbox"
                        name={`date-${dateIndex}`}
                        value={date}
                        id={`date-${dateIndex}`}
                    />
                    <label htmlFor={`date-${dateIndex}`}>{date}</label>
                </div>
            ))}
        </div>
    );
}

export default ClassDateTime;
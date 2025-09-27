import './ClassDateTimeProps.css';

interface ClassDateTimeProps {
    dates: string[];
    times: string[];
}

function ClassDateTime({ dates, times }: ClassDateTimeProps) {
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
                    {times.map((time, timeIndex) => (
                        <div key={`time-${dateIndex}-${timeIndex}`}>
                            <input
                                type="checkbox"
                                name={`time-${dateIndex}-${timeIndex}`}
                                value={time}
                                id={`time-${dateIndex}-${timeIndex}`}
                            />
                            <label htmlFor={`time-${dateIndex}-${timeIndex}`}>{time}</label>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default ClassDateTime;
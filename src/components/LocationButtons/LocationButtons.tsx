import './LocationButtons.css';

interface LocationButtonsProps {
    locations: string[];
}

function LocationButtons({ locations }: LocationButtonsProps) {
    return (
        <div className="location-buttons">
            {locations.map((location, index) => (
                <button key={index} className="location-btn">
                    {location}
                </button>
            ))}
        </div>
    );
}

export default LocationButtons;

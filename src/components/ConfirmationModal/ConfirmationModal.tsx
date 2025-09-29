import React, { useState } from 'react';
import './ConfirmationModal.css';
import { toast, ToastContainer } from 'react-toastify';

interface ConfirmationModalProps {
    availableDays: string[];
    onClose: () => void;
    onConfirm: (selectedDays: string[]) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ availableDays, onClose, onConfirm }) => {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const handleCheckboxChange = (day: string) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const handleConfirm = () => {
        if (selectedDays.length === 0) {
            toast.warn("Selecione pelo menos um dia");
            return;
        }
        onConfirm(selectedDays);
        setSelectedDays([]);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirmar contratação</h2>
                <p>Selecione os dias que deseja ter aulas:</p>

                <div className="modal-days">
                    {availableDays.map(day => (
                        <div key={day} className="day-checkbox">
                            <input
                                type="checkbox"
                                id={day}
                                value={day}
                                checked={selectedDays.includes(day)}
                                onChange={() => handleCheckboxChange(day)}
                            />
                            <label htmlFor={day}>{day}</label>
                        </div>
                    ))}
                </div>

                <div className="modal-actions">
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={handleConfirm}>Confirmar</button>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default ConfirmationModal;

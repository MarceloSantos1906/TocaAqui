import './UpdateStatusModal.css';
import React from "react";
import type { CourseInterface } from "../../pages/Profile/Profile";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface StatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    lessonId: number | null;
    course: CourseInterface | null;
    token: string;
    refreshCourses: () => void;
}

export const LessonStatusEnum = {
    PENDING: "Pendente",
    ACCEPTED: "Aceita",
    REJECTED: "Recusada"
} as const;

export type LessonStatusEnum = typeof LessonStatusEnum[keyof typeof LessonStatusEnum];

const StatusModal: React.FC<StatusModalProps> = ({ isOpen, onClose, course, lessonId, token, refreshCourses }) => {
    if (!isOpen || !course || !lessonId) return null;

    const handleStatusChange = async (newStatus: LessonStatusEnum) => {
        try {
            const response = await fetch(`/api/lesson/update-status`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    lessonId,
                    status: newStatus
                })
            });

            if (!response.ok) throw new Error("Erro ao atualizar status");

            toast.success("Status atualizado com sucesso!");
            onClose();
            if (refreshCourses) refreshCourses();
        } catch (err) {
            console.error(err);
            toast.error("Erro ao atualizar status");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Alterar status da aula</h2>
                <p>{course.name}</p>
                <button onClick={() => handleStatusChange(LessonStatusEnum.ACCEPTED)}>Aprovar</button>
                <button onClick={() => handleStatusChange(LessonStatusEnum.PENDING)}>Pendente</button>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

export default StatusModal;

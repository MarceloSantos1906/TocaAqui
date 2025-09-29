import './CourseDetails.css';
import Header from '../../components/Header';
import LocationButtons from '../../components/LocationButtons';
import LearningOutcomes from '../../components/LearningOutcomes';
import ConfirmationModal from '../../components/ConfirmationModal';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Category {
    id: string;
    name: string;
    description: string;
    logoUrl: string;
}

export interface ProfessorInterface {
    id: string;
    name: string;
    email: string;
    mobileNumber: string;
    cpf: string;
    profilePicture: string;
}

export interface DisponibleDayInterface {
    id: string;
    day: string;
}

export interface CourseInterface {
    id: string;
    name: string;
    description: string;
    lessonPrice: string;
    thumbnailPicture: string;
    category: Category;
    professor: ProfessorInterface;
    disponibleDays: DisponibleDayInterface[];
}

interface JwtPayload {
    personId: number;
    email?: string;
    name?: string;
}

function getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.personId;
    } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return null;
    }
}

function CourseDetails() {
    const { id } = useParams();
    const [course, setCourse] = useState<CourseInterface | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchCourse() {
            try {
                const response = await fetch(`/api/courses/find-by/${id}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    toast.error(errorData.message || "Erro ao buscar curso");
                    return;
                }
                const data = await response.json();
                setCourse(data);
            } catch (error) {
                console.error("Erro ao buscar curso:", error);
                toast.error("Erro ao buscar curso");
            }
        }
        fetchCourse();
    }, [id]);

    if (!course) {
        return (
            <div className="course-details-container">
                <Header />
                <p style={{ textAlign: 'center', marginTop: '4rem', color: '#fff' }}>Carregando curso...</p>
                <ToastContainer />
            </div>
        );
    }

    const disponibleDays = course.disponibleDays.map(d => d.day);
    const learningOutcomes = [
        'Compreender fundamentos do instrumento ou técnica',
        'Praticar repertório específico do curso',
        'Desenvolver coordenação e expressão musical',
        'Aplicar teoria musical na prática',
        'Construir confiança para tocar sozinho ou em grupo'
    ];

    const formattedPrice = Number(course.lessonPrice).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    const handleConfirmLesson = async (days: string[]) => {
        const studentId = getUserIdFromToken();
        if (!studentId) {
            toast.warn("Você precisa estar logado para contratar um curso");
            return;
        }

        try {
            const response = await fetch('/api/lesson/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseId: course && +course?.id,
                    professorId: course && +course?.professor.id,
                    studentId: +studentId,
                    selectedDays: days
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message || "Erro ao contratar aula");
                return;
            }

            toast.success("Aula contratada com sucesso!");
            setTimeout(() => setIsModalOpen(false), 1000)
        } catch (error) {
            console.error(error);
            toast.error("Erro ao contratar aula");
        }
    };

    const handleEnrollClick = () => {
        const studentId = getUserIdFromToken();
        if (!studentId) {
            toast.warn("Você precisa estar logado para contratar um curso");
            return;
        }
        setIsModalOpen(true);
    };

    return (
        <div className="course-details-container">
            <Header />
            <div className="main-content">
                <div className="left-column">
                    <section className="course-intro">
                        <h1>{course.name}</h1>
                        <p>{course.description.trim()}</p>
                    </section>

                    <section className="class-locations">
                        <h2>Dias disponíveis</h2>
                        <LocationButtons locations={disponibleDays} />
                    </section>

                    <section className="about-class">
                        <h2>Sobre a categoria</h2>
                        <p>{course.category.description}</p>
                    </section>

                    <section className="learning-outcomes">
                        <h3>O que você vai aprender?</h3>
                        <LearningOutcomes outcomes={learningOutcomes} />
                    </section>
                </div>

                <div className="right-column">
                    <div className="course-card">
                        <img
                            src={course.professor.profilePicture}
                            alt={course.professor.name}
                        />
                        <h2>{course.professor.name}</h2>

                        <div className="rating">
                            ⭐ 5 <span>(55 Avaliações)</span>
                        </div>

                        <div className="info">
                            <div>
                                <span>Valor</span>
                                <span>{formattedPrice}</span>
                            </div>
                            <div>
                                <span>Tempo</span>
                                <span>1h</span>
                            </div>
                            <div>
                                <span>Alunos</span>
                                <span>50+</span>
                            </div>
                        </div>

                        <button className="enroll-btn" onClick={handleEnrollClick}>Contratar</button>
                        <div className="first-class">1a aula grátis</div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <ConfirmationModal
                    availableDays={disponibleDays}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmLesson}
                />
            )}

            <footer className="course-footer">
                <p>Todos direitos reservados Tocaqui LTDA.</p>
            </footer>

        </div>
    );
}

export default CourseDetails;

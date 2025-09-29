import './Profile.css';
import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Header from "../../components/Header";
import notFound from '@/assets/notfound.svg';
import AddCourseModal from '../../components/AddCourseModal';
import StatusModal from '../../components/UpdateStatusModal/UpdateStatusModal';

interface RoleInterface {
    id?: string;
    permission: "Professor" | "Estudante";
}

export interface CourseInterface {
    id: string;
    name: string;
    description: string;
    lessonPrice: number;
    thumbnailPicture: string;
    days: string[];
    lessonStatuses?: string[];
    lessonId: number
}

interface UserInterface {
    id: string;
    name: string;
    email: string;
    mobileNumber?: string;
    cpf?: string;
    profilePicture?: string;
    authorities?: RoleInterface;
}

interface LessonInterface {
    id: string;
    status: string;
    professor: {
        id: string;
        name: string;
        email: string;
        mobileNumber: string;
    };
    courses: CourseInterface[];
}

interface LessonsResponse {
    message: string;
    lessons: LessonInterface[];
}

function ProfilePage() {
    const [user, setUser] = useState<UserInterface | null>(null);
    const [_, setLessons] = useState<LessonInterface[]>([]);
    const [courses, setCourses] = useState<CourseInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = localStorage.getItem("token");
    const [selectedCourse, setSelectedCourse] = useState<CourseInterface | null>(null);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

    const handleCourseAdded = () => {
        setLoading(true);
        setUser(null);
    };

    const truncate = (text: string, max = 100) => {
        return text.length > max ? text.slice(0, max) + "..." : text;
    };

    const fetchData = useCallback(async () => {
        if (!token) return;

        let decodedId: string;
        let userRole: string;

        try {
            const decoded: any = jwtDecode(token);
            decodedId = decoded.personId;
            userRole = decoded.role || decoded.permission || "Estudante";
        } catch (err) {
            console.error("Token inválido", err);
            setError("Token inválido");
            setLoading(false);
            return;
        }

        setLoading(true);

        // Buscar usuário
        try {
            const response = await fetch(`/api/person/find-by/${decodedId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Erro ao buscar usuário");
            }
            const data: UserInterface = await response.json();
            if (!data.authorities) data.authorities = { permission: "Estudante" };
            setUser(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        }

        // Buscar aulas/cursos
        try {
            const response = await fetch(
                `/api/lessons/find-by?personId=${decodedId}&role=${userRole}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            const data: LessonsResponse = await response.json();
            setLessons(data.lessons);

            const uniqueCoursesMap: Record<string, CourseInterface> = {};

            data.lessons.forEach(lesson => {
                lesson.courses.forEach(course => {
                    const id = course.id;
                    const lessonStatus = lesson.status;
                    const daysArray: string[] = Array.isArray(course.days) as any ? course.days : course.days.map(d => d);

                    if (!uniqueCoursesMap[id]) {
                        uniqueCoursesMap[id] = {
                            ...course,
                            lessonPrice: Number(course.lessonPrice),
                            days: daysArray,
                            lessonStatuses: [lessonStatus],
                            lessonId: +lesson.id
                        };
                    } else {
                        if (!uniqueCoursesMap[id].lessonStatuses!.includes(lessonStatus)) {
                            uniqueCoursesMap[id].lessonStatuses!.push(lessonStatus);
                        }
                    }
                });
            });

            setCourses(Object.values(uniqueCoursesMap));
        } catch (err) {
            console.error("Erro ao buscar aulas/cursos:", err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (!token) return <Navigate to="/login" />;
    if (loading) return <p className="loading-text">Carregando...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!user) return <p className="error">Nenhum usuário encontrado</p>;

    return (
        <div className="profile-container">
            <Header />
            <div className="profile-card">
                <div className="profile-info-section">
                    {user.profilePicture && (
                        <img src={user.profilePicture} alt={user.name} className="profile-picture" />
                    )}
                    <h2>{user.name}</h2>
                    <p><strong>Email:</strong> {user.email}</p>
                    {user.mobileNumber && <p><strong>Telefone:</strong> {user.mobileNumber}</p>}
                    {user.cpf && <p><strong>CPF:</strong> {user.cpf}</p>}
                    {user.authorities && <p><strong>Função:</strong> {user.authorities.permission}</p>}
                </div>

                <div className="profile-courses-section">
                    <h3>Meus Cursos</h3>
                    {courses.length === 0 ? (
                        <img className="course-notfound" src={notFound} alt='Sem cursos cadastrados' />
                    ) : (
                        <div className="courses-list">
                            {courses.map(course => (
                                <>
                                    <div
                                        className="course-card"
                                        key={course.id}
                                        onClick={() => {
                                            if (user.authorities?.permission === "Professor") {
                                                setSelectedCourse(course);
                                                setIsStatusModalOpen(true);
                                            }
                                        }}
                                    >
                                        {course.thumbnailPicture && <img src={course.thumbnailPicture} alt={course.name} />}
                                        <div
                                            className="course-card-content"
                                            key={course.id}
                                        >
                                            <h4>{course.name}</h4>
                                            <p>{truncate(course.description)}</p>
                                            <span className="price">Preço: R$ {course.lessonPrice.toFixed(2)}</span>
                                            <span className="days">
                                                Dias: {course.days.map(day => day).join(", ")}
                                            </span>
                                            {course.lessonStatuses && course.lessonStatuses.length > 0 && (
                                                <span className="lesson-status">
                                                    {course.lessonStatuses && course.lessonStatuses[0] === "Pendente" ? (
                                                        <p>Pendente de aprovação</p>
                                                    ) : (
                                                        <p>Aprovado</p>
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <StatusModal
                                        isOpen={isStatusModalOpen}
                                        onClose={() => setIsStatusModalOpen(false)}
                                        course={selectedCourse}
                                        token={token!}
                                        lessonId={+course.lessonId}
                                        key={+course.lessonId}
                                        refreshCourses={fetchData}
                                    />
                                </>
                            ))}
                        </div>
                    )}

                    {user.authorities?.permission === "Professor" && (
                        <>
                            <button className="add-course-btn" onClick={() => setIsModalOpen(true)}>
                                Adicionar Novo Curso
                            </button>

                            <AddCourseModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                token={token!}
                                userId={user.id}
                                onCourseAdded={handleCourseAdded}
                                key={+user.id}
                            />
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}

export default ProfilePage;

import './Profile.css';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Header from "../../components/Header";
import notFound from '@/assets/notfound.svg'
import AddCourseModal from '../../components/AddCourseModal';

interface RoleInterface {
    id?: string;
    permission: "Professor" | "Estudante";
}

interface DisponibleDaysInterface {
    day: string;
}

interface CourseInterface {
    id: string;
    name: string;
    description: string;
    lessonPrice: number;
    thumbnailPicture: string;
    disponibleDays: DisponibleDaysInterface[];
}

interface UserInterface {
    id: string;
    name: string;
    email: string;
    mobileNumber?: string;
    cpf?: string;
    profilePicture?: string;
    authorities?: RoleInterface;
    courses: CourseInterface[];
}

function ProfilePage() {
    const [user, setUser] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = localStorage.getItem("token");

    const handleCourseAdded = () => {
        setLoading(true);
        setUser(null);
    };

    const truncate = (text: string, max = 100) => {
        return text.length > max ? text.slice(0, max) + "..." : text
    };


    useEffect(() => {
        if (!token) return;

        let decodedId: string;

        try {
            const decoded: any = jwtDecode(token);
            decodedId = decoded.personId;
        } catch (err) {
            console.error("Token inválido", err);
            setError("Token inválido");
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
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
                data.courses = data.courses ?? [];

                setUser(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token, loading]);

    if (!token) return <Navigate to="/login" />;
    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!user) return <p>Nenhum usuário encontrado</p>;

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
                    <h3>Cursos</h3>

                    {user.courses.length === 0 ? (
                        <img className="course-notfound" src={notFound} alt='Sem cursos cadastrados' />
                    ) : (
                        <div className="courses-list">
                            {user.courses.map(course => (
                                <div className="course-card" key={course.id}>
                                    {course.thumbnailPicture && <img src={course.thumbnailPicture} alt={course.name} />}
                                    <div className="course-card-content">
                                        <h4>{course.name}</h4>
                                        <p>{truncate(course.description)}</p>
                                        <span className="price">Preço: R$ {course.lessonPrice}</span>
                                        <span className="days">Dias: {course.disponibleDays.map(d => d.day).join(", ")}</span>
                                    </div>
                                </div>
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
                            />
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}

export default ProfilePage;

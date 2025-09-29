import './Profile.css';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Header from "../../components/Header";
import notFound from '@/assets/notfound.svg'

interface RoleInterface {
    id?: string;
    permission: "Professor" | "Estudante";
}

interface CourseInterface {
    id: string;
    name: string;
    description: string;
    lessonPrice: number;
    thumbnailPicture: string;
    days: string[];
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
    const token = localStorage.getItem("token");

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
    }, [token]);

    if (!token) return <Navigate to="/login" />;
    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!user) return <p>Nenhum usuário encontrado</p>;

    return (
        <div className="profile-container">
            <Header />
            <div className="profile-card">
                {/* Left: User info */}
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

                {/* Right: Courses */}
                <div className="profile-courses-section">
                    <h3>Cursos</h3>

                    {user.courses.length === 0 ? (
                        <img className="course-notfound" src={notFound} alt='Sem cursos cadastrados' />
                    ) : (
                        <div className="courses-list">
                            {user.courses.map(course => (
                                <div key={course.id} className="course-card">
                                    <h4>{course.name}</h4>
                                    <p>{course.description}</p>
                                    <p>Preço: R$ {course.lessonPrice}</p>
                                    <p>Dias: {course.days.join(", ")}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {user.authorities?.permission === "Professor" && (
                        <button className="add-course-btn">Adicionar Novo Curso</button>
                    )}

                </div>
            </div>
        </div>
    );
}

export default ProfilePage;

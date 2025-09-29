import { Link, useSearchParams } from 'react-router-dom';
import musicianCello from '@/assets/mulher.png';
import musicianFlute from '@/assets/carinha-flauta.png';
import musicianGuitar from '@/assets/carinha-violao.png';
import './Home.css';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { Bounce, toast } from 'react-toastify';

interface Category {
    id: string;
    name: string;
    description: string;
    logoUrl: string;
}

interface Course {
    id: string;
    name: string;
    description: string;
    lessonPrice: string;
    thumbnailPicture: string;
    category: Category;
    disponibleDays: { day: string }[];
}

function HomePage() {
    const [limit, setLimit] = useState(6);
    const [search, setSearch] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const cityParam = searchParams.get("cidade") || "";
        setSearch(cityParam);
    }, [searchParams]);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await fetch("/api/courses/find-all", { method: "GET" });

                if (!response.ok) {
                    let errorMessage = "Erro ao buscar cursos";
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.message || errorMessage;
                    } catch {
                    }
                    callToast(errorMessage, "error");
                    return;
                }

                const data = await response.json();
                setCourses(data.courses);
            } catch (error) {
                callToast("Erro de conexão com o servidor", "error");
                console.error("Error fetching courses:", error);
            }
        }

        fetchCourses();
    }, []);

    const callToast = (message: string, type: "success" | "error" = "success") => {
        toast[type](message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };

    const handleSearch = (param: string) => {
        setSearch(param);

        const newParams = new URLSearchParams(searchParams.toString());
        if (param) {
            newParams.set("cidade", param);
        } else {
            newParams.delete("cidade");
        }
        setSearchParams(newParams);
    };

    return (
        <div className='container'>
            <Header />
            <div className="home-container">
                <main>
                    <section className="hero-section">
                        <div className="hero-content">
                            <h1>Aulas de iniciação musical com professores particulares</h1>
                            <ul className="hero-features">
                                <li>🏆 A nata das aulas particulares</li>
                                <li>👥 4,373 professores de iniciação musical</li>
                                <li>🔒 Pagamento 100% seguro</li>
                                <li>✏️ Passe Aluno ilimitado</li>
                            </ul>
                            <div className="search-bar">
                                <span className="search-icon">📍</span>
                                <input
                                    type="text"
                                    placeholder="Local das aulas"
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                                <button
                                    className="search-button"
                                    onClick={() => handleSearch(search)}
                                >
                                    🔍
                                </button>
                            </div>
                        </div>
                        <div className="hero-images">
                            <div className="image-arch arch-1">
                                <img src={musicianCello} alt="Violoncelista" />
                            </div>
                            <div className="image-arch arch-2">
                                <img src={musicianFlute} alt="Flautista" />
                            </div>
                            <div className="image-arch arch-3">
                                <img src={musicianGuitar} alt="Guitarrista" />
                            </div>
                        </div>
                    </section>

                    <section className="courses-section">
                        <h2>Confira nossos cursos disponíveis</h2>
                        <div className="courses-grid">
                            {courses.slice(0, limit).map((course) => (
                                <Link to={`/course/${course.id}`} className='course-link' key={course.id}>
                                    <div className="course-card">
                                        <div className="course-image">
                                            <img src={course.thumbnailPicture} alt={course.name} />
                                        </div>
                                        <h3>{course.name}</h3>
                                        <p>{course.category.name}</p>

                                        <div className="course-overlay">
                                            <p>{course.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {limit < courses.length && (
                            <button className="more-courses-btn" onClick={() => setLimit(limit + 6)}>
                                Carregar mais cursos <span>&rarr;</span>
                            </button>
                        )}
                    </section>
                </main>

                <footer className="home-footer">
                    <p>Todos direitos reservados Tocaqui LTDA.</p>
                </footer>
            </div>
        </div>
    );
}

export default HomePage;

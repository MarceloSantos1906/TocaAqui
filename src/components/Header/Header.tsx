import './Header.css';
import { FaUser } from "react-icons/fa";
import logo from '@/assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
    id: string;
    name: string;
    email: string;
    iat?: number;
}

function Header() {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);

            try {
                const decoded: User = jwtDecode(storedToken);
                setUser(decoded);
            } catch (error) {
                console.error("Token inválido:", error);
            }
        }
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setOpenDropdown(false);
        navigate("/");
    };

    const goToProfile = () => {
        navigate("/profile");
        setOpenDropdown(false);
    };

    return (
        <header className="professor-header">
            <div className="header-left">
                <div className="logo-icon">
                    <Link to="/">
                        <img src={logo} alt="Tocaqui Logo" className="header-logo-img" />
                    </Link>
                </div>
            </div>

            <div className="header-right" ref={dropdownRef}>
                {!token ? (
                    <Link to={"/login"} className="login-link">
                        <div className="user-icon">
                            <FaUser />
                        </div>
                    </Link>
                ) : (
                    <div
                        className="user-icon"
                        onClick={() => setOpenDropdown(prev => !prev)}
                    >
                        <FaUser />
                    </div>
                )}

                {openDropdown && user && (
                    <div className="user-dropdown">
                        <p>Olá, <strong>{user.name}</strong> 👋</p>
                        <button onClick={goToProfile}>Minhas Informações</button>
                        <div className="separator" />
                        <button className="logout" onClick={handleLogout}>Sair</button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;

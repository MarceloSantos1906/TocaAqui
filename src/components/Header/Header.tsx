import './Header.css';
import { FaUser } from "react-icons/fa";
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="professor-header">
            <div className="header-left">
                <div className="logo-icon">
                    <Link to="/">
                        <img src={logo} alt="Tocaqui Logo" className="logo-img" />
                    </Link>
                </div>
            </div>
            <div className="header-right">
                <div className="user-icon"><FaUser /></div>
            </div>
        </header>
    )
}

export default Header;
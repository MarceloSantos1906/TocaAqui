import { Link } from "react-router-dom";
import logo from "../../assets/react.svg";
import "./Login.css";

function LoginPage() {
    return (
        <main className="main-container">
            <section className="left-panel">
                <header className="logo">
                    <img src={logo} alt="Tocaqui Logo" className="logo-img" />
                    <h1>TOCAQUI</h1>
                </header>
                <div className="slogan">
                    <h2>Conectando músicos e professores na sua região.</h2>
                </div>
                <footer className="footer-text">
                    <p>Todos direitos reservados Tocaqui LTDA.</p>
                </footer>
            </section>

            <section className="right-panel">
                <div className="login-form">
                    <h2>
                        Você está a um passo de conhecer os melhores professores da região
                    </h2>
                    <form>
                        <div className="input-group">
                            <input type="text" id="username" placeholder="Usuário" />
                        </div>
                        <div className="input-group">
                            <input type="password" id="password" placeholder="Senha" />
                        </div>
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Mantenha-me conectado</label>
                        </div>
                        <div className="form-actions">
                            <Link to="/register" className="create-account">
                                Novo por aqui? Crie sua conta!
                            </Link>
                            <button type="submit" className="login-button">
                                Entrar
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default LoginPage;

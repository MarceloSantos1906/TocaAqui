import { Link } from 'react-router-dom';
import logo from '../../assets/react.svg';
import './Register.css';

function RegisterPage() {
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
                    <h2>Você está a um passo de conhecer os melhores professores da região</h2>
                    <form>
                        <div className="input-group">
                            <input type="text" placeholder="Nome" />
                        </div>
                        <div className="input-group">
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="input-group">
                            <input type="text" placeholder="CPF" />
                        </div>

                        <div className="input-row">
                            <div className="input-group">
                                <input type="password" placeholder="Senha" />
                            </div>
                            <div className="input-group">
                                <input type="password" placeholder="Repita sua senha" />
                            </div>
                        </div>

                        <div className="role-selection">
                            <div className="radio-option">
                                <input type="radio" id="professor" name="role" value="professor" defaultChecked />
                                <label htmlFor="professor">Professor</label>
                            </div>
                            <div className="radio-option">
                                <input type="radio" id="aluno" name="role" value="aluno" />
                                <label htmlFor="aluno">Aluno</label>
                            </div>
                        </div>

                        <div className="form-actions">
                            <Link to="/login" className="create-account">Realizar login</Link>
                            <button type="submit" className="login-button">
                                Criar conta
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default RegisterPage;
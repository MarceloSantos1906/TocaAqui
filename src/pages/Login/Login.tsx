import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import "./Login.css";
import type { User } from "../../types";
import { createFakeJWT } from "../../functions/createToken";
import { Bounce, toast } from "react-toastify";


function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const usernameInput = (document.getElementById("username") as HTMLInputElement).value;
        const passwordInput = (document.getElementById("password") as HTMLInputElement).value;
        const roleInput = (document.querySelector('input[name="role"]:checked') as HTMLInputElement)?.value || "student";

        if (!usernameInput || !passwordInput) {
            alert("Preencha usuário e senha!");
            return;
        }

        const user: User = {
            id: "123",
            name: usernameInput,
            email: `${usernameInput}@teste.com`,
            role: roleInput,
        };

        const token = createFakeJWT(user);
        localStorage.setItem("token", token);

        callToast("Login realizado com sucesso!");

        navigate("/");
    };

    const callToast = (message: string) => {
        toast.success(message, {
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
    }

    return (
        <main className="main-container">
            <section className="left-panel">
                <header className="logo">
                    <Link to={"/"}>
                        <img src={logo} alt="Tocaqui Logo" className="logo-img" />
                    </Link>
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
                    <form onSubmit={handleLogin}>
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
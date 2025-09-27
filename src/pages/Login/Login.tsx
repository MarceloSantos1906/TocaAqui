import { Link, useNavigate, type NavigateFunction } from "react-router-dom";
import logo from "@/assets/logo.png";
import "./Login.css";
import type { User } from "../../types";
import { createFakeJWT } from "../../functions/createToken";
import { Bounce, toast } from "react-toastify";
import { z } from "zod";

const loginSchema = z.object({
    username: z.string().min(3, "Por favor, insira um nome de usuário válido"),
    password: z.string().min(6, "Por favor, insira uma senha com no mínimo 6 caracteres"),
    role: z.string().default("student"),
});

function LoginPage() {
    const navigate: NavigateFunction = useNavigate();

    const handleLogin: (e: React.FormEvent<HTMLFormElement>) => void = async (e) => {
    e.preventDefault();

        const usernameInput: string = (document.getElementById("username") as HTMLInputElement).value;
        const passwordInput: string = (document.getElementById("password") as HTMLInputElement).value;
        const roleInput: string =
            (document.querySelector('input[name="role"]:checked') as HTMLInputElement)?.value || "student";

        const result = loginSchema.safeParse({
            username: usernameInput,
            password: passwordInput,
            role: roleInput,
        });

        if (!result.success) {
            result.error.issues.forEach((issue) => {
                callToast(issue.message, "error");
            });
            return;
        }

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cpf: result.data.username,
                    password: result.data.password
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                callToast(errorData.message || "Erro ao fazer login", "error");
                return;
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);

            callToast("Login realizado com sucesso!", "success");
            navigate("/");
        } catch (error) {
            callToast("Erro de conexão com o servidor", "error");
            console.error("Login error:", error);
            }
        };

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
                    <h2>Você está a um passo de conhecer os melhores professores da região</h2>
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <input
                                type="text"
                                id="username"
                                placeholder="Usuário"
                                required
                                onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("Por favor, informe seu usuario.")}
                                onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("")}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                id="password"
                                placeholder="Senha"
                                required
                                onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("Por favor, informe sua senha.")}
                                onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("")}
                            />
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

import { Link, useNavigate, type NavigateFunction } from "react-router-dom";
import logo from "@/assets/logo.png";
import "./Login.css";
import { Bounce, toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCPF } from "../../common/functions/FormatCPF";

const loginSchema = z.object({
    username: z
        .string()
        .min(11, "Por favor, insira um CPF válido")
        .max(14, "CPF inválido"),
    password: z
        .string()
        .min(6, "Por favor, insira uma senha com no mínimo 6 caracteres"),
    role: z.string()
});

interface LoginResponseInterface {
    message: string;
    token: string
}

type LoginForm = z.infer<typeof loginSchema>;

function LoginPage() {
    const navigate: NavigateFunction = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting, isValid },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            username: "",
            password: "",
            role: "student",
        },
    });

    const onSubmit = async (data: LoginForm) => {
        try {
            const response: Response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cpf: data.username.replace(/\D/g, ""),
                    password: data.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                callToast(errorData.message || "Erro ao fazer login", "error");
                return;
            }

            const result: LoginResponseInterface = await response.json();

            localStorage.setItem("token", result.token);

            callToast(result.message, "success");
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* CPF */}
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Digite seu CPF"
                                maxLength={14}
                                {...register("username")}
                                onChange={(e) => setValue("username", formatCPF(e.target.value), { shouldValidate: true })}
                            />
                            {errors.username && <p className="error">{errors.username.message}</p>}
                        </div>

                        {/* Senha */}
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Digite sua senha"
                                {...register("password")}
                            />
                            {errors.password && <p className="error">{errors.password.message}</p>}
                        </div>

                        {/* Lembrar */}
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Mantenha-me conectado</label>
                        </div>

                        {/* Ações */}
                        <div className="form-actions">
                            <Link to="/register" className="create-account">
                                Novo por aqui? Crie sua conta!
                            </Link>
                            <button type="submit" className="login-button" disabled={!isValid || isSubmitting}>
                                {isSubmitting ? "Entrando..." : "Entrar"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default LoginPage;

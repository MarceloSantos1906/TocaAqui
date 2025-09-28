import { Link, useNavigate, type NavigateFunction } from 'react-router-dom';
import logo from "@/assets/logo.png";
import './Register.css';
import { Bounce, toast } from 'react-toastify';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateCPF } from '../../functions/validateCPF';
import { RegisterProvider, useRegister } from "../../context/RegisterContext";
import { formatCPF } from '../../common/functions/FormatCPF';
import { formatPhoneBR } from '../../common/functions/FormatPhone';

// Schema com role preprocessado para nunca ser undefined
const registerSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    mobileNumber: z
        .string()
        .min(10, "Número de telefone inválido")
        .max(15, "Número de telefone inválido"),
    cpf: z.string().refine(validateCPF, { message: "CPF inválido" }),
    profilePicture: z.url("URL de imagem inválida").optional().or(z.literal("")),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    repeatPassword: z.string(),
    role: z.string()
}).refine((data) => data.password === data.repeatPassword, {
    message: "As senhas não conferem",
    path: ["repeatPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

function RegisterPage() {
    const navigate: NavigateFunction = useNavigate();
    const { setCpf } = useRegister();

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting, isValid } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            mobileNumber: "",
            cpf: "",
            profilePicture: "",
            password: "",
            repeatPassword: "",
            role: "Estudante",
        }
    });

    const onSubmit = async (data: RegisterForm) => {
        try {

            const response = await fetch("/api/person/create-account", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    mobileNumber: data.mobileNumber.replace(/\D/g, ""),
                    cpf: data.cpf.replace(/\D/g, ""),
                    profilePicture: data.profilePicture,
                    password: data.password,
                    authority: data.role
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                callToast(errorData.message || "Erro ao criar conta", "error");
                return;
            }

            callToast("Conta criada com sucesso!", "success");
            setCpf(data.cpf);
            localStorage.setItem("cpf", data.cpf);
            setTimeout(() => navigate("/register-confirmation"), 0);
        } catch (error) {
            callToast("Erro de conexão com o servidor", "error");
            console.error("Register error:", error);
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
                    <h2>Crie sua conta para acessar os melhores professores da região</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Digite seu nome"
                                {...register("name")}
                            />
                            {errors.name && <p className="error">{errors.name.message}</p>}
                        </div>

                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Digite seu email"
                                {...register("email")}
                            />
                            {errors.email && <p className="error">{errors.email.message}</p>}
                        </div>

                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Digite seu telefone"
                                maxLength={15}
                                {...register("mobileNumber")}
                                onChange={(e) =>
                                    setValue("mobileNumber", formatPhoneBR(e.target.value), {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    })
                                }
                            />
                            {errors.mobileNumber && <p className="error">{errors.mobileNumber.message}</p>}
                        </div>

                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Digite seu CPF"
                                maxLength={14}
                                {...register("cpf")}
                                onChange={(e) => setValue("cpf", formatCPF(e.target.value), { shouldValidate: true })}
                            />
                            {errors.cpf && <p className="error">{errors.cpf.message}</p>}
                        </div>

                        <div className="input-group">
                            <input
                                type="url"
                                placeholder="Adicione a URL da sua foto"
                                {...register("profilePicture")}
                            />
                            {errors.profilePicture && <p className="error">{errors.profilePicture.message}</p>}
                        </div>

                        <div className="input-row">
                            <div className="input-group">
                                <input
                                    type="password"
                                    placeholder="Digite sua senha"
                                    {...register("password")}
                                />
                                {errors.password && <p className="error">{errors.password.message}</p>}
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    placeholder="Repita sua senha"
                                    {...register("repeatPassword")}
                                />
                                {errors.repeatPassword && <p className="error">{errors.repeatPassword.message}</p>}
                            </div>
                        </div>

                        <div className="role-selection">
                            <div className="radio-option">
                                <input
                                    type="radio"
                                    id="professor"
                                    value="Professor"
                                    {...register("role")}
                                    defaultChecked
                                />
                                <label htmlFor="professor">Professor</label>
                            </div>
                            <div className="radio-option">
                                <input
                                    type="radio"
                                    id="aluno"
                                    value="Estudante"
                                    {...register("role")}
                                />
                                <label htmlFor="aluno">Aluno</label>
                            </div>
                        </div>

                        <div className="form-actions">
                            <Link to="/login" className="create-account">Já possui conta? Realizar login!</Link>
                            <button type="submit" className="login-button" disabled={!isValid || isSubmitting}>
                                {isSubmitting ? "Criando..." : "Criar conta"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default function AppWrapper() {
    return (
        <RegisterProvider>
            <RegisterPage />
        </RegisterProvider>
    );
}

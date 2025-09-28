import { Link, useNavigate, type NavigateFunction } from 'react-router-dom';
import logo from "@/assets/logo.png";
import './Register.css';
import { Bounce, toast } from 'react-toastify';
import { z } from "zod";
import { validateCPF } from '../../functions/validateCPF';

function removeNonDigits(text: string): string {
  return text.replace(/\D+/g, '');
}

const registerSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.email("E-mail inválido"),
  mobileNumber: z.string().min(10, "Número de telefone inválido").max(15, "Número de telefone inválido").transform(removeNonDigits),
  cpf: z.string().transform(removeNonDigits).refine(validateCPF, { message: "CPF inválido" }),
  profilePicture: z.url("URL de imagem inválida").optional().or(z.literal("")),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  repeatPassword: z.string(),
  role: z.string(),
}).refine((data) => data.password === data.repeatPassword, {
  message: "As senhas não conferem",
  path: ["repeatPassword"],
});

function RegisterPage() {
  const navigate: NavigateFunction = useNavigate();

  const handleRegister: (e: React.FormEvent<HTMLFormElement>) => void = async (e) => {
    e.preventDefault();

    const form: EventTarget & HTMLFormElement = e.currentTarget;
    const name: string = (form.querySelector('input[placeholder="Nome"]') as HTMLInputElement).value;
    const email: string = (form.querySelector('input[placeholder="Email"]') as HTMLInputElement).value;
    const mobileNumber: string = (form.querySelector('input[placeholder="Mobile Number"]') as HTMLInputElement).value;
    const cpf: string = (form.querySelector('input[placeholder="CPF"]') as HTMLInputElement).value;
    const profilePicture: string = (form.querySelector('input[placeholder="https://picsum.photos/300"]') as HTMLInputElement).value;
    const password: string = (form.querySelector('input[placeholder="Senha"]') as HTMLInputElement).value;
    const repeatPassword: string = (form.querySelector('input[placeholder="Repita sua senha"]') as HTMLInputElement).value;
    const role: string = (form.querySelector('input[name="role"]:checked') as HTMLInputElement).value;

    const result = registerSchema.safeParse({
      name,
      email,
      mobileNumber,
      cpf,
      profilePicture,
      password,
      repeatPassword,
      role,
    });

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        callToast(issue.message, "error");
      });
      return;
    }

    try {
      const response = await fetch("/api/person/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.data.name,
          email: result.data.email,
          mobileNumber: result.data.mobileNumber,
          cpf: result.data.cpf,
          profilePicture: result.data.profilePicture,
          password: result.data.password,
          authority: result.data.role
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
          <h2 className="text-white">Você está a um passo de conhecer os melhores professores da região</h2>
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Nome"
                required
                onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("Por favor, informe seu nome.")}
                onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("")}
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                required
                onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("Por favor, informe um e-mail válido.")}
                onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("")}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Mobile Number"
                required
                onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("Por favor, informe seu telefone.")}
                onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("")}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="CPF"
                required
                onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("Por favor, informe seu cpf.")}
                onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("")}
              />
            </div>
            <div className="input-group">
              <input
                type="url"
                placeholder="https://picsum.photos/300"
                onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("Por favor, informe uma URL de imagem válida.")}
                onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("")}
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Senha"
                  required
                  onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("Por favor, informe sua senha.")}
                  onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("")}
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Repita sua senha"
                  required
                  onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("Por favor, repita sua senha.")}
                  onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("")}
                />
              </div>
            </div>

            <div className="role-selection">
              <div className="radio-option">
                <input type="radio" id="professor" name="role" value="Professor" defaultChecked />
                <label htmlFor="professor">Professor</label>
              </div>
              <div className="radio-option">
                <input type="radio" id="aluno" name="role" value="Estudante" />
                <label htmlFor="aluno">Aluno</label>
              </div>
            </div>

            <div className="form-actions">
              <Link to="/login" className="create-account">Já possui conta? Realizar login!</Link>
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

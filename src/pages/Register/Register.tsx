import { Link, useNavigate, type NavigateFunction } from 'react-router-dom';
import logo from "@/assets/logo.png";
import './Register.css';
import type { User } from '../../types';
import { createFakeJWT } from '../../functions/createToken';
import { Bounce, toast } from 'react-toastify';
import { z } from "zod";
import { validateCPF } from '../../functions/validateCPF';

const registerSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  cpf: z.string().refine(validateCPF, { message: "CPF inválido" }),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  repeatPassword: z.string(),
  role: z.string(),
}).refine((data) => data.password === data.repeatPassword, {
  message: "As senhas não conferem",
  path: ["repeatPassword"],
});

function RegisterPage() {
  const navigate: NavigateFunction = useNavigate();

  const handleRegister: (e: React.FormEvent<HTMLFormElement>) => void = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form: EventTarget & HTMLFormElement = e.currentTarget;
    const name: string = (form.querySelector('input[placeholder="Nome"]') as HTMLInputElement).value;
    const email: string = (form.querySelector('input[placeholder="Email"]') as HTMLInputElement).value;
    const cpf: string = (form.querySelector('input[placeholder="CPF"]') as HTMLInputElement).value;
    const password: string = (form.querySelector('input[placeholder="Senha"]') as HTMLInputElement).value;
    const repeatPassword: string = (form.querySelector('input[placeholder="Repita sua senha"]') as HTMLInputElement).value;
    const role: string = (form.querySelector('input[name="role"]:checked') as HTMLInputElement).value;

    const result = registerSchema.safeParse({
      name,
      email,
      cpf,
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

    const user: User = {
      id: "123",
      name: result.data.name,
      email: result.data.email,
      role: result.data.role,
    };

    const token: string = createFakeJWT(user);
    localStorage.setItem("token", token);

    callToast(`Olá ${user.name}, cadastro realizado com sucesso!`, "success");

    navigate("/");
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
                placeholder="CPF"
                required
                onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("Por favor, informe seu cpf.")}
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
                <input type="radio" id="professor" name="role" value="professor" defaultChecked />
                <label htmlFor="professor">Professor</label>
              </div>
              <div className="radio-option">
                <input type="radio" id="aluno" name="role" value="aluno" />
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

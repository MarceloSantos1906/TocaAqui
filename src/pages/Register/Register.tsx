import { Link, useNavigate } from 'react-router-dom';
import logo from "@/assets/logo.png";
import './Register.css';
import type { User } from '../../types';
import { createFakeJWT } from '../../functions/createToken';
import { Bounce, toast } from 'react-toastify';

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = (form.querySelector('input[placeholder="Nome"]') as HTMLInputElement).value;
    const email = (form.querySelector('input[placeholder="Email"]') as HTMLInputElement).value;
    const cpf = (form.querySelector('input[placeholder="CPF"]') as HTMLInputElement).value;
    const password = (form.querySelector('input[placeholder="Senha"]') as HTMLInputElement).value;
    const repeatPassword = (form.querySelector('input[placeholder="Repita sua senha"]') as HTMLInputElement).value;
    const role = (form.querySelector('input[name="role"]:checked') as HTMLInputElement).value;

    if (!name || !email || !cpf || !password || !repeatPassword) {
      alert("Preencha todos os campos!");
      return;
    }

    if (password !== repeatPassword) {
      alert("As senhas não conferem!");
      return;
    }

    const user: User = {
      id: "123",
      name,
      email,
      role,
    };

    const token = createFakeJWT(user);
    localStorage.setItem("token", token);

    callToast(`Olá ${user.name}, cadastro realizado com sucesso!`);

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
          <h2>Você está a um passo de conhecer os melhores professores da região</h2>
          <form onSubmit={handleRegister}>
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

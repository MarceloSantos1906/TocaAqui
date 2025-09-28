import { Link, useNavigate, type NavigateFunction } from 'react-router-dom';
import logo from "@/assets/logo.png";
import './RegisterConfirmation.css';
import type { User } from '../../types';
import { createFakeJWT } from '../../functions/createToken';
import { Bounce, toast } from 'react-toastify';
import { z } from "zod";
import { validateCPF } from '../../functions/validateCPF';

const registerSchema = z.object({
	name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
	email: z.email("E-mail inválido"),
	mobileNumber: z.string().min(10, "Número de telefone inválido").max(15, "Número de telefone inválido"),
	cpf: z.string().refine(validateCPF, { message: "CPF inválido" }),
	profilePicture: z.url("URL de imagem inválida").optional().or(z.literal("")),
	password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
	repeatPassword: z.string(),
	role: z.string(),
}).refine((data) => data.password === data.repeatPassword, {
	message: "As senhas não conferem",
	path: ["repeatPassword"],
});

function RegisterPage() {
	return (
		<main className="main-container">
			<section className="left-panel">
				<header className="logo">
					<Link to={"/"}>
						<img src={logo} alt="Tocaqui Logo" className="logo-img" />
					</Link>
				</header>
				<div className="email-instruction">
					<h2>Insira o código enviado ao seu e-mail.</h2>
				</div>
				<form className="confirmation-form">
					<input type="text" id="confirmation-code" name="confirmation-code" className="confirmation-input" placeholder="Digite o código aqui" />
					<button type="submit" className="confirm-button">Confirmar</button>
				</form>
				<div className="back-to-login">
					<p>Já possui uma conta? <Link to={"/login"} className="login-link">Entrar</Link></p>
				</div>
				<footer className="footer-text">
					<p>Todos direitos reservados Tocaqui LTDA.</p>
				</footer>
			</section>	
		</main>
	);
}

export default RegisterPage;

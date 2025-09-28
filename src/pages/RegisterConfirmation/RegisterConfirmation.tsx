import { Link, useNavigate } from 'react-router-dom';
import logo from "@/assets/logo.png";
import './RegisterConfirmation.css';
import { Bounce, toast } from 'react-toastify';
import { z } from "zod";
import { useRegister } from "../../context/RegisterContext";

const confirmationSchema = z.object({
	code: z.number().min(6, "O codigo deve conter 6 caracteres").max(6, "O codigo deve conter 6 caracteres")
});

function RegisterPage() {
	const { cpf } = useRegister();
	const navigate = useNavigate();

	const handleConfirmation: (e: React.FormEvent<HTMLFormElement>) => void = async (e) => {
		e.preventDefault();

		const form: EventTarget & HTMLFormElement = e.currentTarget;
		const code: string = (form.querySelector('123456') as HTMLInputElement).value;

		const result = confirmationSchema.safeParse({
			code
		});

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				callToast(issue.message, "error");
			});
			return;
		}

		try {
			const response = await fetch("/api/person/activate-account", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					cpf,
					code: result.data.code,
				}
				),
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
				<div className="email-instruction">
					<h2>Insira o código enviado ao seu e-mail.</h2>
				</div>
				<form className="confirmation-form" onSubmit={handleConfirmation}>
					<input type="text" id="confirmation-code" name="confirmation-code" className="confirmation-input" placeholder="Digite o código aqui" />
					<br />
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

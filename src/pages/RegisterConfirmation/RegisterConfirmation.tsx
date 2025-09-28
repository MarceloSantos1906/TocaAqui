import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import "./RegisterConfirmation.css";
import { Bounce, toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../../context/RegisterContext";

const confirmationSchema = z.object({
	code: z.string().length(6, "O código deve conter 6 dígitos")
});

type ConfirmationForm = z.infer<typeof confirmationSchema>;

interface RegisterConfirmationResponseInterface {
	message: string;
	token: string;
}

function RegisterConfirmationPage() {
	const { cpf: contextCpf } = useRegister();
	const cpf: string | null = contextCpf || localStorage.getItem("cpf");

	const navigate = useNavigate();

	const { handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<ConfirmationForm>({
		resolver: zodResolver(confirmationSchema),
		mode: "onChange",
	});

	const onSubmit = async (data: ConfirmationForm) => {
		try {
			const response = await fetch("/api/person/activate-account", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					cpf: cpf?.replace(/\D/g, ""),
					code: data.code,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				callToast(errorData.message || "Erro ao ativar conta", "error");
				return;
			}

			const result: RegisterConfirmationResponseInterface = await response.json();

			localStorage.setItem("token", result.token);
			callToast("Conta ativada com sucesso!", "success");
			localStorage.removeItem("cpf");
			navigate("/");
		} catch (error) {
			callToast("Erro de conexão com o servidor", "error");
			console.error(error);
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const value = e.target.value.replace(/\D/g, "");
		const codeArr = getCodeArray();
		codeArr[index] = value;
		setValue("code", codeArr.join(""));

		if (value && index < 5) {
			const nextInput = document.getElementById(`code-${index + 1}`);
			nextInput?.focus();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
		const codeArr = getCodeArray();

		if (e.key === "Backspace") {
			e.preventDefault();
			if (codeArr[index]) {
				codeArr[index] = "";
				setValue("code", codeArr.join(""));
			} else if (index > 0) {
				const prevInput = document.getElementById(`code-${index - 1}`) as HTMLInputElement;
				prevInput?.focus();
				codeArr[index - 1] = "";
				setValue("code", codeArr.join(""));
			}
		}
	};

	const getCodeArray = () => {
		const val = (watch("code") || "").padEnd(6, "");
		return val.split("");
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
				<form className="confirmation-form" onSubmit={handleSubmit(onSubmit)}>
					<div className="code-inputs">
						{Array.from({ length: 6 }).map((_, i) => (
							<input
								key={i}
								id={`code-${i}`}
								type="text"
								maxLength={1}
								className="confirmation-input"
								value={getCodeArray()[i] || ""}
								onChange={(e) => handleInputChange(e, i)}
								onKeyDown={(e) => handleKeyDown(e, i)}
							/>
						))}
					</div>
					{errors.code && <p className="error">{errors.code.message}</p>}
					<button type="submit" className="confirm-button" disabled={isSubmitting}>
						Confirmar
					</button>
				</form>

				<footer className="footer-text">
					<p>Todos direitos reservados Tocaqui LTDA.</p>
				</footer>
			</section>
		</main>
	);
}

export default RegisterConfirmationPage;

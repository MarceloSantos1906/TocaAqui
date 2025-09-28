import { createContext, useContext, useState, ReactNode } from "react";

interface RegisterContextType {
    cpf: string;
    setCpf: (cpf: string) => void;
}

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export function RegisterProvider({ children }: { children: ReactNode }) {
    const [cpf, setCpf] = useState("");
    return (
        <RegisterContext.Provider value={{ cpf, setCpf }}>
            {children}
        </RegisterContext.Provider>
    );
}

export function useRegister() {
    const context = useContext(RegisterContext);
    if (!context) throw new Error("useRegister must be used within RegisterProvider");
    return context;
}
import { useEffect, useState } from "react";
import './AddCourseModal.css';

interface AddCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    token: string;
    userId: string;
    onCourseAdded: () => void;
}

interface Category {
    id: string;
    name: string;
}

export default function AddCourseModal({ isOpen, onClose, token, userId, onCourseAdded }: AddCourseModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [lessonPrice, setLessonPrice] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [disponibleDays, setDisponibleDays] = useState<string[]>([]);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [loadingDays, setLoadingDays] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        if (!isOpen) return;

        const fetchDays = async () => {
            try {
                const res = await fetch('/api/disponible-days/find', {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await res.json();
                setDisponibleDays(data.disponibleDays ?? []);
            } catch (err) {
                console.error(err);
                setDisponibleDays([]);
            } finally {
                setLoadingDays(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories/find-all', {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await res.json();
                setCategories(data.categories ?? []);
            } catch (err) {
                console.error(err);
                setCategories([]);
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchDays();
        fetchCategories();
    }, [isOpen, token]);

    const toggleDay = (day: string) => {
        setSelectedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const formatBRL = (value: string) => {
        let numericValue = value.replace(/\D/g, "");

        numericValue = (Number(numericValue) / 100).toFixed(2);

        numericValue = numericValue.replace(".", ",");

        return `R$ ${numericValue}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!categoryId) return alert("Selecione uma categoria");

            const payload = {
                name,
                description,
                lessonPrice: lessonPrice
                    .replace(/\s/g, "")
                    .replace("R$", "")
                    .replace(".", "")
                    .replace(",", "."),
                thumbnail,
                categoryId: Number(categoryId),
                instructorId: Number(userId),
                disponibleDays: selectedDays
            };

            const response = await fetch('/api/courses/create', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Erro ao buscar usuário");
            }

            onCourseAdded();
            onClose();
        } catch (err: any) {
            alert(err.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Adicionar Novo Curso</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>
                        Nome:
                        <input value={name} onChange={e => setName(e.target.value)} required />
                    </label>
                    <label>
                        Descrição:
                        <textarea value={description} onChange={e => setDescription(e.target.value)} required />
                    </label>
                    <label>
                        Preço:
                        <input
                            type="text"
                            value={lessonPrice}
                            onChange={e => setLessonPrice(formatBRL(e.target.value))}
                            placeholder="R$ 0,00"
                            required
                        />
                    </label>
                    <label>
                        Thumbnail URL:
                        <input value={thumbnail} onChange={e => setThumbnail(e.target.value)} required />
                    </label>
                    <label>
                        Categoria:
                        {loadingCategories ? <p>Carregando categorias...</p> : (
                            <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
                                <option value="">Selecione</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        )}
                    </label>
                    <label>
                        Dias Disponíveis:
                        {loadingDays ? <p>Carregando dias...</p> : (
                            <div className="days-checkboxes">
                                {disponibleDays.map(day => (
                                    <div key={day}>
                                        <input
                                            type="checkbox"
                                            id={day}
                                            value={day}
                                            checked={selectedDays.includes(day)}
                                            onChange={() => toggleDay(day)}
                                        />
                                        <label htmlFor={day}>{day}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </label>
                    <button type="submit">Cadastrar Curso</button>
                </form>
            </div>
        </div>
    );
}

import { useParams } from 'react-router-dom'
import './ProfessorsDetails.css'
export default function ProfessorsDetails () {

    const { param } = useParams()

    return (
        <section className="container-professor">
            <h1 className='title'>
                Aprenda e evolua rápido na produção musical com acompanhamento técnico especializado, comece somente com o seu computador e fones de ouvido. Do zero ao avançado.
            </h1>
        </section>
    )
}
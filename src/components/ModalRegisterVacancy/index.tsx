import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import apiDsn from "../../services/apiDsn";
import styles from './styles.module.scss';

interface CloseModalProps {
    modalIsOpen: boolean;
    handleCloseModal: () => void;
};

interface RegisterVacancyProps {
    id: string;
    role: string;
    description: string;
    experienceLevel: string;
    modality: string;
    company: string;
    vacancyType: string;
    salary?: number | null | string;
    contractType?: string
}

export function ModalRegisterVacancy({ handleCloseModal, modalIsOpen }: CloseModalProps) {
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [modality, setModality] = useState('');
    const [company, setCompany] = useState('');
    const [vacancyType, setVacancyType] = useState('');
    const [salary, setSalary] = useState('');
    const [contractType, setContractType] = useState('');

    const isOpen = modalIsOpen;

    const [vacancyData, setVacancyData] = useState({});

    async function handleSubmit(e: any) {
        e.preventDefault();
        await apiDsn
            .post("/opportunities", {
                role,
                description,
                experienceLevel,
                modality,
                company,
                vacancyType,
                salary,
                contractType
            })
            .then((res) => {
                const data: RegisterVacancyProps = {
                    id: res.data.id,
                    role: role,
                    description: description,
                    experienceLevel: experienceLevel,
                    modality: modality,
                    company: company,
                    vacancyType: vacancyType,
                    salary: salary,
                    contractType: contractType
                }
                setVacancyData(data);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Erro ao cadastrar a vaga");
            })
    }


    return (
        // eslint-disable-next-line
        <>
            {isOpen && (
                <div className={styles.container}>
                    <div className={styles.modal}>
                        <header>
                            <h2>Cadastrar uma nova vaga</h2>

                            <button onClick={handleCloseModal}>
                                <AiFillCloseCircle size={38} color="#0745B7" />
                            </button>
                        </header>

                        <form onSubmit={handleSubmit}>
                            <label>
                                Cargo
                                <input
                                    type="text"
                                    placeholder="Posição que estou buscando"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                            </label>

                            <label>
                                Descrição do cargo
                                <input
                                    type="text"
                                    placeholder="Conte mais sobre essa vaga..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </label>

                            <label>
                                Nível de experiência
                                {/* <input
                                    type="text"
                                    placeholder="Localidade da empresa"
                                    value={experienceLevel}
                                    onChange={(e) => setExperienceLevel(e.target.value)}
                                /> */}
                                <select onChange={(e) => setExperienceLevel(e.target.value)}>
                                    <option value={experienceLevel}>Júnior</option>
                                    <option value={experienceLevel}>Pleno</option>
                                    <option value={experienceLevel}>Sênior</option>
                                    <option value={experienceLevel}>Tech Leader</option>
                                    <option value={experienceLevel}>Arquiteto de software</option>
                                </select>
                            </label>

                            <label>
                                Modalidade
                                {/* <textarea
                                    placeholder="1200 caracteres max."
                                    value={modality}
                                    onChange={(e) => setModality(e.target.value)}
                                    maxLength={1200}
                                /> */}
                                <select onChange={(e) => setModality(e.target.value)}>
                                    <option value={modality}>Presencial</option>
                                    <option value={modality}>Remoto</option>
                                    <option value={modality}>Híbrido</option>
                                </select>
                            </label>

                            <label>
                                Empresa
                                <input
                                    type="text"
                                    placeholder="Nome da empresa"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                />
                            </label>

                            <label>
                                Tipo da vaga
                                <select onChange={(e) => setVacancyType(e.target.value)}>
                                    <option value={vacancyType}>Integral</option>
                                    <option value={vacancyType}>Meio Período</option>
                                    <option value={vacancyType}>Freelancer</option>
                                    <option value={vacancyType}>Contrato</option>
                                    <option value={vacancyType}>Estágio</option>
                                </select>
                            </label>

                            <label>
                                Salário
                                <input
                                    type="text"
                                    placeholder="Informe o salário dessa vaga"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                            </label>

                            <label>
                                Tipo de contrato
                                <select onChange={(e) => setContractType(e.target.value)}>
                                    <option value={contractType}>CLT</option>
                                    <option value={contractType}>PJ</option>
                                </select>
                            </label>

                            <button onClick={handleSubmit}>Salvar dados</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
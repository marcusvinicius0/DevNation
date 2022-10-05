import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import styles from './styles.module.scss';

interface CloseModalProps {
    modalIsOpen: boolean;
    handleCloseModal: () => void;
};

export function ModalRegisterVacancy({ handleCloseModal, modalIsOpen }: CloseModalProps) {
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [modality, setModality] = useState('');
    const [company, setCompany] = useState('');
    const [locality, setLocality] = useState('');
    const [vacancyType, setVacancyType] = useState('');
    const [salary, setSalary] = useState('');
    const [contractType, setContractType] = useState('');

    const isOpen = modalIsOpen;

    function handleSubmit(e: any) {
        e.preventDefault();
        console.log(experienceLevel);
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
                                Localidade da vaga
                                <input
                                    type="text"
                                    placeholder="Localidade"
                                    value={locality}
                                    onChange={(e) => setLocality(e.target.value)}
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
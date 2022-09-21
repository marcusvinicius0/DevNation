import React, { useState } from 'react';

import { AiFillCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';

import styles from './styles.module.scss';





export default function EditInfoCompanyModal() {


    const [nameCompany, setNameCompany] = useState('')
    const [companyDescription, setCompanyDescription] = useState('')
    const [locationCompany, setLocationCompany] = useState('')
    const [companySite, setCompanySite] = useState('')
    const [companyTitle, setLinkedIn] = useState('')


    const [isOpen, setIsOpen] = useState(true)


    function handleSubmit(e: any) {
        e.preventDefault();

        if (nameCompany !== '' && companyDescription !== '' && locationCompany !== '' && companySite !== '' && companyTitle !== '') {
            toast.success("Dados salvos com sucesso!")
        } else {
            toast.info("Preencha todos os campos!")
        }
    }

    return (
        // eslint-disable-next-line
        <>
            {isOpen &&
                <div className={styles.containerModal}>
                    <div className={styles.modal}>
                        <header>
                            <h2>Editar</h2>

                            <button onClick={() => setIsOpen(!isOpen)}>
                                <AiFillCloseCircle size={38} color="#0745B7" />
                            </button>
                        </header>

                        <form onSubmit={handleSubmit}>
                            <label>
                                Nome da empresa
                                <input
                                    type="text"
                                    placeholder="Nome da empresa"
                                    value={nameCompany}
                                    onChange={(e) => setNameCompany(e.target.value)}
                                />
                            </label>

                            <label>
                                Site da empresa
                                <input
                                    type="text"
                                    placeholder="Descrição da empresa"
                                    value={companyDescription}
                                    onChange={(e) => setCompanyDescription(e.target.value)}
                                />
                            </label>

                            <label>
                                Localidade da empresa
                                <input
                                    type="text"
                                    placeholder="Localidade da empresa"
                                    value={locationCompany}
                                    onChange={(e) => setLocationCompany(e.target.value)}
                                />
                            </label>

                            <label>
                                Descrição da empresa
                                <textarea
                                    placeholder="1200 caracteres max."
                                    value={companySite}
                                    onChange={(e) => setCompanySite(e.target.value)}
                                    maxLength={1200}
                                />
                            </label>

                            <label>
                                Título da empresa
                                <input
                                    type="text"
                                    placeholder="Título da empresa"
                                    value={companyTitle}
                                    onChange={(e) => setLinkedIn(e.target.value)}
                                />
                            </label>

                            <button type='submit'>Salvar dados</button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}
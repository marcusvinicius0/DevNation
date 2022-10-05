import React, { useState } from 'react';

import { AiFillCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';

import styles from './styles.module.scss';

interface EditInfoCompanyModalProps {
  modalEditInfosCompanyIsOpen: boolean;
  handleCloseModal: () => void;
}

export default function EditInfoCompanyModal({
  modalEditInfosCompanyIsOpen,
  handleCloseModal,
}: EditInfoCompanyModalProps) {
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [companySite, setCompanySite] = useState('');
  const [companyTitle, setCompanyTitle] = useState('');

  const isOpen = modalEditInfosCompanyIsOpen;

  function handleSubmit(e: any) {
    e.preventDefault();

    if (
      companyName !== '' &&
      companyDescription !== '' &&
      companyLocation !== '' &&
      companySite !== '' &&
      companyTitle !== ''
    ) {
      toast.success('Dados salvos com sucesso!');
    } else {
      toast.info('Preencha todos os campos!');
    }
  }

  return (
    // eslint-disable-next-line
    <>
      {isOpen && (
        <div className={styles.containerModal}>
          <div className={styles.modal}>
            <header>
              <h2>Editar informações da empresa</h2>

              <button onClick={handleCloseModal}>
                <AiFillCloseCircle size={38} color="#0745B7" />
              </button>
            </header>

            <form onSubmit={handleSubmit}>
              <label>
                Nome da empresa
                <input
                  type="text"
                  placeholder="Nome da empresa"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </label>

              <label>
                Site da empresa
                <input
                  type="text"
                  placeholder="Site da empresa"
                  value={companySite}
                  onChange={(e) => setCompanySite(e.target.value)}
                />
              </label>

              <label>
                Localidade da empresa
                <input
                  type="text"
                  placeholder="Localidade da empresa"
                  value={companyLocation}
                  onChange={(e) => setCompanyLocation(e.target.value)}
                />
              </label>

              <label>
                Descrição da empresa
                <textarea
                  placeholder="1200 caracteres max."
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  maxLength={1200}
                />
              </label>

              <label>
                Título da empresa
                <input
                  type="text"
                  placeholder="Título da empresa"
                  value={companyTitle}
                  onChange={(e) => setCompanyTitle(e.target.value)}
                />
              </label>

              <button type="submit">Salvar dados</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

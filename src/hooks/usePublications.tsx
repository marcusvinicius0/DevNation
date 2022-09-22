/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable camelcase */
import React, { createContext, useContext, useState } from 'react';

import 'sweetalert2/src/sweetalert2.scss';

import {
  HandleCreatePublicationRequest,
  LikeOrDeslikeRequest,
  PublicationObject,
  PublicationsProviderProps,
  RegisterNewComment,
  ReturnOfLikeOrDeslike,
  UsePublicationsHookData,
} from './types';

import { PublicationInterface } from '../@types/Publication/types';
import apiDsn from '../services/apiDsn';

const PublicationsContext = createContext<UsePublicationsHookData>({} as UsePublicationsHookData);

export default function PublicationsProvider({ children }: PublicationsProviderProps) {
  const [publications, setPublications] = useState<PublicationInterface[] | []>([]);
  const [userPublications, setUserPublications] = useState<PublicationObject[] | []>([]);
  const [loadingPublications, setLoadingPublications] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [publication, setPublication] = useState<PublicationInterface | {}>({});
  const [resLikeOrDeslike, setResLikeOrDeslike] = useState<ReturnOfLikeOrDeslike>({
    type: '',
    likes: [],
  });

  async function loadPublications() {
    setLoadingPublications(true);
    await apiDsn
      .get('/publications')
      .then((res) => {
        setPublications(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoadingPublications(false);
  }

  async function loadUserPublications(userId: string) {
    setLoadingPublications(true);
    await apiDsn.get('/user/publications', { params: { userId } }).then((res) => {
      setUserPublications(res.data);
    });
    setLoadingPublications(false);
  }

  async function handleCreatePublication({
    publication,
    userId,
    imagePublicationUrl,
  }: HandleCreatePublicationRequest) {
    setLoading(true);
    let data = new FormData();

    console.log({ publication, userId, imagePublicationUrl });

    data.append('publication', publication);
    data.append('userId', userId);
    data.append('imagePublicationUrl', imagePublicationUrl);

    await apiDsn.post('/publications', data).then((res) => {
      setPublications([res.data, ...publications]);
    });
    setLoading(false);
  }

  async function handleDeletePublication(publicationId: string) {
    console.log(publicationId);
    // Swal.fire({
    //   title: 'Você tem certeza?',
    //   text: 'A publicação será deletada!',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#399BE5',
    //   cancelButtonColor: 'rgb(253, 33, 33)',
    //   confirmButtonText: 'Sim, deletar!',
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     await apiDsn.delete('/publications', { params: { publicationId } }).then(() => {
    //       toast.success('Publicação deletada com sucesso.');
    //       const filteredPublications = publications.filter((publi) => publi.id !== publicationId);
    //       setPublications(filteredPublications);
    //     });
    //   }
    // });
  }

  async function likeOrDeslikePublication({ userId, publicationId }: LikeOrDeslikeRequest) {
    // await apiDsn
    //   .post('/likes', { userId, publicationId })
    //   .then((res) => {
    //     const arrayPublicationsIds: any[] = [];
    //     publications.forEach(( pub ) => arrayPublicationsIds.push(pub.publication.likes));
    //     const idx = arrayPublicationsIds.indexOf(publicationId);
    //     const dataLike: LikesObject = {
    //       id: res.data.id,
    //       createdAt: res.data.createdAt,
    //       publicationId: res.data.publicationId,
    //       type: res.data.type,
    //       updatedAt: res.data.updatedAt,
    //       userId: res.data.userId,
    //     };
    //     if (res.data.type === 'like') {
    //       const array: PublicationInterface[] = publications;
    //       array[idx].likes?.push(dataLike);
    //       setPublications(array);
    //       setResLikeOrDeslike({ type: 'like', likes: array[idx].likes || [] });
    //     }
    //     const array: PublicationInterface[] = publications;
    //     const index: number =
    //       array[idx].likes?.findIndex(
    //         (item) => item.userId === userId && item.publicationId === publicationId
    //       ) || -1;
    //     array[idx].likes?.splice(index, 1);
    //     setPublications(array);
    //     setResLikeOrDeslike({ type: 'deslike', likes: array[idx].likes || [] });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  async function loadPublicationById(publicationId: string) {
    setLoading(true);
    const res = await apiDsn.get('/publications/details', { params: { publicationId } });
    if (res) {
      setPublication(res.data);
    }
    setLoading(false);
  }

  async function registerNewComment({
    comment,
    publicationId,
    userId,
    userName,
    userRole,
    userAvatarUrl,
    userIsVerified,
  }: RegisterNewComment) {
    setLoading(true);
    const data = {
      comment,
      publicationId,
      userId,
      userName,
      userRole,
      userAvatarUrl,
      userIsVerified,
    };
    await apiDsn
      .post('/comments', data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }

  return (
    <PublicationsContext.Provider
      value={{
        publications,
        loadPublications,
        handleDeletePublication,
        loadingPublications,
        handleCreatePublication,
        loadUserPublications,
        userPublications,
        likeOrDeslikePublication,
        loadPublicationById,
        publication,
        registerNewComment,
        loading,
        resLikeOrDeslike,
      }}
    >
      {children}
    </PublicationsContext.Provider>
  );
}

export function usePublications() {
  const context = useContext(PublicationsContext);
  return context;
}

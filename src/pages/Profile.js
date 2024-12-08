import React from 'react';
import { useFetchData } from '../hooks/UseFetchData';
import { usePostData } from '../hooks/UsePostData';

function Profile() {

  const { data: user, loading, error } = useFetchData('/api/user/profile');

  // If we need to send data later
  const { postData } = usePostData('/api/user/profile');

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  return (
    <div>
      <h1>Profil de l'utilisateur</h1>
      <p><strong>ID Utilisateur :</strong> {user.userId}</p>
      <p><strong>Prénom :</strong> {user.name}</p>
      <p><strong>Nom :</strong> {user.surname}</p>
      <p><strong>Date de naissance :</strong> {user.dob}</p>
      <p><strong>Login :</strong> {user.login}</p>

      <button onClick={() => window.location.href = '/'}>
        Retour à l’accueil
      </button>
    </div>
  );
}

export default Profile;

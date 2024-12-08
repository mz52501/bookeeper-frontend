import React from 'react';
import { useFetchData } from '../hooks/UseFetchData';
import { usePostData } from '../hooks/UsePostData';

function Profile() {

  const { data: user, loading, error } = useFetchData('/api/user/profile');

  // If we need to send data later
  const { postData } = usePostData('/api/user/profile');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error : {error.message}</div>;

  return (
    <div>
      <h1>Your profile</h1>
      <p><strong>User ID :</strong> {user.userId}</p>
      <p><strong>Name :</strong> {user.name}</p>
      <p><strong>Last name :</strong> {user.surname}</p>
      <p><strong>Date of birth :</strong> {user.dob}</p>
      <p><strong>Login :</strong> {user.login}</p>

      <button onClick={() => window.location.href = '/'}>
        Back to dashboard
      </button>
    </div>
  );
}

export default Profile;

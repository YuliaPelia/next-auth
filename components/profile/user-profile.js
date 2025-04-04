import {  getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getSession().then((session) => {
      
      if (!session) {
        router.push('/auth');
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <p className={classes.loading}>Loading...</p>;
  }


  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;

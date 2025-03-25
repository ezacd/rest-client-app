'use client';

import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import styles from './login.module.css';
import { validationSchema } from './validationSchemaLogin';

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitForm = (values: any) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        router.push('/');
      })
      .catch((e) => {
        console.log('Login Error ', e.message);
        alert('Please try Again');
      });
  };

  return (
    <div className={styles.registrationPage}>
      <div className={styles.registrationPageBox}>
        <div className={styles.registrationText}>Log In</div>
        <form
          className={styles.registrationForm}
          onSubmit={handleSubmit(submitForm)}
        >
          <label className={styles.registrationFormLabel}>
            Email
            <input
              className={styles.registrationInput}
              type="email"
              {...register('email', { required: true })}
            />
            <p className={styles.registrationFormError}>
              {errors.email?.message}
            </p>
          </label>
          <label className={styles.registrationFormLabel}>
            Password
            <input
              className={styles.registrationInput}
              type="password"
              {...register('password', { required: true })}
            />
            <p className={styles.registrationFormError}>
              {errors.password?.message}
            </p>
          </label>

          <button
            className={styles.registrationFormSubmit}
            type="submit"
            disabled={!isValid}
          >
            Submit
          </button>
        </form>
        <div className={styles.haveAccountBox}>
          <span className={styles.haveAccountText}>
            Dont have an account?
            <Link href="register">
              <span className={styles.haveAccountTextLink}> Login Here</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

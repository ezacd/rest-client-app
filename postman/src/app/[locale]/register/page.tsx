'use client';
import React from 'react';
import styles from './register.module.css';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validationSchemaRegister';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Register() {
  const t = useTranslations('RegisterPage');

  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitForm = async (values: any) => {
    console.log('Register form values', values);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        reset();
        router.push('/');
      })
      .catch((e) => {
        console.log('catch ', e.message);
        alert('Something went wrong please try again');
      });
  };

  return (
    <div className={styles.registrationPage}>
      <div className={styles.registrationPageBox}>
        <div className={styles.registrationText}>{t('register')}</div>
        <form
          className={styles.registrationForm}
          onSubmit={handleSubmit(submitForm)}
        >
          <label className={styles.registrationFormLabel}>
            {t('email')}
            <input
              className={styles.registrationInput}
              type="email"
              {...register('email', { required: true })}
            />
            <p className={styles.registrationFormError}>
              {errors.email ? t(errors.email?.message) : ''}
            </p>
          </label>
          <label className={styles.registrationFormLabel}>
            {t('password')}
            <input
              className={styles.registrationInput}
              type="password"
              {...register('password', { required: true })}
            />
            <p className={styles.registrationFormError}>
              {errors.password ? t(errors.password?.message) : ''}
            </p>
          </label>
          <label className={styles.registrationFormLabel}>
            {t('confPassword')}
            <input
              className={styles.registrationInput}
              type="password"
              {...register('confiumPassword', { required: true })}
            />
            <p className={styles.registrationFormError}>
              {errors.confiumPassword ? t(errors.confiumPassword?.message) : ''}
            </p>
          </label>
          <button
            className={styles.registrationFormSubmit}
            type="submit"
            disabled={!isValid}
          >
            {t('submit')}
          </button>
        </form>
        <div className={styles.haveAccountBox}>
          <span className={styles.haveAccountText}>
            {t('already_have_an_account')}
            <Link href="login">
              <span className={styles.haveAccountTextLink}>
                {t('login_here')}
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

import React, { Fragment } from 'react';
import { useTypeSelector } from '../../redux/helper/selector.helper';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { AuthActions } from '../../redux/auth/action';
import { Formik, Form } from 'formik';
import FormikField from '../../components/formik/FormikField';
import FormikError from '../../components/formik/FormikError';

import './LoginPage.css';

const LoginPage = () => {
  const { loading } = useTypeSelector(s => s.authState);
  const dispatch = useDispatch();
  const history = useHistory();

  const validationSchema = getValidationSchema();

  const handleSubmitForm = (values: FormModel) => {
    console.log(values);

    if (loading) return;
    dispatch(AuthActions.login(history, values.username, values.password));
  };

  const gotoRegisterPage = () => {
    history.push('/register');
  };

  return (
    <Fragment>
      <h2>Login</h2>
      <Formik
        initialValues={formInitialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {f => {
          return (
            <Form>
              <label>Email</label>
              <FormikField type="email" name="username" />
              <FormikError name="username" />
              <label>Password</label>
              <FormikField type="password" name="password" />
              <FormikError name="password" />
              <div>
                {loading ? (
                  <div>loading...</div>
                ) : (
                  <button type="submit">Login</button>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
      <button onClick={gotoRegisterPage}>Register</button>
    </Fragment>
  );
};

export default LoginPage;

const getValidationSchema = () => {
  const schema = Yup.object().shape({
    username: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return schema;
};

type FormModel = { username: string; password: string };
const formInitialValue: FormModel = {
  username: 'serdar@quatmer.com',
  password: '123456',
};

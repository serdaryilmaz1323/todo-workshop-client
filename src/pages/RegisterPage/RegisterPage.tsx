import React, { Fragment } from 'react';
import { useTypeSelector } from '../../redux/helper/selector.helper';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { AuthActions } from '../../redux/auth/action';
import { Formik, Form } from 'formik';
import FormikField from '../../components/formik/FormikField';
import FormikError from '../../components/formik/FormikError';

import './RegisterPage.css';

const RegisterPage = () => {
  const { loading } = useTypeSelector(s => s.authState);
  const dispatch = useDispatch();
  const history = useHistory();

  const validationSchema = getValidationSchema();

  const handleSubmitForm = (values: FormModel) => {
    console.log(values);

    if (loading) return;
    dispatch(
      AuthActions.register(
        history,
        values.username,
        values.password,
        values.firstName,
        values.lastName,
      ),
    );
  };

  const gotoLoginPage = () => {
    history.push('/login');
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
              <label>First Name</label>
              <FormikField name="firstName" />
              <FormikError name="firstName" />

              <label>Last Name</label>
              <FormikField name="lastName" />
              <FormikError name="lastName" />

              <label>Email</label>
              <FormikField type="email" name="username" />
              <FormikError name="username" />

              <label>Password</label>
              <FormikField type="password" name="password" />
              <FormikError name="password" />

              <label>Password Confirmation</label>
              <FormikField type="password" name="passwordConfirmation" />
              <FormikError name="passwordConfirmation" />

              <div>
                {loading ? (
                  <div>loading...</div>
                ) : (
                  <button type="submit">Create User</button>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
      <button onClick={gotoLoginPage}>Login</button>
    </Fragment>
  );
};

export default RegisterPage;

const getValidationSchema = () => {
  const schema = Yup.object().shape({
    username: Yup.string()
      .email('Invalid email address. Username must be email')
      .required('Username is required'),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match',
    ),
    firstName: Yup.string(),
    lastName: Yup.string(),
  });

  return schema;
};

type FormModel = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  passwordConfirmation: string;
};

const formInitialValue: FormModel = {
  firstName: 'Serdar',
  lastName: 'YILMAZ',
  username: 'serdar@quatmer.com',
  password: '123456',
  passwordConfirmation: '123456',
};

import React, { FC } from 'react';
import { useFormikContext } from 'formik';

const FormikError: FC<{ name: string }> = props => {
  const { errors, touched } = useFormikContext<any>();

  return errors[props.name] && touched[props.name] ? (
    <label className="error">{errors[props.name]}</label>
  ) : null;
};

export default FormikError;

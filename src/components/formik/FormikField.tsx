import React, { useCallback, FC } from 'react';
import { useFormikContext, Field } from 'formik';

type Prop = { name: string; type?: TextFieldTypes };
const FormikField: FC<Prop> = props => {
  const { setFieldTouched, setFieldValue, values } = useFormikContext<any>();

  // use custom handlers to use ionic's events
  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      if (!input) {
        return;
      }
      setFieldTouched(props.name, true);
    },
    [setFieldTouched, props.name],
  );

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      //console.log(e);
      const input = e.currentTarget as any;
      if (!input) {
        return;
      }

      //console.log('inp:' + input);
      //console.log('inp:' + input.value);

      // const input = await ionInput.getInputElement();
      setFieldValue(props.name, input.value);
    },
    [setFieldValue, props.name],
  );

  return (
    <Field name={props.name}>
      {() => (
        <input
          value={values[props.name]}
          type={props.type}
          name={props.name}
          onBlur={onBlur}
          onChange={onChange}
        />
      )}
    </Field>
  );
};

export default FormikField;

export type TextFieldTypes =
  | 'date'
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url'
  | 'time';

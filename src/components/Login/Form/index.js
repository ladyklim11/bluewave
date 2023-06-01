
// Libraries
import React from 'react';
import {useForm} from 'react-hook-form';

// Styles
import styles from '../style.module.scss';


const getErrorMessage = (fieldName, rulValue) => {
  return {
    required: `Поле обязательно для заполнения!`,
    minLength: `Минимальная длина должна быть не менее ${rulValue} символов!`,
    maxLength: `Максимальная длина должна быть не менее ${rulValue} символов!`,
  }
}

const Form = ({ fields, submitText, onSubmit, backendErrors = [] }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const transformBackendErrors = React.useMemo(() =>
    backendErrors.reduce((reducer, error) => ({ ...reducer, [error.type]: { message: error.text } }), {})
  , [backendErrors]);

  const allErrors = React.useMemo(() => Object.keys(errors).length ? errors : transformBackendErrors, [errors, transformBackendErrors]);

  return (
    <>
      <div className={styles.Form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map(field => (
            <div className={styles.Form__Item} key={field.id}>
              <div className={styles.Form__Title}>
                {field.title}
              </div>
              <input
                placeholder={field.placeholder}
                type={field?.type}
                className={!!allErrors[field.id] && 'error'}
                {...register(field.id, { ...field?.rules })}
              />
              {!!allErrors[field.id] && (
                <div className='errorMessage'>
                  {allErrors[field.id].hasOwnProperty('type')
                    ? getErrorMessage(field.title, field.rules[allErrors[field.id].type])[allErrors[field.id].type]
                    : allErrors[field.id].message
                  }
                </div>
              )}
              {field.subtext && (
                <span
                  className={`${styles.Form__SubTitle} ${styles.Action}`}
                  onClick={field.subAction}
                >
                {field.subtext}
              </span>
              )}
            </div>
          ))}
          <input type='submit' value={submitText} className='submit' />
        </form>
      </div>
    </>
  )
};

export default Form;
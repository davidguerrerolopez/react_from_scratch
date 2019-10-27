import React from 'react';
import useForm from '../../CustomHook/useForm';
import validate from './validate';
export const Form = ({ onSubmit }) => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(onSubmit, validate);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>
            VIN:
          <input className={`${errors.vin && 'hasError'}`} value={values.vin || ''} name="vin" type="text" onChange={handleChange} />
            <p>{errors.vin}</p>
          </label>
        </div>
        <div className="field">
          <label>
            YEAR:
          <input className={`${errors.year && 'hasError'}`} value={values.year || ''} name="year" type="text" onChange={handleChange} />
            <p>{errors.year}</p>
          </label>
        </div>
        <button>submit</button>
      </form>
    </div>

  );
}
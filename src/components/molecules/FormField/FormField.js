import React from 'react';
import PropTypes from 'prop-types';
import './FormField.scss';

const FormField = ({
  id,
  name,
  // eslint-disable-next-line react/prop-types
  value,
  handleInputChange,
  type = 'text',
  min = '',
  max = '',
  isRequired = true,
}) => {
  return (
    <div className="form-field">
      <label htmlFor={name}>{name}</label>
      <input
        id={id}
        name={name}
        value={value}
        type={type}
        onChange={handleInputChange}
        min={min}
        max={max}
        required={isRequired}
      />
    </div>
  );
};

FormField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  handleInputChange: PropTypes.func,
  min: PropTypes.string,
  max: PropTypes.string,
  type: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default FormField;

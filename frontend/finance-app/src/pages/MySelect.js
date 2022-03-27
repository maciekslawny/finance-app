import PropTypes from "prop-types";
import React from "react";
const MySelect = (props) => {
  const { label, name, value, className, onChange, options } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        className={className}
        onChange={onChange}
      >
        <option>{label}</option>
        {options != null &&
          options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
};
MySelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
};

export default MySelect;

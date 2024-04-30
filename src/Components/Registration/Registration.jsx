// RegistrationForm.js
import  { useState } from 'react';
import './Registration.css';

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = e => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange
  };
};

const useValidation = (value, validations) => {
  const [errors, setErrors] = useState([]);

  const validate = () => {
    const newErrors = [];
    if (validations.required && !value.trim()) {
      newErrors.push('This field is required');
    }
    if (validations.minLength && value.length < validations.minLength) {
      newErrors.push(`Must be at least ${validations.minLength} characters long`);
    }
    if (validations.pattern && !validations.pattern.test(value)) {
      newErrors.push('Invalid format');
    }
    setErrors(newErrors);
  };

  return {
    errors,
    validate
  };
};

const Registration = () => {
  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const email = useFormInput('');
  const contact = useFormInput('');
  const password = useFormInput('');
  const confirmPassword = useFormInput('');

  const firstNameValidation = useValidation(firstName.value, { required: true });
  const lastNameValidation = useValidation(lastName.value, { required: true });
  const emailValidation = useValidation(email.value, {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  });
  const contactValidation = useValidation(contact.value, { required: true });
  const passwordValidation = useValidation(password.value, { required: true, minLength: 6 });
  const confirmPasswordValidation = useValidation(confirmPassword.value, {
    required: true,
    minLength: 6
  });

  const handleSubmit = e => {
    e.preventDefault();
    firstNameValidation.validate();
    lastNameValidation.validate();
    emailValidation.validate();
    contactValidation.validate();
    passwordValidation.validate();
    confirmPasswordValidation.validate();

    if (
      firstNameValidation.errors.length === 0 &&
      lastNameValidation.errors.length === 0 &&
      emailValidation.errors.length === 0 &&
      contactValidation.errors.length === 0 &&
      passwordValidation.errors.length === 0 &&
      confirmPasswordValidation.errors.length === 0
    ) {
      const formData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        contact: contact.value,
        password: password.value,
        confirmPassword: confirmPassword.value
      };
      console.log(formData);
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="text" placeholder="First Name" {...firstName} />
        {firstNameValidation.errors.map((error, index) => (
          <span key={index} className="error">
            {error}
          </span>
        ))}
      </div>
      <div className="form-group">
        <input type="text" placeholder="Last Name" {...lastName} />
        {lastNameValidation.errors.map((error, index) => (
          <span key={index} className="error">
            {error}
          </span>
        ))}
      </div>
      <div className="form-group">
        <input type="email" placeholder="Email" {...email} />
        {emailValidation.errors.map((error, index) => (
          <span key={index} className="error">
            {error}
          </span>
        ))}
      </div>
      <div className="form-group">
        <input type="text" placeholder="Contact" {...contact} />
        {contactValidation.errors.map((error, index) => (
          <span key={index} className="error">
            {error}
          </span>
        ))}
      </div>
      <div className="form-group">
        <input type="password" placeholder="Password" {...password} />
        {passwordValidation.errors.map((error, index) => (
          <span key={index} className="error">
            {error}
          </span>
        ))}
      </div>
      <div className="form-group">
        <input type="password" placeholder="Confirm Password" {...confirmPassword} />
        {confirmPasswordValidation.errors.map((error, index) => (
          <span key={index} className="error">
            {error}
          </span>
        ))}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Registration;

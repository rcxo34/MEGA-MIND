import { useState } from 'react';
import '../../styles/front/styles.css'

const Signup = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    try {
      const response = await fetch('http://localhost:8080/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('User registration not successful');
      }

      // Optionally handle success response
      alert('Form data sent successfully');
      console.log('Form data sent successfully');
      
      // Clear form fields after successful submission
      setFormData({
        name: '',
        email: '',
        dob: '',
        password: ''
      });
    } catch (error) {
      console.error('Error sending data:', error);
      // Handle error state or display error message
    }
  };


  return (
    <div className='signup-container'>
      <form onSubmit={handleSubmit} className='signup_form'>
        <h2>Welcome to Mega Mind ! </h2>
        <h2 className='subheading'>Acquire the Power of knowledge.</h2><br/>
        <h2 className='register'>Sign Up Now !</h2><br/>
        <div className='boxer'>
          <fieldset>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
          </fieldset>
          <br />
          <fieldset>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
          </fieldset>
          <br />
          <fieldset>
            <label>
              Date of Birth:
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </label>
          </fieldset>
          <br />
          <fieldset>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
          </fieldset>
        <br />
        <button type="submit" className='submit_btn'>Submit</button>
        </div>
      </form>
      <div className='wallpaper_img'>

      </div>
    </div>
  );
};

export default Signup
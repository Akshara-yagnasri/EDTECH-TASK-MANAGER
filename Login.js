import React, { useState, useContext } from 'react';
import { loginUser } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      const { token, user } = res.data;
      login(user, token);
      window.location.href = '/dashboard';
    } catch (err) {
      alert(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="page">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <div className="form-group">
            <input type="email" placeholder="Email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
        <div className="link">
          <p>Don't have an account? <a href="/signup">Signup</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

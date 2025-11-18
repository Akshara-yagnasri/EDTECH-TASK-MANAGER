import React, { useState } from 'react';
import { signup } from '../api/authApi';

const Signup = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'student', teacherId: '' });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      alert('Signup success. Please login.');
      window.location.href = '/';
    } catch (err) {
      alert(err?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} /><br />
        <input placeholder="Password" type="password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} /><br />

        <label>Role</label><br />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select><br />

        {form.role === 'student' && (
          <input placeholder="Teacher ID" value={form.teacherId}
            onChange={(e) => setForm({ ...form, teacherId: e.target.value })} />
        )}

        <br />
        <button type="submit">Signup</button>
      </form>
      <p>Already registered? <a href="/">Login</a></p>
    </div>
  );
};

export default Signup;

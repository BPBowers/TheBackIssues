'use client';

import { useState, useEffect } from 'react';

export default function AddSeries() {
  const [publishers, setPublishers] = useState([]);
  const [title, setTitle] = useState('');
  const [publisherId, setPublisherId] = useState('');

  useEffect(() => {
    fetch('/api/publishers')
      .then(res => res.json())
      .then(data => setPublishers(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/series/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, publisherId }),
    });
    setTitle('');
    setPublisherId('');
    alert('Series created successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Series</h2>
      <select value={publisherId} onChange={e => setPublisherId(e.target.value)} required>
        <option value="">Select Publisher</option>
        {publishers.map((p: any) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Series Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <button type="submit">Add Series</button>
    </form>
  );
}
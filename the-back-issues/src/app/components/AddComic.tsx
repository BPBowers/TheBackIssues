'use client'
import { useState, useEffect } from 'react'

export default function AddComic() {
    const [frontCover, setFrontCover] = useState<string | null>(null)
    const [backCover, setBackCover] = useState<string | null>(null)
    const [issue, setIssue] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [coverPrice, setCoverPrice] = useState('')
    const [seriesId, setSeriesId] = useState('')
    const [seriesList, setSeriesList] = useState([])

    useEffect(() => {
        fetch('/api/series')
        .then(res =>res.json())
        .then(data => setSeriesList(data))
    }, [])

    const handleImageUpload = (file: File, setFunc: (value: string) => void) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result?.toString().split(',')[1] || ''
      setFunc(base64String)
    }
    reader.readAsDataURL(file)
  }

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/comic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issue,
        coverPrice,
        releaseDate,
        frontCover,
        backCover,
        seriesId,
      }),
    });
    alert('Comic created successfully!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>Upload New Comic</h2>
      <select value={seriesId} onChange={e => setSeriesId(e.target.value)} required>
        <option value="">Select Series</option>
        {seriesList.map((s: any) => (
          <option key={s.id} value={s.id}>
            {s.title} ({s.Publisher?.name})
          </option>
        ))}
      </select>

      <input type="number" placeholder="Issue #" value={issue} onChange={(e) => setIssue(e.target.value)} required/>
      <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required/>
      <label>Front Cover:</label>
      <input type="file" accept="image/*" onChange={(e) => {
        if (e.target.files?.[0]) handleImageUpload(e.target.files[0], setFrontCover)
      }} />
      
      <label>Back Cover:</label>
      <input type="file" accept="image/*" onChange={(e) => {
        if (e.target.files?.[0]) handleImageUpload(e.target.files[0], setBackCover)
      }} />
      <button type="submit">Add Comic</button>
    </form>
  )
}
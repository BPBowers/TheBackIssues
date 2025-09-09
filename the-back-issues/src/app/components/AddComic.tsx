'use client'
import { useState, useEffect } from 'react'
import ComicCard from './ComicCard'
import type { ComicBook, ArtistRole } from '../types/comic'

export default function AddComic() {
    const [frontCover, setFrontCover] = useState<string | null>(null)
    const [backCover, setBackCover] = useState<string | null>(null)
    const [issue, setIssue] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [coverPrice, setCoverPrice] = useState('')
    const [seriesId, setSeriesId] = useState('')
    const [seriesList, setSeriesList] = useState([])

    const [artistQuery, setArtistQuery] = useState('')
    const [artistResults, setArtistResults] = useState<any[]>([])
    const [selectedArtists, setSelectedArtists] = useState<{artistId: number; name: string; role: string}[]>([])

    useEffect(() => {
        fetch('/api/series')
        .then(res =>res.json())
        .then(data => setSeriesList(data))
    }, [])

    useEffect(() => {
        if(artistQuery.length > 1) {
          fetch(`/api/artists/search?q=${artistQuery}`)
            .then(res => res.json())
            .then(setArtistResults)
        } else {
          setArtistResults([])
        }
    }, [artistQuery])

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
        artists: selectedArtists,
      }),
    });
    alert('Comic created successfully!');
  };

  const previewComic: ComicBook = {
    id: -1, // fake id
    issue: issue ? parseInt(issue) : null,
    frontCover,
    backCover,
    coverPrice: coverPrice ? parseFloat(coverPrice) : null,
    releaseDate: releaseDate || null,
    seriesTitle:
      seriesList.find(s => String(s.id) === seriesId)?.title || 'New Series',
    Publisher: seriesList.find(s => String(s.id) === seriesId)?.Publisher,
    publisherName:
      seriesList.find(s => String(s.id) === seriesId)?.Publisher?.name ||
      'Unknown',
    Series: seriesList.find(s => String(s.id) === seriesId),
    artists: selectedArtists.map(a => ({
      role: a.role,
      artist: {
        id: a.artistId,
        firstName: a.name.split(' ')[0],
        lastName: a.name.split(' ')[1] || '',
      },
    })),
  }

  return (
    <div className="flex flex-col gap-6">
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>Upload New Comic</h2>
      <select value={seriesId} onChange={e => setSeriesId(e.target.value)} required>
        <option value="">Select Series</option>
        {seriesList.map((s: any) => (
          <option className="text-black" key={s.id} value={s.id}>
            {s.title} ({s.Publisher?.name})
          </option>
        ))}
      </select>

      <input type="number" placeholder="Issue #" value={issue} onChange={(e) => setIssue(e.target.value)} required/>
      <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required/>
      <input type="number" placeholder="Cover Price $" value={coverPrice} onChange={(e) => setCoverPrice(e.target.value)}/>
      <label>Front Cover:</label>
      <input type="file" accept="image/*" onChange={(e) => {
        if (e.target.files?.[0]) handleImageUpload(e.target.files[0], setFrontCover)
      }} />
      
      <label>Back Cover:</label>
      <input type="file" accept="image/*" onChange={(e) => {
        if (e.target.files?.[0]) handleImageUpload(e.target.files[0], setBackCover)
      }} />
      <div>
      <label>Artists</label>
      <input type="text" className="p-1" placeholder="search artist..." value={artistQuery} onChange={e=> setArtistQuery(e.target.value)}/>
      {artistResults.length > 0 && (
        <ul style={{border:'1px solid #ccc', padding: '0.5rem'}}>
          {artistResults.map(a=> (
            <li key={a.id}>
              {a.firstName} {a.lastName}
              <select defaultValue="" onChange={(e) => {
              const role = e.target.value 
              setSelectedArtists(prev => [...prev, {artistId: a.id, name: `${a.firstName} ${a.lastName}`, role}])
              setArtistQuery('')
              setArtistResults([])
              }}>
                  <option className="text-black" value="" disabled>Select Role</option>
                  <option className="text-black" value="WRITER">Writer</option>
                  <option className="text-black" value="PENCILLER">Penciller</option>
                  <option className="text-black" value="INKER">Inker</option>
                  <option className="text-black" value="COLORIST">Colorist</option>
                  <option className="text-black" value="LETTERER">Letterer</option>
                  <option className="text-black" value="COVER_ARTIST">Cover Artist</option>
                  <option className="text-black" value="EDITOR">Editor</option>
              </select>
            </li>
          ))}  
        </ul>
      )}

      <ul>
        {selectedArtists.map((a, idx) => (
          <li key={idx}>
            {a.name} - {a.role}
            <button type="button" className="p-1" onClick={() => setSelectedArtists(selectedArtists.filter((_, i) => i !==idx))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      </div>

      <button type="submit">Add Comic</button>
    </form>
        <div>
          <h3 className="text-lg font-bold mb-2">Preview</h3>
          <ComicCard comic={previewComic}/>
        </div>
    </div>
  )
}
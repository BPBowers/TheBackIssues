'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ComicCard from './ComicCard'
import type { ComicBook } from '../types/comic'

export default function EditComic() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const comicId = searchParams.get("id") // e.g. /admin/edit-comic?id=123

  const [loading, setLoading] = useState(true)
  const [comic, setComic] = useState<ComicBook | null>(null)

  const [seriesList, setSeriesList] = useState<any[]>([])
  const [artistQuery, setArtistQuery] = useState('')
  const [artistResults, setArtistResults] = useState<any[]>([])
  const [selectedArtists, setSelectedArtists] = useState<{artistId: number; name: string; role: string}[]>([])

  // Fetch existing comic + series list
  useEffect(() => {
    if (!comicId) return
    const fetchData = async () => {
      const [comicRes, seriesRes] = await Promise.all([
        fetch(`/api/comic/${comicId}`).then(r => r.json()),
        fetch('/api/series').then(r => r.json())
      ])
      setComic(comicRes)
      setSelectedArtists(
        (comicRes.artists ?? []).map((a: any) => ({
            artistId: a.artist.id,
            name: `${a.artist.firstName} ${a.artist.lastName}`,
            role: a.role
        }))
    )
      setSeriesList(seriesRes)
      setLoading(false)
    }
    fetchData()
  }, [comicId])

  useEffect(() => {
    if (artistQuery.length > 1) {
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
    e.preventDefault()
    if (!comic) return

    await fetch(`/api/comic/${comic.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...comic, artists: selectedArtists }),
    })
    alert('Comic updated!')
    router.push('/admin') // redirect to admin page or list
  }

  const handleDelete = async () => {
    if (!comic) return
    if (!confirm('Are you sure you want to delete this comic?')) return

    await fetch(`/api/comic/${comic.id}`, { method: 'DELETE' })
    alert('Comic deleted!')
    router.push('/admin')
  }

  if (loading || !comic) return <p>Loading...</p>

  const previewComic: ComicBook = {
    ...comic,
    artists: selectedArtists.map(a => ({
      role: a.role,
      artist: {
        id: a.artistId,
        firstName: a.name.split(' ')[0],
        lastName: a.name.split(' ')[1] || '',
      }
    }))
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2>Edit Comic</h2>

        <select
            value={comic.Series?.id ?? ''}
            onChange={e => setComic({
                ...comic,
                Series: seriesList.find(s => String(s.id) === e.target.value) || null
            })}
            required
        >
            <option value="">Select Series</option>
                {seriesList.map((s: any) => (
                    <option key={s.id} value={s.id}>
                    {s.title} ({s.Publisher?.name})
            </option>
            ))}
        </select>

        <input type="number" placeholder="Issue #" value={comic.issue ?? ''} 
          onChange={e => setComic({...comic, issue: parseInt(e.target.value)})} required/>
        <input type="date" value={comic.releaseDate ? comic.releaseDate.split('T')[0] : ''}
            onChange={e => setComic({...comic, releaseDate: e.target.value})} required/>
        <input type="number" placeholder="Cover Price $" value={comic.coverPrice ?? ''} 
          onChange={e => setComic({...comic, coverPrice: parseFloat(e.target.value)})}/>

        <label>Front Cover:</label>
        {comic.frontCover && (
            <img src={`data:image/jpeg;base64,${comic.frontCover}`} alt="Front Cover" className="w-32 mb-2" />
        )}
        <input type="file" accept="image/*" onChange={e => {
            if (e.target.files?.[0]) handleImageUpload(e.target.files[0], val => setComic({...comic, frontCover: val}))
        }} />

        <label>Back Cover:</label>
        {comic.backCover && (
            <img src={`data:image/jpeg;base64,${comic.backCover}`} alt="Back Cover" className="w-32 mb-2" />
        )}
        <input type="file" accept="image/*" onChange={e => {
            if (e.target.files?.[0]) handleImageUpload(e.target.files[0], val => setComic({...comic, backCover: val}))
        }} />

        <div>
          <label>Artists</label>
          <input type="text" className="p-1" placeholder="search artist..." value={artistQuery} onChange={e=> setArtistQuery(e.target.value)}/>
          {artistResults.length > 0 && (
            <ul style={{border:'1px solid #ccc', padding: '0.5rem'}}>
              {artistResults.map(a=> (
                <li key={a.id}>
                  {a.firstName} {a.lastName}
                  <select defaultValue="" onChange={e => {
                    const role = e.target.value
                    setSelectedArtists(prev => [...prev, {artistId: a.id, name: `${a.firstName} ${a.lastName}`, role}])
                    setArtistQuery('')
                    setArtistResults([])
                  }}>
                    <option value="" disabled>Select Role</option>
                    <option value="WRITER">Writer</option>
                    <option value="PENCILLER">Penciller</option>
                    <option value="INKER">Inker</option>
                    <option value="COLORIST">Colorist</option>
                    <option value="LETTERER">Letterer</option>
                    <option value="COVER_ARTIST">Cover Artist</option>
                    <option value="EDITOR">Editor</option>
                  </select>
                </li>
              ))}
            </ul>
          )}

          <ul>
            {selectedArtists.map((a, idx) => (
              <li key={idx}>
                {a.name} - {a.role}
                <button type="button" onClick={() => setSelectedArtists(selectedArtists.filter((_, i) => i !== idx))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Save Changes</button>
        <button type="button" onClick={handleDelete} className="bg-red-500 text-white">Delete Comic</button>
      </form>

      <div>
        <h3 className="text-lg font-bold mb-2">Preview</h3>
        <ComicCard comic={previewComic} />
      </div>
    </div>
  )
}

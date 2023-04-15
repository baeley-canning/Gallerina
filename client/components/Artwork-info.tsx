import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { fetchArtwork } from '../actions/artwork-info'
import { ArtworkApi } from '../../models/external-Artwork'
import { ArtworkDatabase } from '../../models/artwork'
import LoadingSpinner from './LoadingSpinner'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function ArtworkInfo() {
  const { loading, data, error } = useAppSelector((state) => state.artInfoState)
  const params = useParams()
  const artId = params.id

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (artId) {
      dispatch(fetchArtwork(artId))
    }
  }, [dispatch, artId])

  if (!data) {
    return <LoadingSpinner />
  }

  if ('imageLink' in data && 'artistLink' in data) {
    const art = data as ArtworkDatabase
    return (
      <>
        <div className="flex flex-col">
          {loading && <LoadingSpinner />}
          {error && <p>An error occurred</p>}
          <div className="flex justify-between">
            <h2 className="w-1/2 text-2xl font-extrabold">{art.title}</h2>
            <button className="mt-1 w-1/4 rounded-2xl p-3 outline hover:bg-my-gold hover:text-white">
              Add to a Collection
            </button>
          </div>
          <img
            src={art.imageLink}
            alt={art.title}
            className="max-h-lg max-w-lg"
          />
          <p>Medium: {art.medium}</p>
          <p>Date: {art.date}</p>
        </div>
      </>
    )
  }

  if (('slug' && 'dimensions') in data) {
    const art = data as ArtworkApi
    return (
      <>
        <div>
          {loading && <LoadingSpinner />}
          {error && <p>An error occurred</p>}
          <div className="flex justify-between">
            <h2 className="w-1/2 text-2xl font-extrabold">{art.title}</h2>
            <button className="mt-1 w-1/4 rounded-2xl p-3 outline hover:bg-my-gold hover:text-white">
              Add to a Collection
            </button>
          </div>
          <img
            className="max-h-lg max-w-lg"
            src={art._links.image.href.replace('{image_version}', 'large')}
            alt={art.slug}
          />
          <ul>
            <li>Date: {art.date}</li>
            <li>Medium: {art.medium}</li>
            <li>
              Height: {art.dimensions.cm.height}cm, Width:{' '}
              {art.dimensions.cm.width}cm
            </li>
          </ul>
          <p>{art.blurb}</p>
        </div>
      </>
    )
  }
  return <h3>Artwork Info Page</h3>
}

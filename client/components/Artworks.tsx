import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { fetchArtworkImage } from '../actions/artworks'
import { ArtworkApi } from '../../models/external-Artwork'

export default function Home() {
  const { loading, data, error } = useAppSelector((state) => state.artworkState)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchArtworkImage())
  }, [dispatch])

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <img src="/loading-spinner.gif" alt="loading-spinner" />}

      {data?.map((artwork: ArtworkApi) => {
        return (
          <div key={artwork.id}>
            <div>
              <img src={artwork._links?.thumbnail?.href} alt={artwork.slug} />
              <div>{artwork.title}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
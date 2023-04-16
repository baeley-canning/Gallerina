import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { fetchArtworkImage } from '../actions/homepage'
import { ArtworkApi } from '../../models/external-Artwork'
import LoadingSpinner from './LoadingSpinner'
import Dropdown from './Dropdown'
import { Link } from 'react-router-dom'

export default function Home() {
  const { loading, data, error } = useAppSelector((state) => state.artworkState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchArtworkImage())
  }, [dispatch])

 
  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <LoadingSpinner />}
      <div className="columns-4 gap-x-12 space-y-12 2xl:columns-5">
        {data?.map((artwork: ArtworkApi) => {
          return (
            <div key={artwork.id} className="">
              <div className="relative break-inside-avoid-column ">
                {/* transition duration-1000 transform hover:scale-110 z-10 hover:z-20 */}
                <img
                  className="h-auto w-full rounded-md"
                  src={artwork._links?.thumbnail?.href}
                  alt={artwork.slug}
                />
                <div className="text-center font-garamond text-sm font-bold text-black">
                  <Dropdown />
                  <Link to={`/artworks/${artwork.id}`}>{artwork.title}</Link>
                </div>
               
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

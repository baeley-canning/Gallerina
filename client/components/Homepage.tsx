import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { fetchArtworkImage } from '../actions/homepage'
import { ArtworkApi } from '../../models/external-Artwork'
import LoadingSpinner from './LoadingSpinner'
import Dropdown from './Dropdown'
import { Link } from 'react-router-dom'
import { TCollection } from '../../models/profile'
import { useAuth0 } from '@auth0/auth0-react'
import { getAllCollectionsApi } from '../apis/homepage'

export default function Home() {
  const { loading, data, error } = useAppSelector((state) => state.artworkState)
  const [collections, setCollections] = useState<TCollection[]>([])
  const { user } = useAuth0()
  const { getAccessTokenSilently } = useAuth0()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchArtworkImage())
  }, [dispatch])

  useEffect(() => {
    const getAccess = async () => {
      const token = await getAccessTokenSilently()
      console.log(token)
      if (user) {
        getAllCollectionsApi(token) // pass in token
          .then((collections: TCollection[]) => {
            setCollections(collections)
          })
          .catch((error: Error) => {
            console.log(error)
          })
      }
    }
    getAccess().catch(console.error)
  }, [user, getAccessTokenSilently])

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <LoadingSpinner />}
      <div className="columns-4 gap-x-12 space-y-12 2xl:columns-5">
        {data?.map((artwork: ArtworkApi) => {
          return (
            <div key={artwork.id} className="">
              <div className="relative break-inside-avoid-column">
                {/* transition duration-1000 transform hover:scale-110 z-10 hover:z-20 */}
                <img
                  className="h-auto w-full rounded-md opacity-100 hover:opacity-80"
                  src={artwork._links?.thumbnail?.href}
                  alt={artwork.slug}
                />
                <div className="text-center font-garamond text-sm font-bold text-black">
                  <Dropdown artwork={artwork} collections={collections} />
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

/* eslint-disable react-hooks/exhaustive-deps */
import GoogleMapReact from 'google-map-react'
import { FC, useRef, useState } from 'react'
import Game from '@backend/models/game'
import { Marker } from '@components/Marker'
import { LocationType } from '@types'
import countryBounds from '@utils/constants/countryBoundsOld.json'
import { getMapTheme } from '@utils/helperFunctions'
import { StyledStreaksSummaryMap } from './'

type Props = {
  gameData: Game
}

const StreaksSummaryMap: FC<Props> = ({ gameData }) => {
  const [actualMarkers, setActualMarkers] = useState<LocationType[]>([])

  const resultMapRef = useRef<google.maps.Map | null>(null)

  const loadMapMarkers = () => {
    setActualMarkers(gameData.rounds)
  }

  const loadCountryGeojson = (map: google.maps.Map) => {
    const countryGeoJsons = countryBounds as any
    const actualLocations = gameData.rounds

    actualLocations.map((actualLocation) => {
      const geojson = countryGeoJsons.features.find(
        (country: any) => country?.properties?.code?.toLowerCase() === actualLocation.countryCode?.toLowerCase()
      )

      map.data.addGeoJson(geojson)
    })

    map.data.setStyle((feature: google.maps.Data.Feature) => {
      const code = feature.getProperty('code')
      const mostRecentRoundCode = gameData.rounds[gameData.rounds.length - 1].countryCode
      const isMostRecentRound = code?.toLowerCase() === mostRecentRoundCode?.toLowerCase()

      const color = isMostRecentRound ? '#a63152' : '#39a857'

      return {
        fillColor: color,
        strokeColor: color,
        strokeOpacity: 0.5,
        fillOpacity: 0.5,
        cursor: 'crosshair',
      }
    })

    getMapBounds(map)
  }

  const getMapBounds = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds()

    map.data.forEach((feature) => {
      const geometry = feature.getGeometry()

      if (geometry) {
        geometry.forEachLatLng(function (latlng) {
          bounds.extend(latlng)
        })
      }
    })

    map.fitBounds(bounds)
    map.setCenter(bounds.getCenter())
  }

  return (
    <StyledStreaksSummaryMap>
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string }}
          center={{ lat: 0, lng: 0 }}
          zoom={2}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            loadMapMarkers()
            loadCountryGeojson(map)
            resultMapRef.current = map
          }}
          options={{
            styles: getMapTheme('Light'),
            clickableIcons: false,
            minZoom: 2,
            disableDefaultUI: true,
            gestureHandling: 'greedy',
          }}
        >
          {actualMarkers.map((marker, idx) => (
            <Marker
              key={idx}
              type="actual"
              lat={marker.lat}
              lng={marker.lng}
              roundNumber={idx + 1}
              isFinalResults={false}
            />
          ))}
        </GoogleMapReact>
      </div>
    </StyledStreaksSummaryMap>
  )
}
export default StreaksSummaryMap

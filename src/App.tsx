import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { SectionTitle } from '@/components/SectionTitle';
import { TripMap } from '@/components/TripMap';
import { ElevationProfile } from '@/components/ElevationProfile';
import { PrecipitationChart } from '@/components/PrecipitationChart';
import { WeatherDays } from '@/components/WeatherDays';
import { Stays } from '@/components/Stays';
import { Highlights } from '@/components/Highlights';
import { PracticalInfo } from '@/components/PracticalInfo';
import { Footer } from '@/components/Footer';
import { useGpxTrack } from '@/hooks/useGpxTrack';
import { useWeather } from '@/hooks/useWeather';

export default function App() {
  const gpxUrl = `${import.meta.env.BASE_URL}ennsradweg_osm.gpx`;
  const { track, waypoints, dayEnd, donauStart, loaded } = useGpxTrack(gpxUrl);
  const { byWaypoint: weather, updatedAt, loading, refresh } = useWeather(waypoints);

  const [hover, setHover] = useState<{ lat: number; lon: number; label: string } | null>(null);

  return (
    <>
      <Hero />
      <main className="max-w-6xl mx-auto px-5 md:px-8 -mt-4 relative z-10">
        <section className="mt-8 md:mt-10">
          <SectionTitle eyebrow="Trasa" title="Mapa a výškový profil" hint="263 km podél Enns, tři dny" />
          <div className="card overflow-hidden">
            {loaded ? (
              <>
                <TripMap
                  track={track}
                  waypoints={waypoints}
                  dayEnd={dayEnd}
                  donauStart={donauStart}
                  weather={weather}
                  hover={hover}
                />
                <div className="border-t border-slate-200/70">
                  <ElevationProfile
                    track={track}
                    waypoints={waypoints}
                    weather={weather}
                    dayEnd={dayEnd}
                    onHover={setHover}
                  />
                </div>
                <PrecipitationChart waypoints={waypoints} weather={weather} dayEnd={dayEnd} />
              </>
            ) : (
              <div className="h-[520px] animate-pulse bg-gradient-to-br from-slate-100 to-slate-200" />
            )}
          </div>
        </section>

        <WeatherDays
          waypoints={waypoints}
          weather={weather}
          updatedAt={updatedAt}
          loading={loading}
          onRefresh={refresh}
        />

        <Highlights />

        <Stays />

        <PracticalInfo />
      </main>
      <Footer />
    </>
  );
}

import { useCallback, useState } from 'react';
import { Hero } from '@/components/Hero';
import { SectionTitle } from '@/components/SectionTitle';
import { TripMap, type UserLocation } from '@/components/TripMap';
import { ElevationProfile } from '@/components/ElevationProfile';
import { PrecipitationChart } from '@/components/PrecipitationChart';
import { WeatherDays } from '@/components/WeatherDays';
import { Stays } from '@/components/Stays';
import { OnRoute } from '@/components/OnRoute';
import { PracticalInfo } from '@/components/PracticalInfo';
import { AboutRoute } from '@/components/AboutRoute';
import { StickyNav } from '@/components/StickyNav';
import { Footer } from '@/components/Footer';
import { useGpxTrack } from '@/hooks/useGpxTrack';
import { useWeather } from '@/hooks/useWeather';
import { setHover } from '@/hooks/useHoverStore';

export default function App() {
  const gpxUrl = `${import.meta.env.BASE_URL}ennsradweg_osm.gpx`;
  const { track, waypoints, dayEnd, donauStart, loaded } = useGpxTrack(gpxUrl);
  const { byWaypoint: weather, updatedAt, loading, refresh } = useWeather(waypoints);

  const [userLoc, setUserLoc] = useState<UserLocation | null>(null);
  const handleLocate = useCallback((loc: UserLocation | null) => setUserLoc(loc), []);

  return (
    <>
      <a id="top" />
      <StickyNav />
      <Hero />
      <main className="max-w-6xl mx-auto px-5 md:px-8 -mt-4 relative z-10">
        <section id="mapa" className="mt-8 md:mt-10 scroll-mt-20">
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
                  onLocate={handleLocate}
                />
                <div className="border-t border-slate-200/70">
                  <ElevationProfile
                    track={track}
                    waypoints={waypoints}
                    weather={weather}
                    dayEnd={dayEnd}
                    onHover={setHover}
                    userLoc={userLoc}
                  />
                </div>
                <PrecipitationChart waypoints={waypoints} weather={weather} dayEnd={dayEnd} />
              </>
            ) : (
              <div className="h-[520px] animate-pulse bg-gradient-to-br from-slate-100 to-slate-200" />
            )}
          </div>
        </section>

        <div id="pocasi" className="scroll-mt-20">
          <WeatherDays
            waypoints={waypoints}
            weather={weather}
            updatedAt={updatedAt}
            loading={loading}
            onRefresh={refresh}
          />
        </div>

        <div id="na-trase" className="scroll-mt-20">
          <OnRoute />
        </div>

        <div id="ubytovani" className="scroll-mt-20">
          <Stays />
        </div>

        <div id="o-trase" className="scroll-mt-20">
          <AboutRoute />
        </div>

        <div id="info" className="scroll-mt-20">
          <PracticalInfo track={track} dayEnd={dayEnd} />
        </div>
      </main>
      <Footer />
    </>
  );
}

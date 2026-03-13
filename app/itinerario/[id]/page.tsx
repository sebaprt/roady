'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Itinerary, Day, Stop } from '@/lib/types';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface DetailPageProps {
  params: {
    id: string;
  };
}

export default function ItineraryDetailPage({ params }: DetailPageProps) {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [days, setDays] = useState<Day[]>([]);
  const [stops, setStops] = useState<Record<string, Stop[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number>(1);

  useEffect(() => {
    loadItinerary();
  }, [params.id]);

  const loadItinerary = async () => {
    try {
      // Load itinerary
      const { data: itineraryData, error: itineraryError } = await supabase
        .from('itineraries')
        .select('*')
        .eq('id', params.id)
        .eq('status', 'published')
        .single();

      if (itineraryError) throw itineraryError;
      setItinerary(itineraryData);

      // Load days
      const { data: daysData, error: daysError } = await supabase
        .from('days')
        .select('*')
        .eq('itinerary_id', params.id)
        .order('day_number', { ascending: true });

      if (daysError) throw daysError;
      setDays(daysData || []);

      // Load stops for each day
      if (daysData && daysData.length > 0) {
        const dayIds = daysData.map((d) => d.id);
        const { data: stopsData, error: stopsError } = await supabase
          .from('stops')
          .select('*')
          .in('day_id', dayIds)
          .order('position', { ascending: true });

        if (stopsError) throw stopsError;

        const stopsByDay: Record<string, Stop[]> = {};
        daysData.forEach((day) => {
          stopsByDay[day.id] = stopsData?.filter((s) => s.day_id === day.id) || [];
        });
        setStops(stopsByDay);
      }
    } catch (err) {
      console.error('Error loading itinerary:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange mb-4"></div>
          <p className="text-ink-light">Loading itinerary...</p>
        </div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-ink mb-2">Itinerary not found</h1>
          <p className="text-ink-light">This itinerary doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const currentDay = days.find((d) => d.day_number === selectedDay);
  const currentDayStops = currentDay ? stops[currentDay.id] || [] : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-sand-pale to-white border-b border-sand-light py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-ink font-serif mb-4">
            {itinerary.title}
          </h1>
          <div className="flex flex-wrap gap-4 items-center">
            {itinerary.destination && (
              <span className="text-lg text-ink-light">{itinerary.destination}</span>
            )}
            {itinerary.duration_days && (
              <span className="text-lg text-ink-light">
                • {itinerary.duration_days} days
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Days Sidebar */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-ink text-lg mb-4">Trip Days</h3>
            <div className="space-y-2">
              {days.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.day_number)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                    selectedDay === day.day_number
                      ? 'bg-orange text-white'
                      : 'bg-sand-pale text-ink hover:bg-sand-light'
                  }`}
                >
                  Day {day.day_number}
                  {day.title && <span className="block text-sm opacity-75">{day.title}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2">
            {currentDay && (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-ink font-serif mb-2">
                    Day {currentDay.day_number}
                    {currentDay.title && <span className="text-ink-light">: {currentDay.title}</span>}
                  </h2>
                  {currentDay.date && (
                    <p className="text-ink-light">📅 {new Date(currentDay.date).toLocaleDateString()}</p>
                  )}
                </div>

                {/* Stops */}
                {currentDayStops.length > 0 ? (
                  <div className="space-y-6">
                    {currentDayStops.map((stop, idx) => (
                      <div
                        key={stop.id}
                        className="border border-sand-light rounded-xl p-6 hover:border-orange transition"
                      >
                        <div className="flex gap-4">
                          {/* Stop Number */}
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center font-bold">
                              {idx + 1}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-ink mb-1">{stop.title}</h3>

                            {stop.location && (
                              <p className="text-ink-light mb-3">📍 {stop.location}</p>
                            )}

                            {stop.description && (
                              <p className="text-ink mb-3">{stop.description}</p>
                            )}

                            <div className="flex flex-wrap gap-4 text-sm text-ink-light">
                              {stop.duration_hours && (
                                <span>⏱️ {stop.duration_hours} hours</span>
                              )}
                              {stop.lat && stop.lng && (
                                <span>
                                  📌 {parseFloat(stop.lat.toString()).toFixed(2)},
                                  {parseFloat(stop.lng.toString()).toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Photo */}
                        {stop.photo_url && (
                          <div className="mt-4 rounded-lg overflow-hidden">
                            <img
                              src={stop.photo_url}
                              alt={stop.title}
                              className="w-full h-64 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-ink-light text-lg">No stops for this day yet</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

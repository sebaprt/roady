'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Itinerary } from '@/lib/types';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const COUNTRIES = [
  { code: 'IT', name: '🇮🇹 Italy' },
  { code: 'FR', name: '🇫🇷 France' },
  { code: 'ES', name: '🇪🇸 Spain' },
  { code: 'DE', name: '🇩🇪 Germany' },
  { code: 'US', name: '🇺🇸 USA' },
  { code: 'JP', name: '🇯🇵 Japan' },
  { code: 'TH', name: '🇹🇭 Thailand' },
];

const DURATIONS = [
  { value: 1, label: '1-3 days' },
  { value: 3, label: '4-7 days' },
  { value: 7, label: '8-14 days' },
  { value: 15, label: '15+ days' },
];

export default function ExplorePage() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  useEffect(() => {
    loadItineraries();
  }, [searchQuery, selectedCountry, selectedDuration]);

  const loadItineraries = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('itineraries')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      if (selectedCountry) {
        query = query.eq('country_code', selectedCountry);
      }

      if (selectedDuration) {
        if (selectedDuration === 1) {
          query = query.lte('duration_days', 3);
        } else if (selectedDuration === 3) {
          query = query.gt('duration_days', 3).lte('duration_days', 7);
        } else if (selectedDuration === 7) {
          query = query.gt('duration_days', 7).lte('duration_days', 14);
        } else if (selectedDuration === 15) {
          query = query.gt('duration_days', 14);
        }
      }

      const { data, error } = await query;

      if (error) throw error;
      setItineraries(data || []);
    } catch (err) {
      console.error('Error loading itineraries:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-sand-pale to-white border-b border-sand-light py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-ink font-serif mb-4">Explore Itineraries</h1>
          <p className="text-lg text-ink-light">
            Discover amazing travel itineraries from creators around the world
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters & Search */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search destinations, cities, or countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 border border-sand-light rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent text-lg"
            />
          </div>

          {/* Filter Pills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Countries */}
            <div>
              <h3 className="font-bold text-ink mb-3">Destination</h3>
              <div className="flex flex-wrap gap-2">
                {COUNTRIES.map((country) => (
                  <button
                    key={country.code}
                    onClick={() =>
                      setSelectedCountry(
                        selectedCountry === country.code ? null : country.code
                      )
                    }
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedCountry === country.code
                        ? 'bg-orange text-white'
                        : 'border border-sand-light text-ink hover:border-orange'
                    }`}
                  >
                    {country.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <h3 className="font-bold text-ink mb-3">Trip Duration</h3>
              <div className="flex flex-wrap gap-2">
                {DURATIONS.map((duration) => (
                  <button
                    key={duration.value}
                    onClick={() =>
                      setSelectedDuration(
                        selectedDuration === duration.value ? null : duration.value
                      )
                    }
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedDuration === duration.value
                        ? 'bg-orange text-white'
                        : 'border border-sand-light text-ink hover:border-orange'
                    }`}
                  >
                    {duration.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange"></div>
            <p className="text-ink-light mt-4">Loading itineraries...</p>
          </div>
        ) : itineraries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl text-ink-light">No itineraries found</p>
            <p className="text-ink-light mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-ink-light mb-6">
              Found {itineraries.length} itinerary{itineraries.length !== 1 ? 'ies' : ''}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {itineraries.map((itinerary) => (
                <Link
                  key={itinerary.id}
                  href={`/itinerario/${itinerary.id}`}
                  className="group rounded-xl overflow-hidden border border-sand-light hover:border-orange hover:shadow-lg transition duration-300"
                >
                  {/* Image */}
                  <div className="w-full h-48 bg-gradient-to-br from-orange-pale to-sand-pale flex items-center justify-center group-hover:scale-105 transition">
                    <span className="text-5xl">🗺️</span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-ink font-serif line-clamp-2 mb-2">
                      {itinerary.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      {itinerary.country_code && (
                        <span className="text-sm text-ink-light">
                          {getCountryEmoji(itinerary.country_code)} {itinerary.destination}
                        </span>
                      )}
                    </div>

                    {itinerary.duration_days && (
                      <p className="text-sm text-ink-light">
                        {itinerary.duration_days} days
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function getCountryEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

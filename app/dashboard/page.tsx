'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange mb-4"></div>
          <p className="text-ink-light">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-sand-pale">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-ink font-serif mb-8">
          Welcome back, {user.username}! 👋
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: 'Create Itinerary',
              desc: 'Start planning a new trip',
              href: '/novo-viaggio',
              icon: '✏️',
            },
            {
              title: 'View Profile',
              desc: 'See your public profile',
              href: `/u/${user.username}`,
              icon: '👤',
            },
            {
              title: 'Explore',
              desc: 'Discover itineraries',
              href: '/esplora',
              icon: '🌍',
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white border border-sand-light rounded-xl p-6 hover:border-orange hover:shadow-lg transition"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-ink text-lg mb-2">{item.title}</h3>
              <p className="text-ink-light">{item.desc}</p>
            </Link>
          ))}
        </div>

        <div className="bg-white border border-sand-light rounded-xl p-8">
          <h2 className="text-2xl font-bold text-ink font-serif mb-6">Your Itineraries</h2>
          <div className="text-center py-12">
            <p className="text-ink-light text-lg">No itineraries yet</p>
            <Link
              href="/novo-viaggio"
              className="inline-block mt-4 bg-orange text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-dark transition"
            >
              Create Your First Itinerary
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

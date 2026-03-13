import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sand-pale via-white to-orange-pale">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold text-ink font-serif mb-6 leading-tight">
            Your Travel Stories,
            <br />
            <span className="text-orange">Shared Perfectly</span>
          </h1>
          <p className="text-xl text-ink-light mb-8 max-w-2xl mx-auto">
            Create detailed itineraries, discover hidden gems, and share your travel experiences
            with travelers worldwide.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/novo-viaggio"
            className="bg-orange text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-dark transition inline-block"
          >
            Create Your First Itinerary
          </Link>
          <Link
            href="/esplora"
            className="border-2 border-orange text-orange px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-pale transition inline-block"
          >
            Explore Itineraries
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white border-t border-sand-light py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-ink font-serif mb-16 text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '✏️',
                title: 'Create',
                desc: 'Plan your trip with our interactive map editor. Add stops, photos, and descriptions.',
              },
              {
                icon: '🌍',
                title: 'Discover',
                desc: 'Explore amazing itineraries from travelers around the world.',
              },
              {
                icon: '💰',
                title: 'Earn',
                desc: 'Monetize your travel expertise by selling your best itineraries (coming soon).',
              },
            ].map((step) => (
              <div
                key={step.title}
                className="p-8 border border-sand-light rounded-xl hover:border-orange hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-2xl font-bold text-ink font-serif mb-3">{step.title}</h3>
                <p className="text-ink-light text-lg">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Itineraries Preview */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-ink font-serif mb-12 text-center">
          Featured Itineraries
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-sand-pale rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer group"
            >
              <div className="w-full h-48 bg-gradient-to-br from-orange to-orange-dark flex items-center justify-center">
                <span className="text-6xl">🗺️</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-ink font-serif mb-2">Coming Soon</h3>
                <p className="text-sm text-ink-light">Featured itineraries will appear here</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy text-white py-20">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold font-serif mb-6">Ready to Start?</h2>
          <p className="text-lg text-gray-200 mb-8">
            Join thousands of travelers creating and discovering amazing itineraries.
          </p>
          <Link
            href="/novo-viaggio"
            className="inline-block bg-orange text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-dark transition"
          >
            Create Your Itinerary Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-sand-light py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center text-white font-bold">
                  🧭
                </div>
                <span className="font-bold text-ink font-serif">WanderPlan</span>
              </div>
              <p className="text-sm text-ink-light">
                Share your travel stories with the world.
              </p>
            </div>

            {[
              { title: 'Product', links: ['Explore', 'Create', 'Sell'] },
              { title: 'Company', links: ['About', 'Blog', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold text-ink mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-ink-light hover:text-ink transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-sand-light pt-8 text-center text-sm text-ink-light">
            <p>&copy; 2026 WanderPlan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

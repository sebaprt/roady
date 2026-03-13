'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { AuthModal } from './AuthModal';

export function Navbar() {
  const { user, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <>
      <header className="border-b border-sand-light bg-white sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center text-white font-bold text-sm">
              🧭
            </div>
            <span className="text-lg font-bold text-ink font-serif">WanderPlan</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/esplora"
              className="text-ink-light hover:text-ink transition font-medium"
            >
              Explore
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 hover:bg-sand-pale px-3 py-2 rounded-lg transition"
                >
                  <div className="w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-ink">{user.username}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-12 bg-white border border-sand-light rounded-lg shadow-lg py-2 w-48">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-ink-light hover:bg-sand-pale hover:text-ink transition"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href={`/u/${user.username}`}
                      className="block px-4 py-2 text-ink-light hover:bg-sand-pale hover:text-ink transition"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-ink-light hover:bg-sand-pale hover:text-ink transition border-t border-sand-light"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="text-ink-light hover:text-ink transition font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-orange text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-dark transition"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}

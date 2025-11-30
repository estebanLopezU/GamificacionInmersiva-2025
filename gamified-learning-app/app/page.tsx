"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth(); // Use useAuth hook

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not authenticated, redirect to login
        router.push('/login');
      } else if (user.role === 'admin') {
        // Authenticated as admin, redirect to admin page
        router.push('/admin');
      } else {
        // Authenticated as regular user, redirect to games page
        router.push('/games');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // This component won't render anything for long as it redirects
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-xl">Redirecting...</div>
    </div>
  );
}

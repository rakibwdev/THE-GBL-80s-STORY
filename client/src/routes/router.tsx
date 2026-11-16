import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { HomePage } from '@/pages/public/HomePage';
import { PlaceholderPage } from '@/pages/public/PlaceholderPage';

/**
 * Public route table. Contributor and admin route trees are added in Phases 5–6
 * behind ProtectedRoute guards.
 */
export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/story',
        element: (
          <PlaceholderPage
            kicker="Our story"
            title="Gippsland basketball in the 1980s"
            description="Background of the league, its East and West divisions and the people involved. Content arrives in Phase 4."
          />
        ),
      },
      {
        path: '/clubs',
        element: (
          <PlaceholderPage
            kicker="Club directory"
            title="Find your club"
            description="Fifteen clubs across the East and West divisions. Directory and club pages arrive in Phase 4."
          />
        ),
      },
      {
        path: '/archive',
        element: (
          <PlaceholderPage
            kicker="The collection"
            title="From the archive"
            description="Searchable historical photographs, clippings, programmes and scorecards. Arrives in Phases 4 and 7."
          />
        ),
      },
      {
        path: '/recognition',
        element: (
          <PlaceholderPage
            kicker="Recognition"
            title="The people behind the game"
            description="Remarkables, Legends and Tributes. Listings and nomination forms arrive in Phases 4 and 7."
          />
        ),
      },
      {
        path: '/news',
        element: (
          <PlaceholderPage
            kicker="Reunions & news"
            title="Community updates"
            description="Reunion information and announcements. Arrives in Phase 4."
          />
        ),
      },
      {
        path: '/contribute',
        element: (
          <PlaceholderPage
            kicker="Contribute"
            title="Share your history"
            description="Upload instructions, permission information and contact forms. Arrives in Phases 5 and 7."
          />
        ),
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

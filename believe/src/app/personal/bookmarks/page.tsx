// ============================================================
// src/app/personal/bookmarks/page.tsx
// ============================================================
import { BookmarksManager } from '@/components/personal/BookmarksManager'
import { PageHeader } from '@/components/layout/PageHeader'

export default function BookmarksPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon="🔖"
        title="Bookmarks"
        description="Everything you've saved — resources and opportunities — with personal notes."
        color="#f59e0b"
      />
      <BookmarksManager />
    </div>
  )
}

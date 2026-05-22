// ============================================================
// src/app/personal/notes/page.tsx
// ============================================================
import { NotesManager } from '@/components/personal/NotesManager'
import { PageHeader } from '@/components/layout/PageHeader'

export default function NotesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon="📝"
        title="Notes"
        description="Your personal knowledge base — capture insights, ideas, and learnings with tags."
        color="#6366f1"
      />
      <NotesManager />
    </div>
  )
}

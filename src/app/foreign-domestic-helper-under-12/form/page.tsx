import { ApplicationForm } from '@/components/sections/form';
import { MiniFAQ } from '@/components/shared';

export default function FormPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <ApplicationForm />
      <MiniFAQ />
    </main>
  );
}

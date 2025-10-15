import SSRGuard from '@/lib/components/common/SSRGuard/SSRGuard';
import NewDogPage from '@/lib/components/Dogs/NewDogPage';

export default function NewDogRoute() {
  return (
    <SSRGuard>
      <NewDogPage />
    </SSRGuard>
  );
}

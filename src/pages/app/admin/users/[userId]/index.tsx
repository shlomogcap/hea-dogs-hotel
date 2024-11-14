import { useRouter } from 'next/router';

export default function UserPage() {
  const { query } = useRouter();
  return <div>User Page with Id {query.userId}</div>;
}

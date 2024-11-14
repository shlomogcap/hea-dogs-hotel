import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { User } from 'firebase/auth';
import {
  NextApiRequest as OriginalNextApiRequest,
  NextApiResponse as OriginalNextApiResponse,
} from 'next';

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_FIREBASE_API_KEY: string;
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
    NEXT_PUBLIC_FIREBASE_APP_ID: string;
  }
}

declare global {
  interface NextApiRequest<
    Body extends OriginalNextApiRequest['body'] = any,
    Query extends OriginalNextApiRequest['query'] = any,
  > extends OriginalNextApiRequest {
    authedUser?: DecodedIdToken;
    authedUsertoken?: string;
    body: Body;
    query: Query;
  }
  interface NextApiResponse<Data = any> extends OriginalNextApiResponse<Data> {}
}

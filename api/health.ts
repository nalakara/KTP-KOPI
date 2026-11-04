interface ApiRequest {
  method?: string;
}

interface ApiResponse {
  json: (data: any) => void;
}

export default function handler(req: ApiRequest, res: ApiResponse) {
  res.json({ status: 'ok', service: 'Coffee ID Backend (Vercel Serverless)' });
}


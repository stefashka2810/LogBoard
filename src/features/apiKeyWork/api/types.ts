export interface ApiKeyCreate {
  projectId: string;
  name: string;
  expiresAt?: string;
}

export interface ApiKeyCopy {
  id: string;
  apiKey: string;
  createdAt: string;
}

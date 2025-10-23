# API Integration Guide

This document explains how the frontend connects to the backend services directly.

## Environment Variables

The frontend uses environment variables to configure the backend service URLs. These are defined in `.env.local`:

```bash
NEXT_PUBLIC_AUTH_SERVICE_URL=http://localhost:3001
NEXT_PUBLIC_MATCH_SERVICE_URL=http://localhost:8000
NEXT_PUBLIC_REFEREE_SERVICE_URL=http://localhost:8001
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

### Important Notes

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Create a `.env.local` file in the root of the frontend project
- Use `.env.example` as a template

## Service Architecture

### Auth Service (Node.js/Express)
- **URL**: `http://localhost:3001`
- **Endpoints**:
  - `POST /auth/login` - User login
  - `POST /auth/register` - User registration
  - `GET /auth/verify` - Verify JWT token
  - `GET /auth/profile` - Get user profile
  - `PUT /auth/profile` - Update user profile
  - `POST /auth/logout` - Logout user
  - `GET /health` - Health check

### Match Management Service (FastAPI/Python)
- **URL**: `http://localhost:8000`
- **Endpoints**:
  - `GET /matches` - List all matches
  - `GET /matches/{match_id}` - Get match by ID
  - `POST /matches` - Create new match
  - `PUT /matches/{match_id}` - Update match
  - `DELETE /matches/{match_id}` - Delete match

### Referee Management Service (FastAPI/Python)
- **URL**: `http://localhost:8001`
- **Endpoints**:
  - `GET /referees` - List all referees
  - `GET /referees/{referee_id}` - Get referee by ID
  - `POST /referees` - Create new referee
  - `PUT /referees/{referee_id}` - Update referee
  - `DELETE /referees/{referee_id}` - Delete referee
  - `GET /health` - Health check

## API Client Services

The frontend includes three service clients located in `src/services/`:

### 1. Auth Service (`auth.service.ts`)

```typescript
import { authService } from '@/services';

// Login
await authService.login({ email, password });

// Register
await authService.register({ email, password, name });

// Logout
await authService.logout();

// Get profile
const profile = await authService.getProfile();
```

### 2. Match Service (`match.service.ts`)

```typescript
import { matchService } from '@/services';

// Get all matches
const matches = await matchService.getMatches();

// Get match by ID
const match = await matchService.getMatch(id);

// Create match
const newMatch = await matchService.createMatch(data);

// Update match
await matchService.updateMatch(id, data);

// Delete match
await matchService.deleteMatch(id);

// Assign referee to match
await matchService.assignReferee(matchId, refereeId);
```

### 3. Referee Service (`referee.service.ts`)

```typescript
import { refereeService } from '@/services';

// Get all referees
const referees = await refereeService.getReferees();

// Get referee by ID
const referee = await refereeService.getReferee(id);

// Create referee
const newReferee = await refereeService.createReferee(data);

// Update referee
await refereeService.updateReferee(id, data);

// Delete referee
await refereeService.deleteReferee(id);

// Get available referees
const available = await refereeService.getAvailableReferees();
```

## Authentication Flow

1. User submits login credentials
2. Frontend calls `authService.login()`
3. Auth service validates credentials and returns JWT token
4. Token and user data are stored in localStorage
5. Token is automatically included in subsequent API calls
6. Token is sent in `Authorization: Bearer <token>` header

## Error Handling

All service methods throw errors that can be caught:

```typescript
try {
  await authService.login(credentials);
  // Success
} catch (error) {
  console.error(error.message);
  // Handle error
}
```

## Starting the Services

### 1. Start Auth Service
```bash
cd /Users/mateovivas/Documents/SGAD/sgad-auth-service
npm install
npm start
# Runs on http://localhost:3001
```

### 2. Start Match Management Service
```bash
cd /Users/mateovivas/Documents/SGAD/sgad-match-management
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
# Runs on http://localhost:8000
```

### 3. Start Referee Management Service
```bash
cd /Users/mateovivas/Documents/SGAD/sgad-referee-management
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
# Runs on http://localhost:8001
```

### 4. Start Frontend
```bash
cd /Users/mateovivas/Documents/SGAD/sgad-frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

## CORS Configuration

All backend services have been configured to accept requests from:
- `http://localhost:3000` (Frontend dev server)
- `http://localhost:3007` (Alternative frontend port)

## Next Steps

1. Implement the actual backend endpoints if not already done
2. Update the frontend components to use the service clients
3. Add proper error handling and loading states
4. Implement authentication guards for protected routes
5. Add request/response interceptors for global error handling

## Troubleshooting

### CORS Errors
- Ensure all backend services have CORS middleware configured
- Check that frontend URL is in the allowed origins list

### Authentication Errors
- Check that token is being stored correctly in localStorage
- Verify token is included in request headers
- Check token expiration

### Connection Refused
- Ensure all backend services are running
- Verify correct ports in `.env.local`
- Check firewall settings

## Example Usage in Components

```typescript
"use client"

import { useEffect, useState } from 'react';
import { matchService, Match } from '@/services';

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMatches() {
      try {
        const data = await matchService.getMatches();
        setMatches(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    loadMatches();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {matches.map(match => (
        <div key={match.id}>{match.home_team} vs {match.away_team}</div>
      ))}
    </div>
  );
}
```


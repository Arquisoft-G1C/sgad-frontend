/**
 * useMatches Hook
 * Custom hook for managing match data
 */

import { useState, useEffect, useCallback } from 'react';
import { matchService, Match, MatchCreate, MatchUpdate } from '@/services';

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMatches = useCallback(async (params?: {
    skip?: number;
    limit?: number;
    referee_id?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const data = await matchService.getMatches(params);
      setMatches(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getMatch = useCallback(async (id: number) => {
    try {
      setError(null);
      return await matchService.getMatch(id);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  const createMatch = useCallback(async (data: MatchCreate) => {
    try {
      setError(null);
      const newMatch = await matchService.createMatch(data);
      setMatches(prev => [...prev, newMatch]);
      return newMatch;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateMatch = useCallback(async (id: number, data: MatchUpdate) => {
    try {
      setError(null);
      const updatedMatch = await matchService.updateMatch(id, data);
      setMatches(prev => prev.map(m => m.id === id ? updatedMatch : m));
      return updatedMatch;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteMatch = useCallback(async (id: number) => {
    try {
      setError(null);
      await matchService.deleteMatch(id);
      setMatches(prev => prev.filter(m => m.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  const assignReferee = useCallback(async (matchId: number, refereeId: number) => {
    try {
      setError(null);
      const updatedMatch = await matchService.assignReferee(matchId, refereeId);
      setMatches(prev => prev.map(m => m.id === matchId ? updatedMatch : m));
      return updatedMatch;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  return {
    matches,
    loading,
    error,
    loadMatches,
    getMatch,
    createMatch,
    updateMatch,
    deleteMatch,
    assignReferee,
  };
}


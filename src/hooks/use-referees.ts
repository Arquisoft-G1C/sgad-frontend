/**
 * useReferees Hook
 * Custom hook for managing referee data
 */

import { useState, useEffect, useCallback } from 'react';
import { refereeService, Referee, RefereeCreate, RefereeUpdate } from '@/services';

export function useReferees() {
  const [referees, setReferees] = useState<Referee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReferees = useCallback(async (params?: {
    skip?: number;
    limit?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const data = await refereeService.getReferees(params);
      setReferees(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getReferee = useCallback(async (id: number) => {
    try {
      setError(null);
      return await refereeService.getReferee(id);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  const createReferee = useCallback(async (data: RefereeCreate) => {
    try {
      setError(null);
      const newReferee = await refereeService.createReferee(data);
      setReferees(prev => [...prev, newReferee]);
      return newReferee;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateReferee = useCallback(async (id: number, data: RefereeUpdate) => {
    try {
      setError(null);
      const updatedReferee = await refereeService.updateReferee(id, data);
      setReferees(prev => prev.map(r => r.id === id ? updatedReferee : r));
      return updatedReferee;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteReferee = useCallback(async (id: number) => {
    try {
      setError(null);
      await refereeService.deleteReferee(id);
      setReferees(prev => prev.filter(r => r.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  const getAvailableReferees = useCallback(async () => {
    try {
      setError(null);
      return await refereeService.getAvailableReferees();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateAvailability = useCallback(async (id: number, available: boolean) => {
    try {
      setError(null);
      const updatedReferee = await refereeService.updateAvailability(id, available);
      setReferees(prev => prev.map(r => r.id === id ? updatedReferee : r));
      return updatedReferee;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  useEffect(() => {
    loadReferees();
  }, [loadReferees]);

  return {
    referees,
    loading,
    error,
    loadReferees,
    getReferee,
    createReferee,
    updateReferee,
    deleteReferee,
    getAvailableReferees,
    updateAvailability,
  };
}


import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Plant } from '../types';
import { PostgrestError } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export function usePlants() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlants();
  }, []);

  async function fetchPlants() {
    try {
      setLoading(true);
      console.log('Fetching plants from Supabase URL:', supabaseUrl);
      const { data, error } = await supabase
        .from('plants')
        .select('*');
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Fetched data:', data);
      if (data) {
        setPlants(data);
      } else {
        setPlants([]);
      }
    } catch (error) {
      const pgError = error as PostgrestError;
      const errorMessage = `Error fetching plants: ${pgError.message || 'Unknown error'}`;
      setError(errorMessage);
      console.error(errorMessage, pgError);
    } finally {
      setLoading(false);
    }
  }

  async function addPlant(plant: Omit<Plant, 'id'>) {
    try {
      setLoading(true);
      console.log('Adding plant:', plant);
      const { data, error } = await supabase
        .from('plants')
        .insert([plant])
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Added plant:', data);
      if (data) {
        setPlants([...plants, data]);
      }
    } catch (error) {
      const pgError = error as PostgrestError;
      const errorMessage = `Error adding plant: ${pgError.message || 'Unknown error'}`;
      setError(errorMessage);
      console.error(errorMessage, pgError);
    } finally {
      setLoading(false);
    }
  }

  async function updatePlant(id: string, updates: Partial<Plant>) {
    try {
      setLoading(true);
      console.log('Updating plant:', id, updates);
      const { data, error } = await supabase
        .from('plants')
        .update(updates)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Updated plant:', data);
      if (data) {
        setPlants(plants.map(p => p.id === id ? { ...p, ...updates } : p));
      }
    } catch (error) {
      const pgError = error as PostgrestError;
      const errorMessage = `Error updating plant: ${pgError.message || 'Unknown error'}`;
      setError(errorMessage);
      console.error(errorMessage, pgError);
    } finally {
      setLoading(false);
    }
  }

  async function deletePlant(id: string) {
    try {
      setLoading(true);
      console.log('Deleting plant:', id);
      const { error } = await supabase
        .from('plants')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Deleted plant:', id);
      setPlants(plants.filter(p => p.id !== id));
    } catch (error) {
      const pgError = error as PostgrestError;
      const errorMessage = `Error deleting plant: ${pgError.message || 'Unknown error'}`;
      setError(errorMessage);
      console.error(errorMessage, pgError);
    } finally {
      setLoading(false);
    }
  }

  return { plants, loading, error, fetchPlants, addPlant, updatePlant, deletePlant };
}

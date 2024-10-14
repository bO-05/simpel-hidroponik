import { useState, useEffect } from 'react';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Plant, PlantSystemPair } from '../types';

interface MyDB extends DBSchema {
  plants: {
    key: string;
    value: Plant;
  };
  systems: {
    key: string;
    value: PlantSystemPair;
  };
  users: {
    key: string;
    value: {
      id: string;
      name: string;
      email: string;
    };
  };
}

const DB_NAME = 'hydroponicDB';
const DB_VERSION = 1;

const useDatabase = () => {
  const [db, setDb] = useState<IDBPDatabase<MyDB> | null>(null);

  useEffect(() => {
    const initDB = async () => {
      const database = await openDB<MyDB>(DB_NAME, DB_VERSION, {
        upgrade(db: IDBPDatabase<MyDB>) {
          if (!db.objectStoreNames.contains('plants')) {
            db.createObjectStore('plants', { keyPath: 'name' });
          }
          if (!db.objectStoreNames.contains('systems')) {
            db.createObjectStore('systems', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('users')) {
            db.createObjectStore('users', { keyPath: 'id' });
          }
        },
      });
      setDb(database);
    };

    initDB();
  }, []);

  const addPlant = async (plant: Plant) => {
    if (!db) return;
    await db.put('plants', plant);
  };

  const getPlant = async (name: string) => {
    if (!db) return null;
    return await db.get('plants', name);
  };

  const getAllPlants = async () => {
    if (!db) return [];
    return await db.getAll('plants');
  };

  const deletePlant = async (name: string) => {
    if (!db) return;
    await db.delete('plants', name);
  };

  const addSystem = async (system: PlantSystemPair) => {
    if (!db) return;
    await db.put('systems', system);
  };

  const getSystem = async (id: string) => {
    if (!db) return null;
    return await db.get('systems', id);
  };

  const getAllSystems = async () => {
    if (!db) return [];
    return await db.getAll('systems');
  };

  const deleteSystem = async (id: string) => {
    if (!db) return;
    await db.delete('systems', id);
  };

  const addUser = async (user: { id: string; name: string; email: string }) => {
    if (!db) return;
    await db.put('users', user);
  };

  const getUser = async (id: string) => {
    if (!db) return null;
    return await db.get('users', id);
  };

  const getAllUsers = async () => {
    if (!db) return [];
    return await db.getAll('users');
  };

  const deleteUser = async (id: string) => {
    if (!db) return;
    await db.delete('users', id);
  };

  return {
    addPlant,
    getPlant,
    getAllPlants,
    deletePlant,
    addSystem,
    getSystem,
    getAllSystems,
    deleteSystem,
    addUser,
    getUser,
    getAllUsers,
    deleteUser,
  };
};

export default useDatabase;

import React, { useState, useEffect } from 'react';
import { Camera, Plus, Trash2 } from 'lucide-react';
import { PlantSystemPair } from '../App';
import useLocalStorage from '../hooks/useLocalStorage';

interface GrowthEntry {
  id: string;
  plantSystem: string;
  date: string;
  note: string;
  imageUrl: string | null;
}

interface PlantGrowthTrackerProps {
  selectedPairs: PlantSystemPair[];
}

const PlantGrowthTracker: React.FC<PlantGrowthTrackerProps> = ({ selectedPairs }) => {
  const [entries, setEntries] = useLocalStorage<GrowthEntry[]>('growthEntries', []);
  const [newNote, setNewNote] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [selectedPair, setSelectedPair] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPairs.length > 0 && !selectedPair) {
      setSelectedPair(`${selectedPairs[0].plant}-${selectedPairs[0].system}`);
    }
  }, [selectedPairs, selectedPair]);

  const handleAddEntry = () => {
    if (newNote.trim() === '' && !newImage || !selectedPair) return;

    const newEntry: GrowthEntry = {
      id: Date.now().toString(),
      plantSystem: selectedPair,
      date: new Date().toISOString().split('T')[0],
      note: newNote,
      imageUrl: newImage ? URL.createObjectURL(newImage) : null,
    };

    setEntries([newEntry, ...entries]);
    setNewNote('');
    setNewImage(null);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  if (selectedPairs.length === 0) {
    return <p>Please select at least one plant and system pair to track growth.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Plant Growth Tracker</h2>
      <div className="mb-4">
        <select
          className="w-full p-2 border rounded mb-2"
          value={selectedPair || ''}
          onChange={(e) => setSelectedPair(e.target.value)}
        >
          {selectedPairs.map((pair, index) => (
            <option key={index} value={`${pair.plant}-${pair.system}`}>
              {pair.plant} in {pair.system}
            </option>
          ))}
        </select>
        <textarea
          className="w-full p-2 border rounded"
          rows={3}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note about your plant's growth..."
        />
        <div className="flex items-center mt-2">
          <label className="flex items-center cursor-pointer bg-blue-500 text-white px-4 py-2 rounded mr-2">
            <Camera className="mr-2" />
            Add Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
            onClick={handleAddEntry}
          >
            <Plus className="mr-2" /> Add Entry
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {entries
          .filter(entry => entry.plantSystem === selectedPair)
          .map(entry => (
            <div key={entry.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{entry.date}</span>
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteEntry(entry.id)}
                >
                  <Trash2 />
                </button>
              </div>
              {entry.imageUrl && (
                <img src={entry.imageUrl} alt="Plant" className="w-full h-48 object-cover rounded mb-2" />
              )}
              <p>{entry.note}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlantGrowthTracker;

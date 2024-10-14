import React, { useState, useEffect } from 'react';
import { Bell, Plus, Check } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface Reminder {
  id: string;
  plantName: string;
  task: string;
  dueDate: string;
  completed: boolean;
}

interface CareRemindersProps {
  selectedPlants: string[];
}

const CareReminders: React.FC<CareRemindersProps> = ({ selectedPlants }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReminder, setNewReminder] = useState({ plantName: '', task: '', dueDate: '' });

  useEffect(() => {
    if (selectedPlants.length > 0) {
      fetchReminders();
    }
  }, [selectedPlants]);

  async function fetchReminders() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('care_reminders')
        .select('*')
        .in('plantName', selectedPlants)
        .order('dueDate', { ascending: true });

      if (error) {
        throw error;
      }

      if (data) {
        setReminders(data);
      }
    } catch (error) {
      console.error('Error fetching reminders:', error);
    } finally {
      setLoading(false);
    }
  }

  const addReminder = async () => {
    try {
      const { data, error } = await supabase
        .from('care_reminders')
        .insert([{ ...newReminder, completed: false }])
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        setReminders([...reminders, ...data]);
        setNewReminder({ plantName: '', task: '', dueDate: '' });
      }
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };

  const toggleReminderCompletion = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('care_reminders')
        .update({ completed })
        .eq('id', id);

      if (error) {
        throw error;
      }

      setReminders(reminders.map(reminder =>
        reminder.id === id ? { ...reminder, completed } : reminder
      ));
    } catch (error) {
      console.error('Error updating reminder:', error);
    }
  };

  if (loading) {
    return <div>Loading care reminders...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Bell className="mr-2" /> Care Reminders
      </h2>
      <p className="text-gray-600 mb-4">
        Set and manage reminders for various plant care tasks.
      </p>
      {selectedPlants.length === 0 ? (
        <p className="text-yellow-600">Please select plants to see care reminders.</p>
      ) : (
        <>
          <div className="mb-4 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Add New Reminder</h3>
            <div className="flex space-x-2">
              <select
                value={newReminder.plantName}
                onChange={(e) => setNewReminder({ ...newReminder, plantName: e.target.value })}
                className="border rounded px-2 py-1 flex-grow"
              >
                <option value="">Select a plant</option>
                {selectedPlants.map((plant) => (
                  <option key={plant} value={plant}>{plant}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Task"
                value={newReminder.task}
                onChange={(e) => setNewReminder({ ...newReminder, task: e.target.value })}
                className="border rounded px-2 py-1 flex-grow"
              />
              <input
                type="date"
                value={newReminder.dueDate}
                onChange={(e) => setNewReminder({ ...newReminder, dueDate: e.target.value })}
                className="border rounded px-2 py-1"
              />
              <button
                onClick={addReminder}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {reminders.map((reminder) => (
              <div key={reminder.id} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <span className="font-semibold">{reminder.plantName}</span>: {reminder.task}
                  <span className="ml-2 text-sm text-gray-600">
                    Due: {new Date(reminder.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => toggleReminderCompletion(reminder.id, !reminder.completed)}
                  className={`p-1 rounded ${
                    reminder.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  <Check size={20} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CareReminders;

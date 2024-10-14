import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, XCircle } from 'lucide-react';

interface CareReminder {
  id: string;
  plantName: string;
  task: string;
  dueDate: Date;
  completed: boolean;
}

interface CareRemindersProps {
  selectedPlants: string[];
}

const CareReminders: React.FC<CareRemindersProps> = ({ selectedPlants }) => {
  const [reminders, setReminders] = useState<CareReminder[]>([]);

  useEffect(() => {
    // Generate reminders for selected plants
    const newReminders = selectedPlants.flatMap(plant => generateReminders(plant));
    setReminders(newReminders);
  }, [selectedPlants]);

  const generateReminders = (plantName: string): CareReminder[] => {
    const today = new Date();
    return [
      {
        id: `${plantName}-water-${today.getTime()}`,
        plantName,
        task: 'Water plant',
        dueDate: new Date(today.setDate(today.getDate() + 2)), // Water every 2 days
        completed: false,
      },
      {
        id: `${plantName}-nutrients-${today.getTime()}`,
        plantName,
        task: 'Check nutrient levels',
        dueDate: new Date(today.setDate(today.getDate() + 7)), // Check nutrients weekly
        completed: false,
      },
      {
        id: `${plantName}-prune-${today.getTime()}`,
        plantName,
        task: 'Prune if necessary',
        dueDate: new Date(today.setDate(today.getDate() + 14)), // Prune biweekly
        completed: false,
      },
    ];
  };

  const toggleReminderCompletion = (id: string) => {
    setReminders(prevReminders =>
      prevReminders.map(reminder =>
        reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
      )
    );
  };

  const sortedReminders = reminders.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  return (
    <div className="mt-8 bg-yellow-100 p-4 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Bell className="mr-2 text-yellow-600" />
        Care Reminders
      </h3>
      {sortedReminders.length > 0 ? (
        <ul>
          {sortedReminders.map(reminder => (
            <li key={reminder.id} className="mb-2 flex items-center justify-between">
              <span>
                <strong>{reminder.plantName}:</strong> {reminder.task} - Due {reminder.dueDate.toLocaleDateString()}
              </span>
              <button
                onClick={() => toggleReminderCompletion(reminder.id)}
                className={`p-1 rounded-full ${
                  reminder.completed ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'
                }`}
              >
                {reminder.completed ? <CheckCircle size={20} /> : <XCircle size={20} />}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No care reminders at the moment. Add some plants to your garden to see reminders.</p>
      )}
    </div>
  );
};

export default CareReminders;

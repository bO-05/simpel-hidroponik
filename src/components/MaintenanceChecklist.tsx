import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Clock, Calendar } from 'lucide-react';
import { PlantSystemPair } from '../App';

interface Task {
  id: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  completed: boolean;
}

interface MaintenanceChecklistProps {
  selectedPairs: PlantSystemPair[];
}

const MaintenanceChecklist: React.FC<MaintenanceChecklistProps> = ({ selectedPairs }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (selectedPairs.length > 0) {
      const generatedTasks = selectedPairs.flatMap(pair => generateTasks(pair.plant, pair.system));
      setTasks(generatedTasks);
    } else {
      setTasks([]);
    }
  }, [selectedPairs]);

  const generateTasks = (plant: string, system: string): Task[] => {
    const commonTasks: Task[] = [
      { id: `${plant}-${system}-1`, description: `Check ${plant} for signs of stress or disease`, frequency: 'daily', completed: false },
      { id: `${plant}-${system}-2`, description: `Monitor nutrient solution levels in ${system}`, frequency: 'daily', completed: false },
      { id: `${plant}-${system}-3`, description: `Check and adjust pH levels in ${system}`, frequency: 'weekly', completed: false },
      { id: `${plant}-${system}-4`, description: `Clean ${system} components`, frequency: 'biweekly', completed: false },
      { id: `${plant}-${system}-5`, description: `Prune ${plant} as needed`, frequency: 'weekly', completed: false },
      { id: `${plant}-${system}-6`, description: `Replace nutrient solution in ${system}`, frequency: 'biweekly', completed: false },
      { id: `${plant}-${system}-7`, description: `Perform a deep clean of the ${system}`, frequency: 'monthly', completed: false },
    ];

    const systemSpecificTasks: { [key: string]: Task[] } = {
      'Wick System': [
        { id: `${plant}-${system}-8`, description: 'Check wick condition and replace if necessary', frequency: 'biweekly', completed: false },
      ],
      'Deep Water Culture (DWC)': [
        { id: `${plant}-${system}-8`, description: 'Check air pump and air stone functionality', frequency: 'weekly', completed: false },
      ],
      'Nutrient Film Technique (NFT)': [
        { id: `${plant}-${system}-8`, description: 'Ensure proper flow rate in channels', frequency: 'weekly', completed: false },
      ],
      'Ebb and Flow (Flood and Drain)': [
        { id: `${plant}-${system}-8`, description: 'Verify timer settings for flooding cycles', frequency: 'weekly', completed: false },
      ],
      'Aeroponics': [
        { id: `${plant}-${system}-8`, description: 'Clean and unclog spray nozzles', frequency: 'weekly', completed: false },
      ],
    };

    return [...commonTasks, ...(systemSpecificTasks[system] || [])];
  };

  const toggleTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case 'daily':
        return <Clock className="w-4 h-4 mr-2" />;
      case 'weekly':
      case 'biweekly':
      case 'monthly':
        return <Calendar className="w-4 h-4 mr-2" />;
      default:
        return null;
    }
  };

  if (selectedPairs.length === 0) {
    return <p>Please select at least one plant and system pair to generate the maintenance checklist.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Maintenance Checklist</h2>
      {selectedPairs.map((pair, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-xl font-semibold mb-2">
            Checklist for {pair.plant} in {pair.system} system:
          </h3>
          <div className="space-y-4">
            {tasks
              .filter(task => task.id.startsWith(`${pair.plant}-${pair.system}`))
              .map(task => (
                <div
                  key={task.id}
                  className="flex items-center p-3 bg-white rounded-lg shadow"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? (
                    <CheckSquare className="w-6 h-6 text-green-500 mr-3 cursor-pointer" />
                  ) : (
                    <Square className="w-6 h-6 text-gray-400 mr-3 cursor-pointer" />
                  )}
                  <div className="flex-grow">
                    <p className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {task.description}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      {getFrequencyIcon(task.frequency)}
                      {task.frequency.charAt(0).toUpperCase() + task.frequency.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MaintenanceChecklist;

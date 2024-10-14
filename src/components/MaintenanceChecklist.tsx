import React, { useState, useEffect } from 'react';
import { Clipboard, Check, AlertTriangle } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface MaintenanceTask {
  id: string;
  task: string;
  frequency: string;
  lastCompleted: string | null;
  systemType: string;
  plantType?: string;
  growthStage?: string;
}

interface PlantSystemPair {
  id: string;
  plant: string;
  system: string;
}

interface MaintenanceChecklistProps {
  selectedPairs: PlantSystemPair[];
}

const MaintenanceChecklist: React.FC<MaintenanceChecklistProps> = ({ selectedPairs }) => {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, [selectedPairs]);

  async function fetchTasks() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('maintenance_tasks')
        .select('*')
        .in('systemType', selectedPairs.map(pair => pair.system).concat('all'));
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching maintenance tasks:', error);
    } finally {
      setLoading(false);
    }
  }

  const completeTask = async (taskId: string) => {
    try {
      const completionDate = new Date().toISOString();
      const { error } = await supabase
        .from('maintenance_tasks')
        .update({ lastCompleted: completionDate })
        .eq('id', taskId);

      if (error) {
        throw error;
      }

      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, lastCompleted: completionDate } : task
      ));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const isTaskDue = (task: MaintenanceTask) => {
    if (!task.lastCompleted) return true;
    
    const lastCompleted = new Date(task.lastCompleted);
    const now = new Date();
    const daysSinceCompletion = (now.getTime() - lastCompleted.getTime()) / (1000 * 3600 * 24);

    switch (task.frequency) {
      case 'daily': return daysSinceCompletion >= 1;
      case 'weekly': return daysSinceCompletion >= 7;
      case 'monthly': return daysSinceCompletion >= 30;
      default: return true;
    }
  };

  if (loading) {
    return <div>Loading maintenance checklist...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Clipboard className="mr-2" /> Maintenance Checklist
      </h2>
      <p className="text-gray-600 mb-4">
        Keep your hydroponic system running smoothly by completing these maintenance tasks regularly.
      </p>
      {selectedPairs.length === 0 ? (
        <p className="text-yellow-600 flex items-center">
          <AlertTriangle className="mr-2" /> Please select plants and systems to see relevant maintenance tasks.
        </p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="text-lg font-semibold">{task.task}</h3>
                <p className="text-sm text-gray-600">Frequency: {task.frequency}</p>
                <p className="text-sm text-gray-600">
                  System: {task.systemType === 'all' ? 'All systems' : task.systemType}
                </p>
                {task.lastCompleted && (
                  <p className="text-sm text-gray-600">
                    Last completed: {new Date(task.lastCompleted).toLocaleDateString()}
                  </p>
                )}
              </div>
              <button
                onClick={() => completeTask(task.id)}
                className={`px-4 py-2 rounded-full ${
                  isTaskDue(task)
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-200 text-gray-700 cursor-not-allowed'
                }`}
                disabled={!isTaskDue(task)}
              >
                <Check size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaintenanceChecklist;

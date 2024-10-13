import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop, DropTargetMonitor, DragSourceMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Sprout, Droplet, Sun, Thermometer, Clipboard, LineChart, Calculator, X, Move } from 'lucide-react';
import PlantSelection from './components/PlantSelection';
import SystemGuide from './components/SystemGuide';
import NutrientManagement from './components/NutrientManagement';
import GrowthTimeline from './components/GrowthTimeline';
import MaintenanceChecklist from './components/MaintenanceChecklist';
import PlantGrowthTracker from './components/PlantGrowthTracker';
import NutrientCalculator from './components/NutrientCalculator';
import useLocalStorage from './hooks/useLocalStorage';

export interface PlantSystemPair {
  id: string;
  plant: string;
  system: string;
}

interface DraggablePairProps {
  pair: PlantSystemPair;
  index: number;
  movePair: (dragIndex: number, hoverIndex: number) => void;
  removePair: (id: string) => void;
}

interface DragItem {
  index: number;
  type: string;
}

const DraggablePair: React.FC<DraggablePairProps> = ({ pair, index, movePair, removePair }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'pair',
    item: { index, type: 'pair' },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: 'pair',
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!monitor.isOver({ shallow: true })) {
        return;
      }
      if (item.index !== index) {
        movePair(item.index, index);
        item.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div 
      ref={(node) => drag(drop(node))} 
      style={{ opacity }} 
      className="flex items-center justify-between bg-green-100 p-2 mb-2 rounded shadow"
    >
      <Move className="mr-2 cursor-move text-green-700" size={16} />
      <span className="text-green-800 flex-grow">
        {pair.plant} {pair.system ? `in ${pair.system}` : ''}
      </span>
      <button 
        onClick={() => removePair(pair.id)}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        <X size={16} />
      </button>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('plants');
  const [selectedPairs, setSelectedPairs] = useLocalStorage<PlantSystemPair[]>('selectedPairs', []);

  const addPair = (plant: string, system: string) => {
    const newPair: PlantSystemPair = {
      id: Date.now().toString(),
      plant,
      system,
    };
    setSelectedPairs(prev => [...prev, newPair]);
  };

  const removePair = (id: string) => {
    setSelectedPairs(prev => prev.filter(pair => pair.id !== id));
  };

  const movePair = (dragIndex: number, hoverIndex: number) => {
    const dragPair = selectedPairs[dragIndex];
    setSelectedPairs(prevPairs => {
      const newPairs = [...prevPairs];
      newPairs.splice(dragIndex, 1);
      newPairs.splice(hoverIndex, 0, dragPair);
      return newPairs;
    });
  };

  const updatePairSystem = (system: string) => {
    setSelectedPairs(prev => {
      const lastPair = prev[prev.length - 1];
      if (lastPair && !lastPair.system) {
        const updatedPairs = [...prev];
        updatedPairs[updatedPairs.length - 1] = { ...lastPair, system };
        return updatedPairs;
      }
      return [...prev, { id: Date.now().toString(), plant: '', system }];
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-green-50">
        <header className="bg-green-600 text-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center">
              <Sprout className="mr-2" /> Hydroponic Home Gardener
            </h1>
            <div className="text-sm">
              <p>Jakarta, Indonesia</p>
              {selectedPairs.length > 0 && (
                <div className="mt-1">
                  {selectedPairs.map((pair, index) => (
                    <DraggablePair
                      key={pair.id}
                      pair={pair}
                      index={index}
                      movePair={movePair}
                      removePair={removePair}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="container mx-auto p-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <nav className="flex mb-6 flex-wrap">
              {['plants', 'systems', 'nutrients', 'timeline', 'checklist', 'growth-tracker', 'nutrient-calculator'].map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 py-2 px-4 ${
                    activeTab === tab ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'plants' && <Sprout className="inline mr-2" />}
                  {tab === 'systems' && <Droplet className="inline mr-2" />}
                  {tab === 'nutrients' && <Sun className="inline mr-2" />}
                  {tab === 'timeline' && <Thermometer className="inline mr-2" />}
                  {tab === 'checklist' && <Clipboard className="inline mr-2" />}
                  {tab === 'growth-tracker' && <LineChart className="inline mr-2" />}
                  {tab === 'nutrient-calculator' && <Calculator className="inline mr-2" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                </button>
              ))}
            </nav>

            {activeTab === 'plants' && <PlantSelection onSelectPlant={(plant) => addPair(plant, '')} />}
            {activeTab === 'systems' && <SystemGuide onSelectSystem={updatePairSystem} />}
            {activeTab === 'nutrients' && <NutrientManagement />}
            {activeTab === 'timeline' && <GrowthTimeline />}
            {activeTab === 'checklist' && (
              <MaintenanceChecklist selectedPairs={selectedPairs} />
            )}
            {activeTab === 'growth-tracker' && (
              <PlantGrowthTracker selectedPairs={selectedPairs} />
            )}
            {activeTab === 'nutrient-calculator' && (
              <NutrientCalculator selectedPairs={selectedPairs} />
            )}
          </div>
        </main>

        <footer className="bg-green-600 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Hydroponic Home Gardener. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </DndProvider>
  );
}

export default App;

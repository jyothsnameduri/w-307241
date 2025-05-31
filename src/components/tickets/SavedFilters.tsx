
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Save, Star, Trash2, Filter } from 'lucide-react';

interface SavedFilter {
  id: string;
  name: string;
  filters: Record<string, any>;
  isDefault: boolean;
  createdAt: Date;
}

interface SavedFiltersProps {
  currentFilters: Record<string, any>;
  onApplyFilter: (filters: Record<string, any>) => void;
}

const SavedFilters: React.FC<SavedFiltersProps> = ({ currentFilters, onApplyFilter }) => {
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([
    {
      id: '1',
      name: 'High Priority IT Issues',
      filters: { status: 'open', priority: 'high', category: 'IT' },
      isDefault: false,
      createdAt: new Date('2024-01-10')
    },
    {
      id: '2', 
      name: 'My Assigned Tickets',
      filters: { assignee: 'current-user', status: 'in-progress' },
      isDefault: true,
      createdAt: new Date('2024-01-05')
    }
  ]);
  const [newFilterName, setNewFilterName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const saveCurrentFilter = () => {
    if (!newFilterName.trim()) return;

    const newFilter: SavedFilter = {
      id: Date.now().toString(),
      name: newFilterName,
      filters: currentFilters,
      isDefault: false,
      createdAt: new Date()
    };

    setSavedFilters(prev => [...prev, newFilter]);
    setNewFilterName('');
    setShowSaveDialog(false);
  };

  const deleteFilter = (filterId: string) => {
    setSavedFilters(prev => prev.filter(f => f.id !== filterId));
  };

  const toggleDefault = (filterId: string) => {
    setSavedFilters(prev => prev.map(f => ({
      ...f,
      isDefault: f.id === filterId ? !f.isDefault : false
    })));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm">Saved Filters</h4>
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Save className="h-3 w-3 mr-1" />
              Save
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Current Filter</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Filter name..."
                value={newFilterName}
                onChange={(e) => setNewFilterName(e.target.value)}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={saveCurrentFilter} disabled={!newFilterName.trim()}>
                  Save Filter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-1">
        {savedFilters.map((filter) => (
          <div
            key={filter.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 group"
          >
            <button
              onClick={() => onApplyFilter(filter.filters)}
              className="flex items-center space-x-2 flex-1 text-left"
            >
              <Filter className="h-3 w-3 text-gray-400" />
              <span className="text-sm">{filter.name}</span>
              {filter.isDefault && (
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
              )}
            </button>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleDefault(filter.id)}
                className="h-6 w-6 p-0"
              >
                <Star className={`h-3 w-3 ${filter.isDefault ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteFilter(filter.id)}
                className="h-6 w-6 p-0 text-red-500"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedFilters;

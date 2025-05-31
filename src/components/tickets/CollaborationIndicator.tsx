
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit3 } from 'lucide-react';

interface ActiveUser {
  id: string;
  name: string;
  avatar?: string;
  action: 'viewing' | 'editing';
  timestamp: Date;
}

interface CollaborationIndicatorProps {
  activeUsers: ActiveUser[];
  currentUserId: string;
}

const CollaborationIndicator: React.FC<CollaborationIndicatorProps> = ({ 
  activeUsers, 
  currentUserId 
}) => {
  const otherUsers = activeUsers.filter(user => user.id !== currentUserId);
  
  if (otherUsers.length === 0) return null;

  return (
    <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex -space-x-2">
        {otherUsers.slice(0, 3).map((user) => (
          <div key={user.id} className="relative">
            <Avatar className="h-6 w-6 border-2 border-white">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-xs">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -top-1 -right-1">
              {user.action === 'editing' ? (
                <Edit3 className="h-3 w-3 text-orange-500" />
              ) : (
                <Eye className="h-3 w-3 text-blue-500" />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="text-sm text-blue-700">
        {otherUsers.length === 1 ? (
          <span>{otherUsers[0].name} is {otherUsers[0].action === 'editing' ? 'editing' : 'viewing'}</span>
        ) : (
          <span>{otherUsers.length} others are active</span>
        )}
      </div>
    </div>
  );
};

export default CollaborationIndicator;

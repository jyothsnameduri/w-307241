import React, { useState } from 'react';
import { Search, Filter, Mail, Phone, MessageSquare, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  department: 'IT' | 'HR' | 'Admin' | 'General';
  role: 'Employee' | 'Agent' | 'Admin';
  phone?: string;
  isActive: boolean;
  lastActive: Date;
}

const UserDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  // Mock user data
  const users: UserProfile[] = [
    {
      id: '1',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      department: 'IT',
      role: 'Admin',
      phone: '+1 (555) 123-4567',
      isActive: true,
      lastActive: new Date()
    },
    {
      id: '2',
      name: 'John Smith',
      email: 'john.smith@company.com',
      department: 'HR',
      role: 'Agent',
      phone: '+1 (555) 234-5678',
      isActive: true,
      lastActive: new Date(Date.now() - 3600000)
    },
    {
      id: '3',
      name: 'Emily Johnson',
      email: 'emily.johnson@company.com',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face',
      department: 'Admin',
      role: 'Employee',
      phone: '+1 (555) 345-6789',
      isActive: false,
      lastActive: new Date(Date.now() - 86400000)
    },
    {
      id: '4',
      name: 'Michael Brown',
      email: 'michael.brown@company.com',
      department: 'IT',
      role: 'Agent',
      phone: '+1 (555) 456-7890',
      isActive: true,
      lastActive: new Date(Date.now() - 7200000)
    },
    {
      id: '5',
      name: 'Lisa Davis',
      email: 'lisa.davis@company.com',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face',
      department: 'General',
      role: 'Employee',
      phone: '+1 (555) 567-8901',
      isActive: true,
      lastActive: new Date(Date.now() - 1800000)
    }
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Agent': return 'bg-blue-100 text-blue-800';
      case 'Employee': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'IT': return 'bg-purple-100 text-purple-800';
      case 'HR': return 'bg-pink-100 text-pink-800';
      case 'Admin': return 'bg-orange-100 text-orange-800';
      case 'General': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-frappe-dark">User Directory</h1>
        <Button className="bg-frappe-primary hover:bg-frappe-primary/90">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Agent">Agent</SelectItem>
                  <SelectItem value="Employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:frappe-shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-frappe-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    user.isActive ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-frappe-dark truncate">{user.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{user.email}</p>
                  
                  <div className="flex gap-2 mt-2">
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {user.role}
                    </Badge>
                    <Badge className={getDepartmentColor(user.department)}>
                      {user.department}
                    </Badge>
                  </div>
                  
                  {user.phone && (
                    <p className="text-xs text-gray-500 mt-1">{user.phone}</p>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-1">
                    Last active {formatLastActive(user.lastActive)}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1">
                  <Mail className="h-3 w-3 mr-1" />
                  Email
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Message
                </Button>
                {user.phone && (
                  <Button size="sm" variant="outline">
                    <Phone className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserDirectory;

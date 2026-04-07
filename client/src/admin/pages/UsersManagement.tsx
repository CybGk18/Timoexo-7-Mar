// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from '@/components/ui/checkbox';
// import { 
//   Users,
//   UserPlus,
//   Edit,
//   Trash2,
//   X
// } from 'lucide-react';
// import { toast } from 'sonner';
// import { useAdminAuth } from '../contexts/AdminAuthContext';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// interface User {
//   id: number;
//   username: string;
//   email: string;
//   role: string;
//   permissions: string[];
//   status: string;
//   last_login: string | null;
//   created_at: string;
// }

// const AVAILABLE_MODULES = [
//   { id: 'dashboard', label: 'Dashboard' },
//   { id: 'content', label: 'All Content' },
//   { id: 'comments', label: 'Comments' },
//   { id: 'inquiries', label: 'Inquiries' },
//   { id: 'gallery', label: 'Gallery' },
//   { id: 'media', label: 'Media Library' },
//   { id: 'settings', label: 'Settings' }
// ];

// export const UsersManagement = () => {
//   const { isSuperAdmin } = useAdminAuth();
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [editingUser, setEditingUser] = useState<User | null>(null);
//   const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'user',
//     status: 'active',
//     permissions: [] as string[]
//   });

//   useEffect(() => {
//     if (!isSuperAdmin()) {
//       toast.error('Access denied. Super admin only.');
//       return;
//     }
//     loadUsers();
//   }, []);

//   const loadUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('/server/users-admin.php?action=list', {
//         credentials: 'include'
//       });
//       const result = await response.json();
      
//       if (result.success) {
//         setUsers(result.data);
//       } else {
//         toast.error('Failed to load users');
//       }
//     } catch (error) {
//       toast.error('Error loading users');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       const url = editingUser 
//         ? '/server/users-admin.php'
//         : '/server/users-admin.php';
      
//       const method = editingUser ? 'PUT' : 'POST';
      
//       const payload = editingUser
//         ? { id: editingUser.id, ...formData }
//         : formData;

//       const response = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify(payload)
//       });

//       const result = await response.json();
      
//       if (result.success) {
//         toast.success(editingUser ? 'User updated successfully' : 'User created successfully');
//         setShowModal(false);
//         resetForm();
//         loadUsers();
//       } else {
//         toast.error(result.message || 'Operation failed');
//       }
//     } catch (error) {
//       toast.error('Error saving user');
//       console.error(error);
//     }
//   };

//   const handleDelete = async () => {
//     if (!deleteUserId) return;

//     try {
//       const response = await fetch('/server/users-admin.php', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ id: deleteUserId })
//       });

//       const result = await response.json();
      
//       if (result.success) {
//         toast.success('User deleted successfully');
//         setDeleteUserId(null);
//         loadUsers();
//       } else {
//         toast.error(result.message || 'Failed to delete user');
//       }
//     } catch (error) {
//       toast.error('Error deleting user');
//       console.error(error);
//     }
//   };

//   const openEditModal = (user: User) => {
//     setEditingUser(user);
//     setFormData({
//       username: user.username,
//       email: user.email,
//       password: '',
//       role: user.role,
//       status: user.status,
//       permissions: user.permissions || []
//     });
//     setShowModal(true);
//   };

//   const openCreateModal = () => {
//     resetForm();
//     setShowModal(true);
//   };

//   const resetForm = () => {
//     setEditingUser(null);
//     setFormData({
//       username: '',
//       email: '',
//       password: '',
//       role: 'user',
//       status: 'active',
//       permissions: []
//     });
//   };

//   const togglePermission = (moduleId: string) => {
//     setFormData(prev => ({
//       ...prev,
//       permissions: prev.permissions.includes(moduleId)
//         ? prev.permissions.filter(p => p !== moduleId)
//         : [...prev.permissions, moduleId]
//     }));
//   };

//   if (!isSuperAdmin()) {
//     return (
//       <div className="p-6">
//         <Card>
//           <CardContent className="p-12 text-center">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
//             <p className="text-gray-600">You do not have permission to access user management.</p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
//           <p className="text-gray-500 mt-1">Manage admin users and their permissions</p>
//         </div>
//         <Button onClick={openCreateModal} className="flex items-center gap-2">
//           <UserPlus className="h-4 w-4" />
//           Create User
//         </Button>
//       </div>

//       {loading ? (
//         <div className="text-center py-12">Loading users...</div>
//       ) : (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Users className="h-5 w-5" />
//               All Users
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-0">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50 border-b">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {users.map((user) => (
//                     <tr key={user.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.username}</td>
//                       <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
//                       <td className="px-6 py-4 text-sm">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           user.role === 'super_admin' 
//                             ? 'bg-purple-100 text-purple-700'
//                             : 'bg-blue-100 text-blue-700'
//                         }`}>
//                           {user.role}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           user.status === 'active' 
//                             ? 'bg-green-100 text-green-700'
//                             : 'bg-red-100 text-red-700'
//                         }`}>
//                           {user.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600">
//                         {user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-right space-x-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => openEditModal(user)}
//                           className="inline-flex items-center gap-1"
//                         >
//                           <Edit className="h-3 w-3" />
//                           Edit
//                         </Button>
//                         <Button
//                           variant="destructive"
//                           size="sm"
//                           onClick={() => setDeleteUserId(user.id)}
//                           className="inline-flex items-center gap-1"
//                         >
//                           <Trash2 className="h-3 w-3" />
//                           Delete
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <CardHeader className="flex flex-row items-center justify-between">
//               <CardTitle>{editingUser ? 'Edit User' : 'Create New User'}</CardTitle>
//               <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
//                 <X className="h-4 w-4" />
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <Label htmlFor="username">Username</Label>
//                   <Input
//                     id="username"
//                     value={formData.username}
//                     onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="password">Password {editingUser && '(leave blank to keep current)'}</Label>
//                   <Input
//                     id="password"
//                     type="password"
//                     value={formData.password}
//                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                     required={!editingUser}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="role">Role</Label>
//                   <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent className="bg-white">
//                       <SelectItem value="user">User</SelectItem>
//                       <SelectItem value="admin">Admin</SelectItem>
//                       <SelectItem value="super_admin">Super Admin</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label htmlFor="status">Status</Label>
//                   <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent className="bg-white">
//                       <SelectItem value="active">Active</SelectItem>
//                       <SelectItem value="disabled">Disabled</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label className="mb-3 block">Permissions (Modules Access)</Label>
//                   <div className="grid grid-cols-2 gap-3 p-4 border rounded-lg">
//                     {AVAILABLE_MODULES.map((module) => (
//                       <div key={module.id} className="flex items-center space-x-2">
//                         <Checkbox
//                           id={module.id}
//                           checked={formData.permissions.includes(module.id)}
//                           onCheckedChange={() => togglePermission(module.id)}
//                         />
//                         <label
//                           htmlFor={module.id}
//                           className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                         >
//                           {module.label}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                   <p className="text-xs text-gray-500 mt-2">
//                     Note: Super admins have access to all modules regardless of permissions.
//                   </p>
//                 </div>

//                 <div className="flex gap-2 justify-end pt-4">
//                   <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
//                     Cancel
//                   </Button>
//                   <Button type="submit">
//                     {editingUser ? 'Update User' : 'Create User'}
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       <AlertDialog open={deleteUserId !== null} onOpenChange={() => setDeleteUserId(null)}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete this user account.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Users,
  UserPlus,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useAdminAuth } from "../contexts/AdminAuthContext";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  permissions: string[];
  status: string;
  last_login: string | null;
  created_at: string;
}

const AVAILABLE_MODULES = [
  { id: "dashboard", label: "Dashboard" },
  { id: "content", label: "All Content" },
  { id: "comments", label: "Comments" },
  { id: "inquiries", label: "Inquiries" },
  { id: "gallery", label: "Gallery" },
  { id: "media", label: "Media Library" },
  { id: "settings", label: "Settings" },
];

export const UsersManagement = () => {
  const { isSuperAdmin } = useAdminAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    status: "active",
    permissions: [] as string[],
  });

  // LOAD USERS
  useEffect(() => {
    if (!isSuperAdmin()) {
      toast.error("Access denied. Super admin only.");
      return;
    }
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/server/users-admin.php?action=list", {
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        setUsers(result.data);
      } else {
        toast.error("Failed to load users");
      }
    } catch (error) {
      toast.error("Error loading users");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = "/server/users-admin.php";
      const method = editingUser ? "PUT" : "POST";
      const payload = editingUser ? { id: editingUser.id, ...formData } : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(editingUser ? "User updated" : "User created");
        setShowModal(false);
        resetForm();
        loadUsers();
      } else {
        toast.error(result.message || "Operation failed");
      }
    } catch (error) {
      toast.error("Error saving user");
    }
  };

  const handleDelete = async () => {
    if (!deleteUserId) return;

    try {
      const response = await fetch("/server/users-admin.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: deleteUserId }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("User deleted");
        setDeleteUserId(null);
        loadUsers();
      } else {
        toast.error(result.message || "Failed to delete user");
      }
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  const resetForm = () => {
    setEditingUser(null);
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "user",
      status: "active",
      permissions: [],
    });
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
      status: user.status,
      permissions: user.permissions || [],
    });
    setShowModal(true);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const togglePermission = (moduleId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(moduleId)
        ? prev.permissions.filter((p) => p !== moduleId)
        : [...prev.permissions, moduleId],
    }));
  };

  if (!isSuperAdmin()) {
    return (
      <div className="p-6">
        <Card className="shadow-sm border border-gray-200 rounded-xl">
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">You do not have permission.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-500 mt-1">Manage admin users & permissions</p>
        </div>

        <Button
          onClick={openCreateModal}
          className="bg-primary text-white hover:bg-primary-hover rounded-lg shadow-sm"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Create User
        </Button>
      </div>

      {/* USERS TABLE */}
      {loading ? (
        <div className="text-center py-12">Loading users...</div>
      ) : (
        <Card className="border border-gray-200 rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Users className="h-5 w-5 text-primary" />
              All Users
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-700">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium uppercase text-xs text-gray-500">Username</th>
                    <th className="px-6 py-3 text-left font-medium uppercase text-xs text-gray-500">Email</th>
                    <th className="px-6 py-3 text-left font-medium uppercase text-xs text-gray-500">Role</th>
                    <th className="px-6 py-3 text-left font-medium uppercase text-xs text-gray-500">Status</th>
                    <th className="px-6 py-3 text-left font-medium uppercase text-xs text-gray-500">Last Login</th>
                    <th className="px-6 py-3 text-right font-medium uppercase text-xs text-gray-500">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{user.username}</td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium
                            ${
                              user.role === "super_admin"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium
                            ${
                              user.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {user.last_login ? new Date(user.last_login).toLocaleString() : "Never"}
                      </td>

                      <td className="px-6 py-4 text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(user)}
                          className="text-gray-700 border-gray-300 hover:bg-gray-100"
                        >
                          <Edit className="h-3 w-3 mr-1" /> Edit
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteUserId(user.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Trash2 className="h-3 w-3 mr-1" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl rounded-xl shadow-md border border-gray-200 max-h-[90vh] overflow-y-auto bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-900">
                {editingUser ? "Edit User" : "Create New User"}
              </CardTitle>

              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                <X className="h-4 w-4 text-gray-500" />
              </Button>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div>
                  <Label>Username</Label>
                  <Input
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <Label>
                    Password {editingUser && <span className="text-gray-400">(leave blank to keep)</span>}
                  </Label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="mt-1"
                    required={!editingUser}
                  />
                </div>

                {/* Role */}
                <div>
                  <Label>Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger className="mt-1 border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div>
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="mt-1 border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Permissions */}
                <div>
                  <Label>Permissions (Modules Access)</Label>

                  <div className="grid grid-cols-2 gap-3 p-4 mt-2 border border-gray-200 rounded-lg">
                    {AVAILABLE_MODULES.map((module) => (
                      <label key={module.id} className="flex items-center gap-2 text-gray-700">
                        <Checkbox
                          checked={formData.permissions.includes(module.id)}
                          onCheckedChange={() => togglePermission(module.id)}
                        />
                        {module.label}
                      </label>
                    ))}
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Note: Super admins automatically access all modules.
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                    className="border-gray-300 hover:bg-gray-100"
                  >
                    Cancel
                  </Button>

                  <Button className="bg-primary text-white hover:bg-primary-hover">
                    {editingUser ? "Update User" : "Create User"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      <AlertDialog open={deleteUserId !== null} onOpenChange={() => setDeleteUserId(null)}>
        <AlertDialogContent className="rounded-xl border border-gray-200 shadow-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              This action cannot be undone. This will permanently delete the user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 hover:bg-gray-100">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

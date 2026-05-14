import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAdminsThunk, 
  deleteAdminThunk, 
  toggleAdminStatusThunk,
  clearMessages 
} from '../store/adminManagementSlice';
import AdminTable from '../components/AdminTable';
import AddAdminModal from '../components/AddAdminModal';
import EditAdminModal from '../components/EditAdminModal';
import ViewAdminModal from '../components/ViewAdminModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { toast } from 'react-hot-toast';

export default function AdminListPage() {
  const dispatch = useDispatch();
  const { admins, isLoading, error, successMessage } = useSelector(state => state.adminManagement);
  const { user } = useSelector(state => state.auth);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingAdmin, setViewingAdmin] = useState(null);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchAdminsThunk({ search: searchTerm, role: roleFilter }));
  }, [dispatch, searchTerm, roleFilter]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessages());
    }
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
  }, [successMessage, error, dispatch]);

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const handleView = (admin) => {
    setViewingAdmin(admin);
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
  };

  const confirmDelete = () => {
    dispatch(deleteAdminThunk(deleteId));
    setDeleteId(null);
  };

  const handleToggleStatus = (id) => {
    dispatch(toggleAdminStatusThunk(id));
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">Admin Management</h1>
          <p className="text-on-surface-variant mt-1">Manage platform administrators and permissions.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          Create New Admin
        </button>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">search</span>
          <input 
            type="text" 
            placeholder="Search by name or email..."
            className="w-full pl-12 pr-4 py-3 bg-surface-container-high rounded-xl border-none focus:ring-2 focus:ring-primary transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="px-4 py-3 bg-surface-container-high rounded-xl border-none focus:ring-2 focus:ring-primary transition-all outline-none"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="super_admin">Super Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* Admin Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden border border-outline-variant/10">
        <AdminTable 
          admins={admins} 
          isLoading={isLoading} 
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          onView={handleView}
          onEdit={handleEdit}
          currentUserId={user?.id}
        />
      </div>

      {isAddModalOpen && (
        <AddAdminModal onClose={() => setIsAddModalOpen(false)} />
      )}

      {editingAdmin && (
        <EditAdminModal 
          admin={editingAdmin} 
          onClose={() => setEditingAdmin(null)} 
        />
      )}

      {viewingAdmin && (
        <ViewAdminModal 
          admin={viewingAdmin} 
          onClose={() => setViewingAdmin(null)} 
        />
      )}

      {deleteId && (
        <DeleteConfirmModal 
          adminName={admins.find(a => a._id === deleteId)?.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

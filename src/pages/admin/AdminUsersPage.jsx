import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { ADMIN_USERS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/Modal';

const ROLE_MAP = { student: 'طالب', instructor: 'مدرس', admin: 'مشرف' };

const AdminUsersPage = () => {
  const { addToast } = useApp();
  const [users, setUsers] = useState(ADMIN_USERS);
  const [search, setSearch] = useState('');
  const [deleteModal, setDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  const filtered = users.filter(u =>
    u.name.includes(search) || u.email.includes(search) || u.college?.includes(search)
  );

  const handleDelete = async () => {
    setDeleting(true);
    await new Promise(r => setTimeout(r, 800));
    setUsers(us => us.filter(u => u.id !== deleteModal.id));
    setDeleting(false);
    setDeleteModal(null);
    addToast('تم حذف المستخدم بنجاح', 'success');
  };

  const handleToggleStatus = (id) => {
    setUsers(us => us.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'disabled' : 'active' } : u));
    addToast('تم تحديث حالة المستخدم', 'info');
  };

  const handleSaveEdit = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setEditModal(null);
    addToast('تم تحديث بيانات المستخدم', 'success');
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">إدارة المستخدمين</h1>
          <button className="btn-primary text-sm" onClick={() => addToast('ميزة إضافة مستخدم ستكون متاحة قريباً', 'info')}>
            <i className="fa-solid fa-user-plus ml-1" /> إضافة مستخدم
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input-field pr-11" placeholder="ابحث بالاسم أو الإيميل أو الكلية..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>المستخدم</th>
                  <th>البريد الإلكتروني</th>
                  <th>الدور</th>
                  <th>الكلية</th>
                  <th>الحالة</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} className={u.status === 'disabled' ? 'opacity-50' : ''}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">{u.name}</span>
                      </div>
                    </td>
                    <td className="text-gray-500">{u.email}</td>
                    <td>
                      <span className={u.role === 'admin' ? 'badge-danger' : u.role === 'instructor' ? 'badge-warning' : 'badge-primary'}>
                        {ROLE_MAP[u.role]}
                      </span>
                    </td>
                    <td className="text-gray-500 text-sm">{u.college}</td>
                    <td>
                      <span className={u.status === 'active' ? 'badge-success' : 'badge-gray'}>
                        {u.status === 'active' ? 'نشط' : 'معطّل'}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button onClick={() => setEditModal({ ...u })} className="w-8 h-8 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 text-primary-600 flex items-center justify-center transition-colors" title="تعديل">
                          <i className="fa-solid fa-pen text-xs" />
                        </button>
                        <button onClick={() => handleToggleStatus(u.id)} className="w-8 h-8 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-yellow-600 flex items-center justify-center transition-colors" title={u.status === 'active' ? 'تعطيل' : 'تفعيل'}>
                          <i className={`fa-solid ${u.status === 'active' ? 'fa-ban' : 'fa-check'} text-xs`} />
                        </button>
                        <button onClick={() => setDeleteModal(u)} className="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 flex items-center justify-center transition-colors" title="حذف">
                          <i className="fa-solid fa-trash text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-100 dark:border-dark-border text-sm text-gray-400">
            عرض {filtered.length} من أصل {users.length} مستخدم
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={!!editModal} onClose={() => setEditModal(null)} title="تعديل بيانات المستخدم" size="md">
        {editModal && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="input-label">الاسم</label>
                <input className="input-field" value={editModal.name} onChange={e => setEditModal(m => ({ ...m, name: e.target.value }))} />
              </div>
              <div>
                <label className="input-label">البريد الإلكتروني</label>
                <input type="email" className="input-field" value={editModal.email} onChange={e => setEditModal(m => ({ ...m, email: e.target.value }))} />
              </div>
              <div>
                <label className="input-label">الدور</label>
                <select className="input-field" value={editModal.role} onChange={e => setEditModal(m => ({ ...m, role: e.target.value }))}>
                  <option value="student">طالب</option>
                  <option value="instructor">مدرس</option>
                  <option value="admin">مشرف</option>
                </select>
              </div>
              <div>
                <label className="input-label">الكلية</label>
                <input className="input-field" value={editModal.college} onChange={e => setEditModal(m => ({ ...m, college: e.target.value }))} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setEditModal(null)} className="flex-1 btn-outline">إلغاء</button>
              <button onClick={handleSaveEdit} disabled={saving} className="flex-1 btn-primary justify-center">
                {saving ? <i className="fa-solid fa-spinner fa-spin" /> : <><i className="fa-solid fa-check ml-1" />حفظ</>}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="حذف المستخدم"
        message={`هل أنت متأكد من حذف "${deleteModal?.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
      />
    </DashboardLayout>
  );
};

export default AdminUsersPage;

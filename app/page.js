'use client';
import { useEffect, useState } from 'react';
import UserTable from '@/components/UserTable';
import UserModal from '@/components/UserModal';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">DATA</h1>
        <Button onClick={() => { setEditData(null); setShowModal(true); }}>+ Add New</Button>
      </div>
      <UserTable data={users} onEdit={setEditData} onRefresh={fetchUsers} onOpenModal={() => setShowModal(true)} />
      {showModal && (
        <UserModal
          data={editData}
          onClose={() => setShowModal(false)}
          onSaved={fetchUsers}
        />
      )}
    </main>
  );
}

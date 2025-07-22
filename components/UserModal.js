import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

export default function UserModal({ data, onClose, onSaved }) {
  const [form, setForm] = useState(data || { username: '', password: '', email: '' });

  const handleSubmit = async () => {
    const method = data ? 'PUT' : 'POST';
    const endpoint = data ? `/api/users/${data.id}` : `/api/users`;

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    onSaved();
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="backdrop-blur-md">
        <DialogHeader>
          <DialogTitle>{data ? 'Edit' : 'Add'} User</DialogTitle>
        </DialogHeader>
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex flex-col gap-4">
          <input value={form.Username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="Username" className="border p-2 rounded" />
          <input value={form.Email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className="border p-2 rounded" />
          <input value={form.Password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" className="border p-2 rounded" />
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>{data ? 'Update' : 'Add'}</Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";

export default function UserTable({ data, onEdit, onOpenModal, onRefresh }) {
  const handleDelete = async (id) => {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    onRefresh();
  };

  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th>#</th>
          <th className="text-left p-2">Username</th>
          <th className="text-left p-2">Password</th>
          <th className="text-left p-2">Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, i) => (
          <tr key={user.ID} className="border-t text-sm">
            <td className="text-center p-2">{i + 1}</td>
            <td className="text-left p-2">{user.Username}</td>
            <td className="text-left p-2">{user.Password}</td>
            <td className="text-left p-2">{user.Email}</td>
            <td className="flex gap-2 py-2 justify-center">
              <Button onClick={() => { onEdit(user); onOpenModal(); }} className="bg-green-500 hover:bg-green-600">Edit</Button>
              <Button onClick={() => handleDelete(user.ID)} className="bg-red-500 hover:bg-red-600">Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

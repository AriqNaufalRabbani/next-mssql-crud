'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [editId, setEditId] = useState(null)

  const fetchItems = async () => {
    const res = await fetch('/api/items')
    const data = await res.json()
    setItems(data)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = JSON.stringify({ id: editId, name, quantity })
    await fetch('/api/items', {
      method: editId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
    setName('')
    setQuantity(0)
    setEditId(null)
    fetchItems()
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setName(item.name)
    setQuantity(item.quantity)
  }

  const handleDelete = async (id) => {
    await fetch('/api/items', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchItems()
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD Items (MSSQL)</h1>
      <form onSubmit={handleSubmit} className="space-y-2 mb-4">
        <input
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          className="border p-2 w-full"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Quantity"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          {editId ? 'Update' : 'Add'}
        </button>
      </form>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(item)} className="text-blue-600">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

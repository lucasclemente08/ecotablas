import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db} from '../../firebase/firebase'; // Asegúrate de tener configurado Firebase en un archivo firebase.js
import TableComponent from '../../components/TableComponent';// Tu componente de tabla personalizado

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'usuarios');
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [db]);

  // Update user role in Firestore
  const updateRole = async (userId, newRole) => {
    try {
      const userRef = doc(db, 'usuarios', userId);
      await updateDoc(userRef, { role: newRole });
      setUsers(prevUsers => prevUsers.map(user => user.id === userId ? { ...user, role: newRole } : user));
      alert('Role updated successfully!');
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };


  // Delete user from Firestore
  const deleteUser = async (userId) => {
    try {
      const userRef = doc(db, 'usuario', userId);
      await deleteDoc(userRef);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const titles = [

    { key: 'correo', label: 'Correo     ' },
    { key: 'role', label: 'Role', type: 'text',hasActions:true },
    
  ];

  const getByMail = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const filteredUsers = users.filter(user => users.correo.includes(value));
    setUsers(filteredUsers);
  };


  const actions = [
  
    {
      label: 'Delete',
      render: (user) => (
<div className=" flex justify-center">

<select
          className="border rounded px-2 py-1"
          value={user.role}
          onChange={(e) => updateRole(user.id, e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
        
        <button
         className="ml-2 bg-red-700 flex hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => deleteUser(user.id)}
        >
          Delete
        </button>
</div>
      )
    }
  ];
  return (
    <div className="p-8">
      <h1 className="text-2xl text-white font-bold mb-6">Admin Panel</h1>


      <form onSubmit={getByMail} className="mb-4">
        <input
          type="text"
          name="email"
          placeholder="Buscar por mail"
          className="border rounded px-4 py-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
         Buscar
        </button>
      </form>
      <TableComponent
        data={users}
        titles={titles}
        actions={actions}
        itemsPerPage={5}
        isLoading={loading}
      />
    </div>
  );
};

export default Admin;

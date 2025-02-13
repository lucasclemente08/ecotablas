import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs,getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase'; // Configuración de Firebase
import TableComponent from '../../components/TableComponent'; // Tu componente de tabla personalizado

import "react-toastify/dist/ReactToastify.css";
import { RoleProvider } from '../../context/RoleContext';
import { Toaster, toast } from 'sonner';
const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState({});
  const [currentUserRole, setCurrentUserRole] = useState('admin'); // Simula el rol actual del usuario

  // Definir permisos predeterminados por rol
  const defaultRolePermissions = {
    admin: ['create', 'read', 'update', 'delete'],
    superVisor: ['read', 'update'],
    empleado: ['read'],
  };

  // Cargar usuarios y permisos desde Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'usuarios');
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);

        // Simular carga de permisos desde Firestore
        const rolesCollection = collection(db, 'roles');
        const rolesSnapshot = await getDocs(rolesCollection);
        const rolesData = rolesSnapshot.docs.reduce((acc, roleDoc) => {
          acc[roleDoc.id] = roleDoc.data().permissions;
          return acc;
        }, {});
        setPermissions({ ...defaultRolePermissions, ...rolesData });
      } catch (error) {
        toast.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const updatePermissions = async (role, updatedPermissions) => {
    try {
      const roleRef = doc(db, 'roles', role);
  
      // Verificar existencia del documento
      const roleDoc = await getDoc(roleRef);
      if (!roleDoc.exists()) {
        toast.error(`El rol '${role}' no existe en Firestore.`);
        return;
      }
  
      // Actualizar permisos
      await updateDoc(roleRef, { permissions: updatedPermissions });
      setPermissions(prev => ({ ...prev, [role]: updatedPermissions }));
      toast.success('Permisos actualizados correctamente!');
    } catch (error) {
     console.error(`Error al actualizar permisos: ${error.message}`);
    }
  };
  
  // Actualizar rol de usuario
  const updateRole = async (userId, newRole) => {
    try {
      const userRef = doc(db, 'usuarios', userId);
      await updateDoc(userRef, { role: newRole });
      setUsers(prevUsers =>
        prevUsers.map(user => (user.id === userId ? { ...user, role: newRole } : user))
      );
      toast.success('Rol actualizado!');
    } catch (error) {
      toast.error('Error actualizando rol:', error);
    }
  };

  // Eliminar usuario
  const deleteUser = async (userId) => {
    try {
      const userRef = doc(db, 'usuarios', userId);
      await deleteDoc(userRef);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      toast.success('Usuario eliminado exitosamente!');
    } catch (error) {
      toast.error('Error eliminando usuario:', error);
    }
  };

  // Administrar permisos por rol
  const RolePermissionsEditor = ({ role }) => {
    const [rolePermissions, setRolePermissions] = useState(permissions[role] || []);

    const togglePermission = (permission) => {
      setRolePermissions(prev =>
        prev.includes(permission)
          ? prev.filter(p => p !== permission)
          : [...prev, permission]
      );
    };

    const savePermissions = () => updatePermissions(role, rolePermissions);

    return (
      <div className="mb-6 flex flex-row  justify-between rounded-md bg-slate-100 p-2">
        <h3 className="text-xl font-bold mb-4">Editar Permisos para {role}</h3>
        {['create', 'read', 'update', 'delete'].map(permission => (
          <div key={permission}>
            <label>
              <input
                type="checkbox"
                checked={rolePermissions.includes(permission)}
                className='m-1 text-center '
                onChange={() => togglePermission(permission)}
              />
              {permission}
            </label>
          </div>
        ))}
        <button
          onClick={savePermissions}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        >
          Guardar Cambios
        </button>
      </div>
    );
  };

  // Acciones de la tabla
  const actions = [
    {
      label: "Editar",
      allowedRoles: ["admin", ],
      render: (item) => <select
      className="border rounded px-2 py-1"
      value={item.role}
      onChange={(e) => updateRole(item.id, e.target.value)} 
    >
      <option value="admin">Admin</option>
      <option value="supervisor">Supervisor</option>
      <option value="empleado">Empleado</option>
    </select>
    },
    {
      label: "Eliminar",
      allowedRoles: ["admin"],
      render: (item) => <button
       className="ml-2 bg-red-700 flex hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
      onClick={() => deleteUser(item.id)}>Eliminar</button>,
    },
  ];
  
  
  return (
    <RoleProvider role={currentUserRole}>
     <Toaster />

    <div className="p-8">
      <h1 className="text-2xl text-white font-bold mb-6">Admin Panel</h1>


      <TableComponent
        data={users}
        titles={[
          { key: 'correo', label: 'Correo' },
          { key: 'role', label: 'Rol',hasActions: true},
        ]}
        actions={actions}
        itemsPerPage={5}
        isLoading={loading}
       
        />
    </div>
        </RoleProvider>
  );
};

export default Admin;

import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs,getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase'; // Configuración de Firebase
import TableComponent from '../../components/TableComponent'; // Tu componente de tabla personalizado
import SectionLayout from '../../layout/SectionLayout'; // Tu componente de diseño personalizado
import ButtonEdit from '../../components/buttons/ButtonEditPr'; // Tu componente de edición personalizado
import { FiEdit } from 'react-icons/fi'; // Iconos de edición
import "react-toastify/dist/ReactToastify.css";
import { RoleProvider } from '../../context/RoleContext';
import { Toaster, toast } from 'sonner';
const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState({});
  const [currentUserRole, setCurrentUserRole] = useState('admin'); // Simula el rol actual del usuario
const [modalEdit, setModalEdit] = useState(false);
const [confirmModal, setConfirmModal] = useState(false);

const [newRole, setNewRole] = useState('');


const ConfirmRoleUpdate=(user,role)=>{
  setSelectedUser(user);
  console.log(user)
  setNewRole(role);
  setConfirmModal(true);
}


  // Definir permisos predeterminados por rol
  const defaultRolePermissions = {
    admin: ['create', 'read', 'update', 'delete'],
    superVisor: ['read', 'update'],
    empleado: ['read'],
  };

  
  const [selectedUser, setSelectedUser] = useState(null);

  const [formValues, setFormValues] = useState({
    correo: '',
    role: '',
  });
 



const handleChange = (e) => {
  const { name, value } = e.target;
  
  setFormValues((prevState) => ({
    ...prevState,
    [name]: value,
  }));
  
};


const abrirModalEdit = (user) => {
  setSelectedUser(user);
  setFormValues({ 
    correo: user.correo || "", role: user.role || "" }); // ✅ Mantener como objeto
  setModalEdit(true);
};


  const cerrarModalEdit = () => {
    setModalEdit(false);
    setSelectedUser(null);
    setFormValues({});
  };

const handleEditSubmit = async (e) => {
  e.preventDefault();
  try {
    const userRef = doc(db, 'usuarios', selectedUser.id);
    await updateDoc(userRef, { correo: formValues.correo });
    setUsers(prevUsers =>
      prevUsers.map(user => (user.id === selectedUser.id ? { ...user, correo: formValues.correo } : user))
    );

fetchUsers();

    toast.success('Usuario actualizado correctamente!');
  } catch (error) {
    toast.error('Error actualizando usuario:', error);
  } finally {
    cerrarModalEdit();
  }
}




  // Cargar usuarios y permisos desde Firestore

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
    useEffect(() => {
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
    finally{
      setConfirmModal(false);
      setSelectedUser(null);
    }
  };

  const updateRole = async () => {
    try {
      const userRef = doc(db, 'usuarios', selectedUser.id);
      await updateDoc(userRef, { role: newRole });
      setUsers(prevUsers =>
        prevUsers.map(user => (user.id === selectedUser.id ? { ...user, role: newRole } : user))
      );
      toast.success('Rol actualizado!');
    } catch (error) {
      toast.error('Error actualizando rol:', error);
    } finally {
      setConfirmModal(false);
      setSelectedUser(null);
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
      allowedRoles: ["admin"],
      render: (item) => (
        <select
        className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 shadow-sm transition duration-200 ease-in-out hover:bg-gray-100"
        value={item.role}

        onChange={(e) =>ConfirmRoleUpdate(item, e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="supervisor">Supervisor</option>
        <option value="empleado">Empleado</option>
      </select>
      
      ),
    },
    {
      label: "Modificar",
      allowedRoles: ["admin"],
      render: (item) => (
        <button
          className="bg-yellow-600 ml-2 hover:bg-yellow-700 flex justify-center items-center text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => abrirModalEdit(item)}
        >
          <FiEdit className="m-1" />
          Modificar
        </button>
      ),
    },
    {
      label: "Eliminar",
      allowedRoles: ["admin"],
      render: (item) => (
        <button
          className="ml-2 bg-red-700 flex hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => deleteUser(item.id)}
        >
          Eliminar
        </button>
      ),
    },
  ];
  
  const fields = [
    { name: "correo", label: "Correo", type: "email", }, // Solo lectura
 
  ];
 
  return (

    <RoleProvider role={currentUserRole}>
    <SectionLayout title="Gestión de Usuarios">

     <Toaster />
     {confirmModal && (
          <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-5 rounded-lg shadow-lg'>
              <h2 className='text-lg font-bold mb-4'>Confirmar Cambio de Rol</h2>
              <p>¿Estás seguro de que deseas cambiar el rol de {selectedUser?.correo} a {newRole}?</p>
              <div className='flex justify-end mt-4'>
                <button onClick={() => setConfirmModal(false)} className='mr-2 px-4 py-2 bg-gray-500 text-white rounded'>Cancelar</button>
                <button onClick={updateRole} className='px-4 py-2 bg-green-500 text-white rounded'>Confirmar</button>
              </div>
            </div>
          </div>
        )}
    <div className="">

    {modalEdit && selectedUser && (
  <ButtonEdit
    title="Usuario"
    fields={fields} // Asegúrate de definir estos campos
    id={selectedUser.id}
    formValues={formValues}
    handleChange={handleChange}

    handleEditSubmit={handleEditSubmit}
    cerrarModalEdit={cerrarModalEdit}
  />
)}


      <TableComponent
        data={users}
        titles={[
          { key: 'correo', label: 'Correo' },
          { key: 'role', label: 'Rol',hasActions: true},
        ]}
        actions={actions}
        itemsPerPage={5}
        isLoading={loading}
        hasMaterial={true}
        />
    </div>
    </SectionLayout>
        </RoleProvider>
  );
};

export default Admin;

import { useRef, useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { tiposBebida } from "../data/data";
import { FileUpload } from "primereact/fileupload";
import { useNavigate } from "react-router-dom";

export const Formulario = ({ bebida=null}) => {
  const initialState = bebida || {
    nombre: "",
    tipo: "",
    imagen: null,
  };
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const toast = useRef(null);
  const tipos = tiposBebida;

  const onChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const onDropdownChange = (e) => {
    setFormData({ ...formData, tipo: e.value });
  };

  const onImageSelect = (e) => {
    setFormData({ ...formData, imagen: e.files[0] });
    toast.current.show({
      severity: "info",
      summary: "Imagen Seleccionada",
      detail: `${e.files[0].name} fue seleccionada exitosamente.`,
    });
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
  
    setErrors({});  
    const formDataObj = new FormData();
    formDataObj.append('nombre', formData.nombre);
    formDataObj.append('tipo', formData.tipo);
    formDataObj.append('imagen', formData.imagen);
  
    try {
      let url = 'http://127.0.0.1:8000/api/bebidas';
      let method = 'POST';
  
      // Verificar si la bebida existe
      if (bebida && bebida.id) {
        url = `http://127.0.0.1:8000/api/bebidas/${bebida.id}`;
        method = 'PUT';
      }
  
      const response = await fetch(import.meta.env.MODE === 'production' ? url : url, {
        method,
        body: formDataObj
      });
  
      const data = await response.json();

      if (response.ok) {
        toast.current.show({ severity: 'success', summary: method === 'POST' ? 'Bebida Creada' : 'Bebida Actualizada', life: 2000 });
        setFormData(initialState); 
        setTimeout(() => {
          navigate('/')
        }, 2000);
      } 
      else {
        // Manejo de errores de la API
        if (data.errors) {
          const errorMessages = data.errors;
          setErrors(errorMessages);
          Object.values(errorMessages).forEach(error => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
          });
        } 
        else {
          toast.current.show({ severity: 'error', summary: 'Error', detail: `Ocurrió un error al ${method === 'POST' ? 'crear' : 'actualizar'} la bebida`, life: 3000 });
        }
      }
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error de conexión', life: 3000 });
    }
  };

  return (
    <div className="md:w-6/12 p-4 m-auto">
      <form
        className="border border-gray-300 p-4 m-auto md:w-3/4 bg-slate-200 shadow-md"
        onSubmit={onSubmit}
      >
        <h1 className="text-3xl font-bold mb-4 text-center">
          {bebida ? "Editar Bebida" : "Crear Bebida"}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FloatLabel>
            <InputText
              id="nombre"
              value={formData.nombre}
              onChange={onChange}
              className="w-full"
            />
            <label htmlFor="nombre">Nombre</label>
          </FloatLabel>
          <FloatLabel>
            <Dropdown
              id="tipo"
              value={formData.tipo}
              options={tipos}
              onChange={onDropdownChange}
              placeholder="Selecciona un tipo"
              className="w-full m-0"
            />
            <label htmlFor="tipo">Tipo</label>
          </FloatLabel>
          <div>
            <FileUpload
              name="imagen"
              auto
              chooseLabel="Subir Imagen"
              accept="image/*"
              mode="basic"
              onSelect={onImageSelect}
              className="w-full"
            />
          </div>
          <Toast ref={toast} />
          <button
            className="bg-blue-600 text-white rounded-md px-3 py-1 mt-2 md:mt-0 md:ml-2 w-full"
            type="submit"
          >
            {bebida ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

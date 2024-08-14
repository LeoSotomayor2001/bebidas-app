import { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { tiposBebida } from "../data/data";
import { FileUpload } from 'primereact/fileupload';

export const Formulario = () => {
  const initialState={
    nombre: '',
    tipo: '',
    imagen: null
  }
  const [formData, setFormData] = useState(initialState);

  const [errors, setErrors] = useState({});  // Estado para almacenar los errores de la API

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
    setFormData({ ...formData, imagen: e.files[0].name });
    toast.current.show({ severity: 'info', summary: 'Imagen Seleccionada', detail: `${e.files[0].name} fue seleccionada exitosamente.` });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setErrors({});  // Limpiar los errores previos
    try {
      const response = await fetch(import.meta.env.MODE === 'production' ? "" : 'http://127.0.0.1:8000/api/bebidas', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.current.show({ severity: 'success', summary: 'Bebida Creada', life: 3000 });
        setFormData(initialState);  // Resetear el formulario
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
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al crear la bebida', life: 3000 });
        }
      }
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error de conexión', life: 3000 });
    }
  };

  return (
    <div className="md:w-6/12 p-4 m-auto">
      <form className="border border-gray-300 p-4 m-auto w-3/4 bg-slate-200 shadow-md" onSubmit={onSubmit}>
        <h1 className="text-3xl font-bold mb-4 text-center">Crear Bebida</h1>
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <FloatLabel>
              <InputText id="nombre" value={formData.nombre} onChange={onChange} />
              <label htmlFor="nombre">Nombre</label>
            </FloatLabel>
           
          </div>

          <div>
            <FloatLabel>
              <Dropdown id="tipo" value={formData.tipo} options={tipos} onChange={onDropdownChange} placeholder="Selecciona un tipo" />
              <label htmlFor="tipo">Tipo</label>
            </FloatLabel>
          </div>

          <div>
            <FileUpload
              name="imagen"
              auto
              chooseLabel="Subir Imagen"
              accept="image/*"
              mode="basic"
              onSelect={onImageSelect}
            />
          </div>

          <Toast ref={toast} />

          <button className="bg-blue-600 text-white rounded-md px-3 py-1 mt-2 md:mt-0 md:ml-2" type="submit">
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}

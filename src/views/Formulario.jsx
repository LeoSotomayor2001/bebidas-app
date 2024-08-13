import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { tiposBebida } from "../data/data";
import { FileUpload } from 'primereact/fileupload';

export const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    imagen: null,
  });
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
    toast.current.show({ severity: 'info', summary: 'Imagen Seleccionada', detail: `${e.files[0].name} fue seleccionada exitosamente.` });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { nombre, tipo, imagen } = formData;
    if (!nombre) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Debe llenar el campo de nombre', life: 3000 });
        return;
    }

    if (!tipo) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar un tipo', life: 3000 });
        return;
    }

    if (!imagen) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Debe subir una imagen', life: 3000 });
        return;
    }

    toast.current.show({ severity: 'success', summary: 'Bebida Creada', life: 3000 });
  };

  return (
    <div className="md:w-6/12 p-4 m-auto">
      <form className="border border-gray-300 p-4 m-auto w-3/4 bg-slate-200 shadow-md" onSubmit={onSubmit} enctype="multipart/form-data">
        <h1 className="text-3xl font-bold mb-4 text-center">Crear Bebida</h1>
        <div className="grid lg:grid-cols-2 gap-4">
          <FloatLabel>
            <InputText id="nombre" value={formData.nombre} onChange={onChange}/>
            <label htmlFor="nombre">Nombre</label>
          </FloatLabel>

          <FloatLabel>
            <Dropdown id="tipo" value={formData.tipo} options={tipos} onChange={onDropdownChange} placeholder="Selecciona un tipo" />
            <label htmlFor="tipo">Tipo</label>
          </FloatLabel>
          
          <FileUpload 
            name="imagen" 
            auto 
            chooseLabel="Subir Imagen" 
            accept="image/*" 
            mode="basic" 
            onSelect={onImageSelect} 
          />

          <Toast ref={toast} />

          <button className="bg-blue-600 text-white rounded-md px-3 py-1 mt-2 md:mt-0 md:ml-2" type="submit">Crear</button>
        </div>
      </form>
    </div>
  );
}

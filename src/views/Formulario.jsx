
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { tiposBebida } from "../data/data";
import { FileUpload } from "primereact/fileupload";

import { useBebidaForm } from "../hooks/useBebidaForm";

export const Formulario = ({ bebida = null, closeModal=null }) => {
  const {
    formData,
    errors,
    toast,
    onChange,
    onDropdownChange,
    onImageSelect,
    onSubmit,
  } = useBebidaForm(bebida, closeModal);

  const tipos = tiposBebida;
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
              name="nombre"
              onChange={onChange}
              className="w-full"
            />
            <label htmlFor="nombre">Nombre</label>
          </FloatLabel>
          <FloatLabel>
            <Dropdown
              id="tipo"
              value={formData.tipo}
              name="tipo"
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

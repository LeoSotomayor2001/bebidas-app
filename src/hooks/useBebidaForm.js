import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useBebidaForm = (initialBebida = null, closeModal = null) => {
  const initialState = initialBebida || {
    nombre: "",
    tipo: "",
    imagen: null,
  };
  const token= localStorage.getItem('token');

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const toast = useRef(null);

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
    formDataObj.append("nombre", formData.nombre);
    formDataObj.append("tipo", formData.tipo);

    if (formData.imagen) {
      formDataObj.append("imagen", formData.imagen);
    }

    try {
      let url = "http://127.0.0.1:8000/api/bebidas";
      let method = "POST";

      if (initialBebida && initialBebida.id) {
        url = `http://127.0.0.1:8000/api/bebidas/${initialBebida.id}`;
        formDataObj.append("_method", "PUT");
      }

      const response = await axios({
        method,
        url,
        data: formDataObj,
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.status === 200) {
        if (initialBebida) {
          toast.current.show({
            severity: "success",
            summary: "Bebida editada",
            life: 2000,
          });
          setTimeout(() => {
            if (closeModal) closeModal();

            window.location.reload();
          }, 2000);
        } else {
          toast.current.show({
            severity: "success",
            summary: "Bebida Creada",
            life: 2000,
          });
          setFormData(initialState);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errorMessages = error.response.data.errors;
        setErrors(errorMessages);
        Object.values(errorMessages).forEach((error) => {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 3000,
          });
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: `Ocurrió un error al ${
            method === "POST" ? "crear" : "actualizar"
          } la bebida`,
          life: 3000,
        });
      }
    }
  };

  return {
    formData,
    errors,
    toast,
    onChange,
    onDropdownChange,
    onImageSelect,
    onSubmit,
  };
};

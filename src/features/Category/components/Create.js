import { useState } from "react";
import { useFormik } from "formik";
import createCategorySchema from "features/Category/schemas/CreateCategorySchema";
import { toast } from "react-toastify";
import CreateCategoryForm from "features/Category/forms/Create";
import { createCategory } from "api/category";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [imagePreview, setImagePreview] = useState("");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      image: null,
    },

    validationSchema: createCategorySchema,

    onSubmit: (values, actions) => {
      const formData = new FormData();
      formData.append("title", values.title);
      if (values.image) {
        formData.append("image", values.image);
      }
      createCategory(formData)
        .then((response) => {
          toast.success(response.data.message, { autoClose: 1500 });
          setTimeout(() => {
            navigate("/categories");
          }, 1500);
        })
        .catch((error) => {
          actions.setErrors(error);
        });
    },
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl  p-10">
        <CreateCategoryForm
          formik={formik}
          handleImageChange={handleImageChange}
          imagePreview={imagePreview}
        ></CreateCategoryForm>
      </div>
    </>
  );
}

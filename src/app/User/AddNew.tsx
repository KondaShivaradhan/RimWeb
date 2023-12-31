import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";


interface FormProps {
 
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  tags: Yup.string().required("Tags are required"),
  description: Yup.string(),
});

const AddPostForm: React.FC<FormProps> = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      tags: "",
      media: null as File | null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("came here");

    },
  });
  function handleFchange(e: React.FormEvent<HTMLInputElement>) {
    console.log(e.currentTarget.files);
  }
  return (
    <form className="bg-white" onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <div>
        <label htmlFor="title">Title</label>
        <input
        className=""
          type="text"
          id="title"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title && (
          <div className="error">{formik.errors.title}</div>
        )}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
      </div>

      <div>
        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.tags}
        />
        {formik.touched.tags && formik.errors.tags && (
          <div className="error">{formik.errors.tags}</div>
        )}
      </div>

      {/* <div>
        <label htmlFor="tags">Media </label>
        <input
          type="file"
          id="media"
          name="media"
          onChange={(event) => {
            if (event.currentTarget.files)
              formik.setFieldValue("media", event.currentTarget.files[0]);
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.media && formik.errors.media && (
          <div className="error">{formik.errors.media}</div>
        )}
      </div> */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPostForm;

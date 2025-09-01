import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema with Yup
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required."),
  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
});

const FormikForm = () => {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">📝 User Registration (Formik)</h1>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("User Registered:", values);
          alert("Registration successful!");
          resetForm();
        }}
      >
        {() => (
          <Form className="bg-white shadow-lg rounded-lg p-6 space-y-6">
            {/* Username */}
            <div>
              <label className="block font-semibold mb-2">Username</label>
              <Field
                name="username"
                type="text"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter username"
              />
              <ErrorMessage
                name="username"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold mb-2">Email</label>
              <Field
                name="email"
                type="email"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter email"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold mb-2">Password</label>
              <Field
                name="password"
                type="password"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter password"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
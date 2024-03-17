import React, { useState } from "react";
import Spinner from "../spinner/Spinner";
function CRUDForm({ fields, onSubmit, loading }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  function MakeField({ field, i }) {
    if (["text", "number", "email", "password", "date"].includes(field.type)) {
      return (
        <div className="">
          <label htmlFor={`${field.name}_${i}`}>{field.label}</label>
          <input
            type={field.type}
            id={`${field.name}_${i}`}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            // autoFocus={i === 0}
          />
        </div>
      );
    }

    if (field.type === "select") {
      return (
        <div className="">
          <label htmlFor={`${field.name}_${i}`}>{field.label}</label>
          <select
            id={`${field.name}_${i}`}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            // multiple={rest.multiple}
            // autoFocus={i === 0}
          >
            {field?.values?.map((value, j) => (
              <option value={value} key={`${field.name}_${j}_${i}`}>
                {value}
              </option>
            ))}
            {/* <option value="">g</option> */}
          </select>
        </div>
      );
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {fields?.map((field, i) => (
          <MakeField field={field} i={i} />
        ))}

        <div className="mt-3 bg-blue-500 w-full rounded-lg flex justify-center  text-white text-lg py-1">
          {loading ? (
            <Spinner />
          ) : (
            <button className=" hover:shadow-md w-full">Signup</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CRUDForm;

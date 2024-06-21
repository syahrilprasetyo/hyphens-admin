import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FromTambahDokter() {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    location: "",
    contact: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/Admin/AddDokter", formData);
      alert("Success!");
      // Optionally, handle success, reset form, etc.
    } catch (error) {
      console.error("Error adding dokter:", error);
      // Optionally, handle error
    }
  };

    const navigate = useNavigate();
    const handleCancel = () => {
      navigate("/Dokter");
    };

  return (
    <>
      <div className="mt-28"></div>
      <div className="flex flex-col px-[120px] justify-center content-center ">
        <div className="font-poppins font-bold text-4xl leading-loose">
          Add Dokter
        </div>

        <div className="bg-white h-[600px] shadow-md sm:rounded-lg p-6 flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Form fields */}
            <div className="flex flex-col w-full gap-3">
              <div>Name</div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-[48px] border rounded-lg p-2"
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <div>Specialty</div>
              <input
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="w-full h-[48px] border rounded-lg p-2"
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <div>Location</div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full h-[48px] border rounded-lg p-2"
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <div>Contact</div>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full h-[48px] border rounded-lg p-2"
              />
            </div>
            <hr />
            <div className="flex flex-row justify-center content-center gap-3 py-6">
              <div>
                <button
                  className="w-[234px] h-[44px] px-6 py-[10px] rounded-3xl bg-[#E0EDFF]"
                  onClick={handleCancel}
                  >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-[234px] h-[44px] px-6 py-[10px] rounded-3xl bg-[#A2A2A2]">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

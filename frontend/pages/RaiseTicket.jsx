import React, { useState } from "react";

export default function RaiseTicket() {

  const types = [
    "Select Category",
  "Conferences",
  "Seminars",
  "Workshops",
  "Competitions",
  "Position of Responsibility",
  "Academic Contests",
  "Community Service",
  "Club Activities/Volunteering Efforts",
  "Online Courses",
  "Internships"
];
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    uniqueinstinumber:"",
    image: null,
    type: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("uniqueinstinumber", formData.uniqueinstinumber);
    data.append("type", formData.type);
    if (formData.image) {
      data.append("image", formData.image);
    }

    const response = await fetch("http://localhost:3000/api/v1/activity/createactivity", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to submit ticket");
    }

    const result = await response.json();
    console.log("Server response:", result);
    alert("Ticket raised successfully!");

    // reset form
    setFormData({
      title: "",
      description: "",
      uniqueinstinumber: "",
      image: null,
      type: "",
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Something went wrong!");
  }
};


  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Raise a Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Subject */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Add some description..."
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full h-32"
        />
        <input
        type="number"
          name="uniqueinstinumber"
          placeholder="Add your institute Roll No."
          value={formData.uniqueinstinumber}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
        />

        {/* File Upload (Styled) */}
        <div>
          <label className="cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg inline-block">
            Upload File
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {formData.image && (
            <p className="text-sm text-gray-600 mt-2">
              Selected: <span className="font-medium">{formData.image.name}</span>
            </p>
          )}
        </div>

        {/* Category Dropdown */}
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
          required
        >
          {/* <option value="">Select Category</option> */}
          {types.map((ele,_idx)=>(
            <option value={(ele=="Select Category")?"":ele} key={_idx}>{ele}</option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
}

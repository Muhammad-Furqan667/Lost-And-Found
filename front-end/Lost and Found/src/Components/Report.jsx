import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../Styling/found.css";
import bag from "./../assets/bag.jpeg";

function Report({ item, fetchLostItems, fetchFoundItems }) {
  const [formData, setFormData] = useState({
    contact: "",
    location: "",
    type: "",
    image: null,
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      name: formData.type,
      description: formData.description,
      location: formData.location,
      contact_info: formData.contact,
      date: new Date().toISOString().split("T")[0],
      type: item.toLowerCase(),
      image: bag,
    };

    try {
      const res = await fetch("http://localhost:8081/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      const data = await res.json();

      if (data.error) {
        alert("Error adding item: " + data.error);
      } else {
        alert("Item added successfully!");
        if (item === "Lost") fetchLostItems();
        else fetchFoundItems();
        navigate(-1);
      }
    } catch (err) {
      console.error("Error submitting item:", err);
      alert("Failed to connect to backend.");
    }
  };

  return (
    <div className="found-container">
      <h2>{`Report a ${item} item`}</h2>

      <form onSubmit={handleSubmit} className="found-form">
        <label>
          Contact Info:
          <input
            type="text"
            name="contact"
            placeholder="Enter your contact info"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            placeholder="Where did you find it?"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Type:
          <input
            type="text"
            name="type"
            placeholder="What type of item?"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            placeholder="Add a short description..."
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Report;

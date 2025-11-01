import { useParams, useNavigate } from "react-router-dom";
import "./../Styling/details.css";

function ItemDetails({ projects }) {
  const { id } = useParams();
  const navigate = useNavigate;
  console.log(projects);
  const item = projects.find((p) => p.id === Number(id));

  if (!item) return <h2>Item not found</h2>;

  return (
    <div className="details-container">
      <button onClick={() => navigate("/lost")} className="back-btn">
        ⬅ Back
      </button>

      <div className="details-card">
        <img src={item.image} alt={item.name} />
        <h2>{item.name}</h2>
        <p>
          <strong>Date:</strong>
          {new Date(item.date).toLocaleDateString("en-GB")}
        </p>
        <p>
          <strong>Location:</strong> {item.location}
        </p>
        {item.description && (
          <p>
            <strong>Description:</strong> {item.description}
          </p>
        )}
        {item.contact_info && (
          <p>
            <strong>Contact:</strong> {item.contact_info}
          </p>
        )}
      </div>
    </div>
  );
}

export default ItemDetails;

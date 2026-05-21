import { useState } from "react";
import { createDivisionManager } from "../services/api.js";

const initialForm = {
  email: "",
  password: "",
  divisionId: 1,
};

export default function Managers() {
  const [form, setForm] = useState(initialForm);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback("");
    setIsSubmitting(true);

    try {
      const manager = await createDivisionManager(form);
      setFeedback(`Manager creat pentru divizia ${manager.divisionId}: ${manager.email}`);
      setForm(initialForm);
    } catch (error) {
      setFeedback(error.message || "Nu s-a putut crea managerul.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-grid">
      <section className="section-heading page-heading">
        <div>
          <p className="eyebrow">Administrare divizii</p>
          <h2>Manageri de divizie</h2>
        </div>
        <span className="badge info">Admin / HR</span>
      </section>

      <section className="card form-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Cont nou</p>
            <h2>Creeaza manager pentru o divizie</h2>
          </div>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Email manager
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="manager.divizie@parksecure.local"
              required
            />
          </label>
          <label>
            Parola initiala
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            ID divizie
            <input
              name="divisionId"
              type="number"
              min="1"
              value={form.divisionId}
              onChange={handleChange}
              required
            />
          </label>
          <button className="primary-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Se creeaza..." : "Creeaza manager"}
          </button>
        </form>

        {feedback && <p className="inline-feedback">{feedback}</p>}
      </section>
    </div>
  );
}

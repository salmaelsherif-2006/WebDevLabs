import React, { useState } from "react";
import "./styles.css";

function MovieItem({ id, title, review, rating, onRemove }) {
  const stars = "⭐".repeat(rating);

  return (
    <div className="movie-card">
      <div className="movie-header">
        <h3>{title}</h3>
        <span className="rating-badge">{stars}</span>
      </div>
      <p className="movie-review">"{review}"</p>
      <button onClick={() => onRemove(id)} className="remove-btn">
        ✕ Drop
      </button>
    </div>
  );
}

export default function App() {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({ title: "", review: "", rating: 1 });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.review) return;

    const newMovie = {
      id: Date.now(),
      ...formData,
      rating: Number(formData.rating)
    };

    setMovies([newMovie, ...movies]); 
    setFormData({ title: "", review: "", rating: 1 }); 
  };

  const handleRemoveMovie = (id) => {
    setMovies(movies.filter(m => m.id !== id));
  };

  return (
    <div className="dashboard">
      
      {/* LEFT SIDEBAR: Add Movie Form */}
      <aside className="sidebar">
        <h2>Add to Watchlist</h2>
        <form onSubmit={handleAddMovie} className="movie-form">
          <input
            name="title"
            placeholder="Movie Name"
            value={formData.title}
            onChange={handleChange}
          />
          {/* Adding a comment review to the movie[cite: 74] */}
          <textarea
            name="review"
            placeholder="What did you think?"
            value={formData.review}
            onChange={handleChange}
            rows="3"
          />
          <div className="rating-select">
            <label>Rating:</label>
            <select name="rating" value={formData.rating} onChange={handleChange}>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">Save Movie</button>
        </form>
      </aside>

      {/* RIGHT MAIN CONTENT: Movie Grid */}
      <main className="content">
        <h2>My Movies ({movies.length})</h2>
        <div className="movie-grid">
          {movies.length === 0 ? (
            <p className="empty-state">No movies added yet. Start watching!</p>
          ) : (
            movies.map(movie => (
              <MovieItem 
                key={movie.id} 
                {...movie} 
                onRemove={handleRemoveMovie} 
              />
            ))
          )}
        </div>
      </main>
      
    </div>
  );
}
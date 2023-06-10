import React from 'react';
import StarRating from './StarRating';

const FilmDetails = ({ filmDetails, averageRating }) => {
  return (
    <div className="film-details ml-6">
      {filmDetails && (
        <div>
          <h2>{filmDetails.Title}</h2>
          <div className="d-flex justify-space-around">
            <img src={filmDetails.Poster} alt="Image" width={250} />
            <p className="mx-2" style={{ width: '30ch' }}>
              {filmDetails.Plot}
            </p>
          </div>
          <p>
            Directed by: <span className="fw-bold">{filmDetails.Director}</span>
          </p>

          {filmDetails.Ratings.length > 0 ? <StarRating averageRating={averageRating} /> : ''}

          {filmDetails.Ratings.length > 0 ? (
            filmDetails.Ratings.map((rating) => (
              <p className="btn btn-outline-primary rounded-pill mx-3" key={rating.Source}>
                {rating.Source}: {rating.Value}
              </p>
            ))
          ) : (
            <p>No Rating</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FilmDetails;

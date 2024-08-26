import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../common/RatingStars";
import Img from './../../common/Img';

function Course_Card({ course, Height }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    // Convert string IDs to objects if necessary
    const normalizedReviews = course.ratingAndReviews.map(review => 
      typeof review === 'string' ? { id: review } : review
    );

    const count = GetAvgRating(normalizedReviews);
    setAvgReviewCount(count);
  }, [course]);

  const instructorName = typeof course.instructor === 'object'
    ? `${course.instructor.firstName} ${course.instructor.lastName}`
    : course.instructor;

  return (
    <div className='hover:scale-[1.03] transition-all duration-200 z-50 '>
      <Link to={`/courses/${course._id}`}>
        <div className="">
          <div className="rounded-lg">
            <Img
              src={course?.thumbnail}
              alt="course thumbnail"
              className={`${Height} w-full rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-richblack-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-50">
              {instructorName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-richblack-5">$ {course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

Course_Card.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    courseName: PropTypes.string,
    instructor: PropTypes.oneOfType([
      PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }),
      PropTypes.string,
    ]),
    ratingAndReviews: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.shape({
        rating: PropTypes.number,
        review: PropTypes.string,
      }),
      PropTypes.string,
    ])),
    price: PropTypes.number,
  }).isRequired,
  Height: PropTypes.string,
};

export default Course_Card;
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { addToCart } from "../../../slices/cartSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Img from './../../common/Img';
import PropTypes from 'prop-types';
import BuyCourseComponent from "../../BuyCourseComponent"; // Import BuyCourseComponent
import { FaShareSquare } from "react-icons/fa";
import { BsFillCaretRightFill } from "react-icons/bs";
import copy from "copy-to-clipboard"
import { useStripe } from "@stripe/react-stripe-js";
import { buyCourse } from "../../../services/operations/studentFeaturesAPI";

function CourseDetailsCard({ course, setConfirmationModal }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course;

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleBuyNow = async() => {
    if (!user) {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to buy the course",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
      return;
    }

   await buyCourse(token, [courseId], user, navigate, dispatch, stripe);
    
  };

  return (
    <>
      <div className={`flex flex-col gap-4 rounded-2xl bg-richblack-700 p-4 text-richblack-5 `}>
        {/* Course Image */}
        <Img
          src={ThumbnailImage}
          alt={course?.courseName}
          className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold">
            $ {CurrentPrice}
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="yellowButton outline-none"
              onClick={
                user && course?.studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyNow
              }
            >
              {user && course?.studentsEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
              <button onClick={handleAddToCart} className="blackButton outline-none">
                Add to Cart
              </button>
            )}
          </div>

          <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
            30-Day Money-Back Guarantee
          </p>

          <div className={``}>
            <p className={`my-2 text-xl font-semibold `}>
              Course Requirements :
            </p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {course?.instructions?.map((item, i) => {
                return (
                  <p className={`flex gap-2`} key={i}>
                    <BsFillCaretRightFill />
                    <span>{item}</span>
                  </p>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

CourseDetailsCard.propTypes = {
  course: PropTypes.shape({
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    _id: PropTypes.string,
    courseName: PropTypes.string,
    studentsEnrolled: PropTypes.arrayOf(PropTypes.string),
    instructions: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setConfirmationModal: PropTypes.func.isRequired,
};

export default CourseDetailsCard;
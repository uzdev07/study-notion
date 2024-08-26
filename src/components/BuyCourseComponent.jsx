import React from 'react';
import { useElements, CardElement } from '@stripe/react-stripe-js';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import PropTypes from 'prop-types';

const BuyCourseComponent = ({ token, courseId, userDetails, navigate, dispatch }) => {
    const elements = useElements();

    const handleBuyCourse = async () => {
        await buyCourse(token, courseId, userDetails, navigate, dispatch, elements);
    };

    return (
        <div>
            <CardElement />
            <button onClick={handleBuyCourse}>Buy Course</button>
        </div>
    );
};



BuyCourseComponent.propTypes = {
    token: PropTypes.string.isRequired,
    courseId: PropTypes.string.isRequired,
    userDetails: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
};


export default BuyCourseComponent;
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";
import { setAllCourses, setCatalogPageData, setPopularCourses, setTopEnrollCourses } from "../../slices/courseSlice";



// ================ get Catalog Page Data  ================
export const getCatalogPageData = async (categoryId, dispatch) => {
  try {
    const response = await apiConnector("POST", catalogData.CATALOG_PAGE_DATA_API, { categoryId: categoryId, });
    dispatch(setCatalogPageData(response?.data?.data));
  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    throw new Error("Could not Fetch Category page data");
  }
};


// ================ get Popular Courses  ================
export const getPopularCourses = async (dispatch) => {
  try {
    const response = await apiConnector("GET", catalogData.POPULAR_COURSES_API);

    dispatch(setPopularCourses(response?.data?.data));
  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    throw new Error("Could not Fetch Category page data");
  }
};

export const getTopEnrollCoursesSlice = async (dispatch) => {
  try {
    const response = await apiConnector(
      "GET",
      catalogData.TOP_ENROLL_COURSES_API
    );
    dispatch(setTopEnrollCourses(response?.data?.data));
  } catch (error) {
    console.log("TOP ENROLL COURSES API ERROR....", error);
  }
};

export const getAllCourses = async (dispatch) => {
  const response = await apiConnector("GET", catalogData.ALL_COURSES_API);
  dispatch(setAllCourses(response?.data?.data));
};

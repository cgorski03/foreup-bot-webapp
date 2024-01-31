import { TailSpin } from "react-loader-spinner";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../utils/hooks/useAuth";
import CourseSelect from "../../components/home/courseSelect/CourseSelect";
import Navbar from "../../components/home/navbar/Navbar";
import Calendar from "../../components/home/calendar/Calendar";
import TimePicker from "../../components/home/timePicker/TimePicker";
import OutinedButtonLoader from "../../components/buttons/OutlinedButtonLoader";
import { PlayerSelect } from "../../components/home/players/PlayerSelect";
import { UserInformationContext } from "../../Contexts/UserContext";

import "./homeStyles.css";
import { labelValuePair } from "../../utils/types/labelValuePair";
import { SearchInfoForm } from "../../components/home/searchInformationForm/SearchInfoForm";

const Home = () => {
  const { userInfo } = useContext(UserInformationContext);
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [calendarEndDate, setCalendarEndDate] = useState<Date | null>(null);

  const handleCourseSelection = (selectedOption: string): void => {
    setSelectedCourse(selectedOption);
    // TODO
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    setCalendarEndDate(futureDate);
  };
  //This is a secured page
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return (
      <div>
        <TailSpin color="white" width="40" wrapperClass="mainLoginPageLoader" />
      </div>
    );
  } else {
    return (
      <div id="homePageContainer">
        <Navbar />
        <div id="courseSelectionContainer">
          <CourseSelect onCourseSelection={handleCourseSelection} />
          <div id="courseDetailsContainer">
            <p style={{ marginLeft: 20 }}>Hello, {userInfo?.name}</p>
            <p>Course Length: 6704</p>
          </div>
          <SearchInfoForm calendarEndDate={calendarEndDate} />
        </div>
      </div>
    );
  }
};
export default Home;

import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Label,
  Input,
  CardHeader,
  Button,
  CardTitle,
  CardImg,
} from "reactstrap";
import _map from "lodash/map";
import DatePicker from "react-datepicker";
import { number, bool } from "prop-types";
import { Container, Row, Col } from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";
import { getAccessToken } from "../../../util/localStorage";
import { getDataFromFitbit, postApiCallWithConfig } from "../../../api/api";
import history from "../../../service/history";
import { ApplicationState } from "../../../configureStore";
import { useSelector } from "react-redux";
import TimePicker from "antd/lib/time-picker";
import "antd/dist/antd.css";
import moment from "moment";
import FitnessImage from "../../../assets/wellness-lander.png";
import AddActivityModal from "./addActivityModal";

const renderActivityOptions = (activity: any) => {
  return (
    <option value={activity.id} key={activity.id}>
      {activity.name}
    </option>
  );
};

interface IProps {}

const ActivityLogging: React.FC<IProps> = (props: any) => {
  const [defaultActivities, setDefaultActivities] = useState({
    categories: [{ activities: [], name: "", id: number }]
  });
  const [activityMap, setActivityMap] = useState(new Map());
  const [activities, setActivities] = useState({
    activities: [{ name: "", id: number, hasSpeed: bool }]
  });
  const [activityId, setActivityId] = useState(0);
  const [startTime, setStartTime] = useState("00:00:00");
  const [durationMillis, setDurationMillis] = useState(0);
  const [date, setDate] = useState(new Date());
  const [modalState, setModalState] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const isAuthenticated = useSelector(({ auth }: ApplicationState) => ({
    isAuth: auth.isAuthenticated
  }));
  // const getData = async () => {
  //   const accessToken = getAccessToken();
  //   const defaultActivities = await getDataFromFitbit(
  //     "https://api.fitbit.com/1/activities.json",
  //     accessToken
  //   );
  //   console.log(defaultActivities);
  //   setDefaultActivities(defaultActivities);
  // };

  useEffect(() => {
    getActivityList();
    setTimeout(() => {
      if (isAuthenticated.isAuth) {
        getActivityList();
      }
    }, 100);
  }, []);

  const getActivityList = async () => {
    const accessToken = getAccessToken();
    const defaultActivities = await getDataFromFitbit(
      "https://api.fitbit.com/1/activities.json",
      accessToken
    );
    setDefaultActivities(defaultActivities);
    // console.log(
    //   defaultActivities.categories.forEach((element: { name: any }) => {
    //     console.log(element.name);
    //   })
    // );
    let activityMapClone = new Map();
    for (var i = 0; i < defaultActivities.categories.length; i++) {
      activityMapClone.set(
        defaultActivities.categories[i].id,
        defaultActivities.categories[i]
      );
    }
    setActivityMap(activityMapClone);
  };

  const renderActivityCategories = (category: any) => (
    <option value={category.id} key={category.id}>
      {category.name}
    </option>
  );

  const selectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setActivities(activityMap.get(Number(value)));
  };

  const activitySelectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.currentTarget.value;
    setActivityId(Number(value));
  };

  const changeDate = (newDate: any) => {
    setDate(newDate);
  };

  const startTimeChange = (time: any, timeString: any) => {
    setStartTime(timeString);
  };

  const durationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setDurationMillis(Number(value));
  };

  function formatDate(date: Date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const logActivityData = async () => {
    const url =
      "https://api.fitbit.com/1/user/-/activities.json?activityId=" +
      activityId +
      "&startTime=" +
      startTime +
      "&durationMillis=" +
      durationMillis +
      "&date=" +
      formatDate(date);

    const res = await postApiCallWithConfig(url, null);
    if (res) {
      if (res.status === 201) {
        setModalMessage("Successfully Added..");
      } else if(Error) {
        setModalMessage("Error occured...");
      }
      setModalState(true);
    }
  };

  const handleModalState = () => {
    setModalState(!modalState);
  };

  const goToActivities = () => {
    history.push("/activities");
  };
  return (
    <Container md="6" fluid>
      <Row>
        <Col md="7">
          <Card style={{ margin: 20 }}>
            <CardHeader>Activity Logging</CardHeader>
            <CardBody>
              <form>
                <Row className="m-2 mb-4">
                  <Col md="2">
                    <Label for="categories">Category</Label>
                  </Col>
                  <Col>
                    <Input
                      type="select"
                      name="select"
                      id="categories"
                      onChange={event => selectionChange(event)}
                    >
                      {_map(
                        defaultActivities.categories,
                        renderActivityCategories
                      )}
                    </Input>
                  </Col>
                </Row>
                <Row className="m-2 mb-4">
                  <Col md="2">
                    <Label>Activities</Label>
                  </Col>
                  <Col>
                    <Input
                      type="select"
                      name="select"
                      id="categories"
                      onChange={event => activitySelectionChange(event)}
                    >
                      {_map(activities.activities, renderActivityOptions)}
                    </Input>
                  </Col>
                </Row>
                <Row className="m-2 mb-4">
                  <Col md="2">
                    <Label>Duration</Label>
                  </Col>
                  <Col>
                    <Input
                      type="text"
                      name="time"
                      placeholder="Duration"
                      onChange={event => durationChange(event)}
                    />
                  </Col>
                </Row>
                <Row className="m-2 mb-4">
                  <Col md="2">
                    <Label>Start Time</Label>
                  </Col>
                  <Col>
                    <TimePicker
                      defaultValue={moment(new Date(), "HH:mm:ss")}
                      onChange={startTimeChange}
                    />
                  </Col>
                </Row>
                <Row className="m-2 mb-4">
                  <Col md="2">
                    <Label>Date</Label>
                  </Col>
                  <Col>
                    <DatePicker
                      selected={date}
                      onChange={changeDate}
                      maxDate={new Date()}
                      dateFormat="MMMM d, yyyy"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 4, offset: 9 }}>
                    <Button
                      color="primary"
                      type="button"
                      onClick={logActivityData}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card style={{ margin: 20 }}>
            <CardHeader>
              <CardTitle>
                <b>Logged Activities</b>
              </CardTitle>
            </CardHeader>

            <CardImg
              top
              width="50%"
              height="80%"
              src={FitnessImage}
              alt="Card image cap"
            />
            <CardBody>
              <Button color="success" onClick={goToActivities}>
                View Logged Activities
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <AddActivityModal
        message={modalMessage}
        modalState={modalState}
        handleModalState={handleModalState}
      />
    </Container>
  );
};

export default ActivityLogging;

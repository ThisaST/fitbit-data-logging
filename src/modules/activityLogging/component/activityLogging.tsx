import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  CardHeader,
  Button
} from "reactstrap";
import _map from "lodash/map";
import DatePicker from "react-datepicker";
import { number, bool } from "prop-types";

import "react-datepicker/dist/react-datepicker.css";
import { getAccessToken } from "../../../util/localStorage";
import { getDataFromFitbit, postApiCallWithConfig } from "../../../api/api";

const renderActivityOptions = (activity: any) => {
  return (
    <option value={activity.id} key={activity.id}>
      {activity.name}
    </option>
  );
};

interface IProps {
  activities: any;
}

const ActivityLogging: React.FC<IProps> = () => {
  const [defaultActivities, setDefaultActivities] = useState({
    categories: [{ activities: [], name: "", id: number }]
  });
  const [activityMap, setActivityMap] = useState(new Map());
  const [activities, setActivities] = useState({
    activities: [{ name: "", id: number, hasSpeed: bool }]
  });
  const [activityId, setActivityId] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [durationMillis, setDurationMillis] = useState(0);
  const [date, setDate] = useState(new Date());

  // const getData = async () => {
  //   const accessToken = getAccessToken();
  //   const defaultActivities = await getDataFromFitbit(
  //     "https://api.fitbit.com/1/activities.json",
  //     accessToken
  //   );
  //   console.log(defaultActivities);
  //   setDefaultActivities(defaultActivities);
  // };
  useEffect(() => {}, []);

  const getActivityList = async () => {
    const accessToken = getAccessToken();
    const defaultActivities = await getDataFromFitbit(
      "https://api.fitbit.com/1/activities.json",
      accessToken
    );
    console.log(defaultActivities);
    setDefaultActivities(defaultActivities);
    console.log(
      defaultActivities.categories.forEach((element: { name: any }) => {
        console.log(element.name);
      })
    );
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
    console.log(activities);
  };

  const activitySelectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.currentTarget.value;
    console.log(value);
    setActivityId(Number(value));
  };

  const changeDate = (newDate: any) => {
    console.log(newDate);
    setDate(newDate);
  };

  const startTimeChange = (start: React.ChangeEvent<HTMLInputElement>) => {
    const value = start.currentTarget.value;
    setStartTime(value);
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

    console.log(url);
    const res = await postApiCallWithConfig(url, null);
    alert(res.status);
    console.log(res);
  };

  return (
    <div>
      <Card style={{ margin: 20 }}>
        <CardHeader>Activity Logging</CardHeader>
        <CardBody>
          <form>
            <FormGroup>
              <Label for="categories">Category</Label>
              <Input
                type="select"
                name="select"
                id="categories"
                onChange={event => selectionChange(event)}
              >
                {_map(defaultActivities.categories, renderActivityCategories)}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Activities</Label>
              <Input
                type="select"
                name="select"
                id="categories"
                onChange={event => activitySelectionChange(event)}
              >
                {_map(activities.activities, renderActivityOptions)}
              </Input>
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="time"
                placeholder="Duration"
                onChange={event => durationChange(event)}
              />
            </FormGroup>
            <Input
              type="text"
              onChange={startTimeChange}
              placeholder="Start time in HH:MM:SS format"
            />
            <DatePicker
              selected={date}
              onChange={changeDate}
              maxDate={new Date()}
              dateFormat="MMMM d, yyyy"
            />
            <Button color="primary" type="button" onClick={logActivityData}>
              Submit
            </Button>
          </form>
          <Button color="success" onClick={getActivityList}>
            Activities
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ActivityLogging;

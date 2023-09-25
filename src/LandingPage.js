import React, { useState, useEffect } from "react";
import { Checkbox, Divider, Button, Form, Input } from "antd";
import { useMyContext } from "./context/MyContext.js";
import { useNavigate } from "react-router-dom";

import "./ALLCss.css";

function LandingPage() {
  const navigate = useNavigate();
  const {
    name,
    setName,
    totalTime,
    setTotalTime,
    checkedList,
    setCheckedList,
  } = useMyContext();

  const CheckboxGroup = Checkbox.Group;
  const plainOptions = [
    "AreaUnderTheCurve_21",
    "BinomialTheorem_13",
    "BinomialTheorem_24",
    "AreaUnderTheCurve_15",
    "AreaUnderTheCurve_2",
    "BinomialTheorem_3",
    "BinomialTheorem_4",
    "AreaUnderTheCurve_5",
  ];

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };
  const onFinish = (e) => {
    if (!name || checkedList.length === 0) {
      // If validation fails, do not navigate and show the form
      alert("Fill the form completely");
      return;
    }

    // Calculate total time based on the number of selected items
    const newTotalTime = checkedList.length * 5;
    setTotalTime(newTotalTime);
    navigate("/test");
  };
  // Calculate total time based on the number of selected items
  useEffect(() => {
    const newTotalTime = checkedList.length * 5;
    setTotalTime(newTotalTime);
  }, [checkedList, setTotalTime]);

  return (
    <div className="Check-Area">
      <Form
        className="landing"
        name="wrap"
        labelCol={{
          flex: "110px",
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        colon={false}
        style={{
          maxWidth: 400,
        }}
        onFinish={onFinish}
      >
        <h1> Maths Quiz</h1>
        <Form.Item
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Item>
        <h5>Total Time: {totalTime} minutes</h5>
        <h3>Select Questions:</h3>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Select All
        </Checkbox>
        <Divider />
        <CheckboxGroup
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        />
        <hr />
        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LandingPage;

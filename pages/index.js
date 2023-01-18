import { useReducer, useEffect } from "react";
import { Card, DatePicker } from "antd";
import { CodeTable } from "../lib";


const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const Index = () => {
  const initialState = {
    dataSource: [],
  };

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "fetchData":
        return {
          ...state,
          dataSource: payload,
        };
      case "isLoading":
        return {
          ...state,
          isLoading: payload,
        };
      default:
        break;
    }
  };

  const [{ dataSource }, dispatch] = useReducer(reducer, initialState);

  function codeList() {
    var data = [];
    dispatch({ type: "fetchData", payload: [] });
    for (let index = 0; index < 49; index++) {
      data.push({ num: index + 1, money: 0 });
    }
    dispatch({ type: "fetchData", payload: data });
  }

  useEffect(() => {
    codeList();
  }, []);
  return (
    <>
      <Card
        title={<DatePicker onChange={onChange} />}
        bordered={false}
        style={{ overflow: "scroll", height: "100%" }}
      >
        <CodeTable data={dataSource} type="CodeTable"></CodeTable>
      </Card>
    </>
  );
};
export default Index;

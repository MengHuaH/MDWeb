import { useReducer, useEffect } from "react";
import { Card, Button, Drawer, Modal, Steps, Input } from "antd";
import { CodeTable } from "../../../lib";

const pButtonList = {
  textAlign: "right",
};

const pButton = {
  marginRight: "10px",
};

const Index = () => {
  const initialState = {
    dataSource: [],
    drawerOpen: false,
    isModalOpen: false,
    codeData: [],
    stepsNum: 0,
    money: 0,
  };

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "fetchData":
        return {
          ...state,
          dataSource: payload,
        };
      case "messageCodeClick":
        return {
          ...state,
          stepsNum: 0,
          drawerOpen: payload,
          isModalOpen: payload,
          codeData: [],
          money:0,
        };
      case "codeDataChange":
        return {
          ...state,
          codeData: payload,
        };
      case "pBtnChange":
        return {
          ...state,
          stepsNum: payload.num,
          drawerOpen: payload.codeOPen,
        };
      case "moneyChange":
        return {
          ...state,
          money: payload,
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

  const [
    { dataSource, drawerOpen, isModalOpen, codeData, stepsNum, money },
    dispatch,
  ] = useReducer(reducer, initialState);

  function codeList() {}

  function messageCodeClick() {
    dispatch({ type: "messageCodeClick", payload: true });
  }

  function modalOkClick() {
    const item = {
      codes: codeData,
      money: money,
    };
    var data = dataSource;
    data.push(item);
    dispatch({ type: "messageCodeClick", payload: false });
    dispatch({ type: "fetchData", payload: data });
  }

  function modalCancelClick() {
    dispatch({ type: "messageCodeClick", payload: false });
    // dispatch({ type: "codeDataChange", payload: [] });
  }

  function codeButton(item) {
    if (codeData.indexOf(item) < 0) {
      var data = codeData;
      data.push(item);
      dispatch({ type: "codeDataChange", payload: data });
    }
  }

  function delCode(item) {
    var data = codeData.filter((i) => i != item);
    dispatch({ type: "codeDataChange", payload: data });
  }

  function pBtnUp() {
    dispatch({ type: "pBtnChange", payload: { num: 0, codeOPen: true } });
  }
  function pBtnNext() {
    dispatch({ type: "pBtnChange", payload: { num: 1, codeOPen: false } });
  }

  useEffect(() => {
    codeList();
  }, []);
  return (
    <>
      <Card
        title={
          <Button type="primary" onClick={messageCodeClick}>
            报码
          </Button>
        }
        bordered={false}
        style={{ height: "100%" }}
      >
        <Card bordered={false} style={{ height: "95%", overflow: "auto" }}>
          {dataSource.map((item) => (
            <Card bordered={false} style={{ padding: "1px" }}>
              <Card.Grid style={{ width: "75%" }}>
                {item.codes?.map((i) => (
                  <Button type="primary" shape="circle" key={i}>
                    {i}
                  </Button>
                ))}
              </Card.Grid>
              <Card.Grid
                style={{
                  width: "25%",
                  fontSize: "20px",
                  textAlign: "center",
                  backgroundColor: "#2bb455",
                  color: "#fff",
                }}
              >
                {item.money}元
              </Card.Grid>
            </Card>
          ))}
        </Card>
        <p style={{ textAlign: "right", margin: "12px 0px" }}>
          <Button style={pButton} onClick={modalCancelClick}>
            取消
          </Button>
          <Button type="primary" onClick={modalOkClick}>
            确认
          </Button>
        </p>
      </Card>
      <Modal
        closable={false}
        open={isModalOpen}
        onOk={modalOkClick}
        onCancel={modalCancelClick}
        okText="确认"
        cancelText="取消"
        width={stepsNum == 0 ? "80%" : "30%"}
        footer={null}
      >
        <Steps
          size="small"
          current={stepsNum}
          style={{ width: stepsNum == 0 ? "50%" : "100%", margin: "auto" }}
          items={[
            {
              title: "选码",
            },
            {
              title: "确认金额",
            },
          ]}
        />

        {stepsNum == 0 ? (
          <>
            <Card style={{ margin: "20px 0px" }}>
              {codeData.map((item) => (
                <Button
                  type="primary"
                  shape="circle"
                  key={item}
                  onClick={() => delCode(item)}
                >
                  {item}
                </Button>
              ))}
            </Card>
            <p style={pButtonList}>
              <Button style={pButton} onClick={modalCancelClick}>
                取消
              </Button>
              <Button type="primary" onClick={pBtnNext}>
                下一步
              </Button>
            </p>
          </>
        ) : (
          <>
            <Input
              prefix="金额："
              suffix="元"
              style={{ margin: "20px 0px" }}
              onChange={(e) => {
                dispatch({ type: "moneyChange", payload: e.target.value });
              }}
            />
            <p style={pButtonList}>
              <Button style={pButton} onClick={pBtnUp}>
                上一步
              </Button>
              <Button style={pButton} onClick={modalCancelClick}>
                取消
              </Button>
              <Button type="primary" onClick={modalOkClick}>
                确认
              </Button>
            </p>
          </>
        )}
      </Modal>
      <Drawer
        placement="bottom"
        closable={false}
        mask={false}
        onClose={() => dispatch({ type: "drawerOpen", payload: false })}
        open={drawerOpen}
        key="bottom"
      >
        <CodeTable
          data={dataSource}
          type="CodeButton"
          codeButton={codeButton}
        ></CodeTable>
      </Drawer>
    </>
  );
};
export default Index;

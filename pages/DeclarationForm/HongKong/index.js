import { useReducer, useEffect } from "react";
import { Card, Button, Drawer, Modal, Steps } from "antd";
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
          stepsNum:0,
          drawerOpen: payload,
          isModalOpen: payload,
          codeData:[],
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
    { dataSource, drawerOpen, isModalOpen, codeData, stepsNum },
    dispatch,
  ] = useReducer(reducer, initialState);

  function codeList() {
    var data = [];
    dispatch({ type: "fetchData", payload: [] });
    for (let index = 0; index < 49; index++) {
      data.push({ num: index + 1 });
    }
    dispatch({ type: "fetchData", payload: data });
  }

  function messageCodeClick() {
    dispatch({ type: "messageCodeClick", payload: true });
  }

  function modalOkClick() {
    dispatch({ type: "messageCodeClick", payload: false });
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

  function pBtnUp() {
    dispatch({ type: "pBtnChange", payload: {num:0,codeOPen:true} });
  }
  function pBtnNext() {
    dispatch({ type: "pBtnChange", payload: {num:1,codeOPen:false} });
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
        style={{ overflow: "scroll", height: "100%" }}
      ></Card>
      <Modal
        closable={false}
        open={isModalOpen}
        onOk={modalOkClick}
        onCancel={modalCancelClick}
        okText="确认"
        cancelText="取消"
        width="80%"
        footer={null}
      >
        <Steps
          size="small"
          current={stepsNum}
          style={{ width: "50%", margin: "auto" }}
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
            <Card style={{ overflow: "scroll", margin: "20px 0px" }}>
              {codeData.map((item) => (
                <Button type="primary" shape="circle" key={item}>
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

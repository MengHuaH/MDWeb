import { Card, Divider } from "antd";

const gridStyle = {
  width: "55px",
  margin: "10px",
  textAlign: "center",
  fontSize: "24px",
  padding: "0px",
};

const CardTable = ({ data, type, codeButton }) => {
  switch (type) {
    case "CodeTable":
      return (
        <>
          <Card>
            {data?.map((item) => (
              <Card.Grid style={gridStyle} key={item.num}>
                {item.num}
                <Divider style={{ margin: "0px" }} />
                {item.money}元
              </Card.Grid>
            ))}
          </Card>
        </>
      );
      break;
    case "CodeButton":
      return (
        <>
          <Card>
            { data?.map((item) => (
              <Card.Grid style={gridStyle} key={item.num} onClick={() => codeButton(item.num)}>
                {item.num}
              </Card.Grid>
            ))}
          </Card>
        </>
      );
      break;
    default:
      break;
  }
};
export default CardTable;

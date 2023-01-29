import { useEffect } from "react";
import { Menu } from "antd";
import Link from "next/Link";
function getItem(label, key, children, type) {
  return {
    key,
    children,
    label,
    type,
  };
}
const items = [
  getItem(<Link href="/">首页</Link>, "/"),
  getItem("报单", "sub", [
    getItem(<Link href="/DeclarationForm/HongKong">香港</Link>, "/DeclarationForm/HongKong"),
    getItem(<Link href="/DeclarationForm/Macao">澳门</Link>, "/DeclarationForm/Macao"),
    getItem(<Link href="/DeclarationForm/EntryRecord">报单记录</Link>, "/DeclarationForm/EntryRecord"),
  ]),
  getItem("开奖", "Record", [
    getItem(<Link href="/Record">开奖记录</Link>, "/Record"),
    getItem(<Link href="/Record/MediumCodeRecord">中码记录</Link>, "/Record/MediumCodeRecord"),
  ]),
  getItem(<Link href="/Settings">设置</Link>, "/Setting"),
];
const App = () => {
  var defaultSelectedKeys = []
  const onClick = (e) => {
    console.log()
    console.log("click ", e);
  };
  
  useEffect(() => {
    defaultSelectedKeys.push(window.location.pathname)
  }, []);
  return (
    <Menu
      theme={"dark"}
      onClick={onClick}
      style={{
        width: 200,
      }}
      defaultSelectedKeys={defaultSelectedKeys}
      defaultOpenKeys={["sub","Record"]}
      mode="inline"
      items={items}
    />
  );
};
export default App;

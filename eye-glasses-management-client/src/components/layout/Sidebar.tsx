import { Layout, Menu } from "antd";
// import { useAppSelector } from "../../redux/hooks";
// import { selectCurrentUser } from "../../redux/features/auth/authSlice";
const { Sider } = Layout;
import {
    DashboardOutlined,
    EyeOutlined,
    HistoryOutlined,
} from "@ant-design/icons";
import eyeGlass from "../../assets/eye-glass.png";
import { NavLink } from "react-router-dom";

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
    const sidebarItems = [
        {
            key: "1",
            icon: <DashboardOutlined />,
            label: <NavLink to="/dashboard">Dashboard</NavLink>,
        },
        {
            key: "2",
            icon: <EyeOutlined />,
            label: <NavLink to="/eye-glasses">Eye Glasses Management</NavLink>,
            children: [
                {
                    key: "2.1",
                    icon: <EyeOutlined />,
                    label: (
                        <NavLink to="/eye-glasses/add">Add Eye Glass</NavLink>
                    ),
                },
            ],
        },
        {
            key: "3",
            icon: <HistoryOutlined />,
            label: <NavLink to="/sales-history">Sales History</NavLink>,
        },
    ];

    return (
        <Sider width={300} trigger={null} collapsible collapsed={collapsed}>
            <div
                className="demo-logo-vertical"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "64px",
                    gap: "12px",
                }}
            >
                <img
                    src={eyeGlass}
                    alt="logo"
                    style={{
                        width: "50px",
                        backgroundColor: "#ffff00",
                        padding: "5px",
                        borderRadius: "20%",
                    }}
                />
                <h1
                    className="my-font"
                    style={{
                        color: "white",
                        fontWeight: "700",
                        fontSize: "20px",
                        display: collapsed ? "none" : "block",
                    }}
                >
                    Eye Glass <br /> Management
                </h1>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={sidebarItems}
            />
        </Sider>
    );
};

export default Sidebar;

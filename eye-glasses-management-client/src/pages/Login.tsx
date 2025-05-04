import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { IUser, setUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Form from "../components/form/Form";
import MyInput from "../components/form/Input";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();

    // submit handler
    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Logging in...");

        try {
            const userInfo = {
                username: data.username,
                password: data.password,
            };

            const res = await login(userInfo).unwrap(); // login

            const user = verifyToken(res.data.token) as IUser;
            dispatch(setUser({ user: user, token: res.data.token })); // set user and token in redux

            toast.success("Logged in.", { id: toastId, duration: 2000 });

            navigate(`/dashboard`);
        } catch (err: any) {
            toast.error(
                `Login failed. ${
                    err?.data?.errorDetails
                        ? err?.data?.errorDetails.issues[0].message
                        : err?.data?.message
                }`,
                {
                    id: toastId,
                    duration: 2000,
                }
            );
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <Form onSubmit={onSubmit}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        borderRadius: "7px",
                        padding: "30px",
                        minWidth: "350px",
                        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <MyInput type="text" name="username" label="Username:" />
                    <MyInput type="password" name="password" label="Password:" />
                    <Button
                        className="my-font"
                        style={{
                            fontSize: "15px",
                            fontWeight: "600",
                            height: "37px",
                            marginTop: "6px",
                        }}
                        type="primary"
                        htmlType="submit"
                    >
                        Login
                    </Button>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            justifyContent: "center",
                        }}
                    >
                        <span className="my-font" style={{ fontSize: "12px" }}>
                            New to EyeGlasses Management?
                        </span>
                        <Button
                            onClick={() => navigate("/register")}
                            className="my-font"
                            style={{
                                padding: "0px",
                                color: "blue",
                                fontSize: "13px",
                                fontWeight: "600",
                            }}
                            type="link"
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </Form>
        </Row>
    );
};

export default Login;

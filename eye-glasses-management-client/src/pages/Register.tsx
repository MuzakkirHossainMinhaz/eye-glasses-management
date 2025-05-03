import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Form from "../components/form/Form";
import MyInput from "../components/form/Input";

const Register = () => {
    const navigate = useNavigate();
    const [register] = useRegisterMutation();

    // submit handler
    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Registering...");

        try {
            const userInfo = {
                username: data.username,
                email: data.email,
                password: data.password,
            };

            await register(userInfo).unwrap(); // register

            toast.success("Successfully Registered. Please Login.", {
                id: toastId,
                duration: 2000,
            });

            navigate(`/login`);
        } catch (err: any) {
            toast.error(
                `Registration failed. ${
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
                    <MyInput type="email" name="email" label="Email:" />
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
                        Register
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
                            Already have an account?
                        </span>
                        <Button
                            onClick={() => navigate("/login")}
                            className="my-font"
                            style={{
                                padding: "0px",
                                color: "blue",
                                fontSize: "13px",
                                fontWeight: "600",
                            }}
                            type="link"
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </Form>
        </Row>
    );
};

export default Register;

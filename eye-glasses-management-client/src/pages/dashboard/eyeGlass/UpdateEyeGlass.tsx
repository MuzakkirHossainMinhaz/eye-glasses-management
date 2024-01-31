import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
// import { useAppDispatch } from "../../../redux/hooks";
import { toast } from "sonner";
import Form from "../../../components/form/Form";
import MyInput from "../../../components/form/Input";
import MySelect from "../../../components/form/Select";
import {
    brands,
    frameColors,
    frameMaterials,
    frameShapes,
    lensTypes,
} from "../../../utils/static.data";
import {
    useCreateEyeGlassMutation,
    useGetEyeGlassQuery,
    useUpdateEyeGlassMutation,
} from "../../../redux/features/eyeGlass/eyeGlassApi";
import { useLocation, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

const UpdateEyeGlass = () => {
    const { id } = useParams();
    const route = useLocation();
    const path = route.pathname.split("/")[2];
    const [updatedEyeGlass] = useUpdateEyeGlassMutation();
    const [createEyeGlass] = useCreateEyeGlassMutation();
    const { data, isLoading } = useGetEyeGlassQuery(id!);
    const user = useAppSelector(selectCurrentUser);

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Updating eye-glass...");

        try {
            const eyeGlassInfo = {
                name: data.name,
                price: parseFloat(data.price),
                quantity: parseFloat(data.quantity),
                frameMaterial: data.frameMaterial,
                frameColor: data.frameColor,
                frameShape: data.frameShape,
                lensType: data.lensType,
                brand: data.brand,
                gender: data.gender,
                color: data.color,
            };

            path === "update" &&
                (await updatedEyeGlass({ _id: id!, ...eyeGlassInfo }));

            path === "duplicate" &&
                (await createEyeGlass({
                    ...eyeGlassInfo,
                    createdBy: user?._id,
                }));

            toast.success(
                `Successfully ${path === "update" ? "Updated" : "Created"}.`,
                {
                    id: toastId,
                    duration: 2000,
                }
            );
        } catch (err) {
            toast.error(`Failed ${path === "update" ? "Update" : "Create"}.`, {
                id: toastId,
                duration: 2000,
            });
        }
    };

    if (isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                }}
            >
                <LoadingOutlined />
            </div>
        );
    }

    return (
        <Row justify="center" align="middle" style={{ height: "100%" }}>
            <Form onSubmit={onSubmit} defaultValues={data?.data}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        borderRadius: "7px",
                        padding: "30px",
                        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >
                        <MyInput type="text" name="name" label="Name:" />
                        <MyInput type="number" name="price" label="Price:" />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >
                        <MyInput
                            type="number"
                            name="quantity"
                            label="Quantity:"
                        />
                        <MySelect
                            name="frameMaterial"
                            label="Frame Material:"
                            options={frameMaterials}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >
                        <MySelect
                            name="frameColor"
                            label="Frame Color:"
                            options={frameColors}
                        />
                        <MySelect
                            name="frameShape"
                            label="Frame Shape:"
                            options={frameShapes}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >
                        <MySelect
                            name="lensType"
                            label="Lens Type:"
                            options={lensTypes}
                        />
                        <MySelect
                            name="brand"
                            label="Brand:"
                            options={brands}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >
                        <MySelect
                            name="gender"
                            label="Gender:"
                            options={[
                                {
                                    label: "Male",
                                    value: "male",
                                },
                                {
                                    label: "Female",
                                    value: "female",
                                },
                            ]}
                        />
                        <MySelect
                            name="color"
                            label="Color:"
                            options={frameColors}
                        />
                    </div>
                    {path === "duplicate" && (
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
                            Create Variant
                        </Button>
                    )}
                    {path === "update" && (
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
                            Update
                        </Button>
                    )}
                </div>
            </Form>
        </Row>
    );
};

export default UpdateEyeGlass;

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
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useCreateEyeGlassMutation } from "../../../redux/features/eyeGlass/eyeGlassApi";

const AddEyeGlass = () => {
    const user = useAppSelector(selectCurrentUser);
    const [createEyeGlass] = useCreateEyeGlassMutation();

    // create eye-glass
    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Creating eye-glass...");

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
                createdBy: user?._id,
            };

            await createEyeGlass(eyeGlassInfo).unwrap(); // create

            toast.success("Successfully Created.", {
                id: toastId,
                duration: 2000,
            });
        } catch (err) {
            toast.error("Failed to Create.", {
                id: toastId,
                duration: 2000,
            });
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: "100%" }}>
            {/* new eye glass add form */}
            <Form onSubmit={onSubmit}>
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
                        Create
                    </Button>
                </div>
            </Form>
        </Row>
    );
};

export default AddEyeGlass;

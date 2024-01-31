import React from "react";
import { Button, Modal } from "antd";
import Form from "../form/Form";
import MySelect from "../form/Select";
import {
    brands,
    frameColors,
    frameMaterials,
    frameShapes,
    lensTypes,
} from "../../utils/static.data";
import { FieldValues } from "react-hook-form";
import { FilterOutlined } from "@ant-design/icons";
import MyInput from "../form/Input";

// props interface
interface IProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setFilters: React.Dispatch<
        React.SetStateAction<{
            minPrice?: number;
            maxPrice?: number;
            frameMaterial?: string;
            frameColor?: string;
            frameShape?: string;
            lensType?: string;
            brand?: string;
            gender?: string;
            color?: string;
        }>
    >;
}

const FilterEyeGlass: React.FC<IProps> = ({
    isModalOpen,
    setIsModalOpen,
    setFilters,
}: IProps) => {
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // filter eye-glasses
    const onSubmit = async (data: FieldValues) => {
        const eyeGlassInfo = {
            minPrice: data.minPrice,
            maxPrice: data.maxPrice,
            frameMaterial: data.frameMaterial,
            frameColor: data.frameColor,
            frameShape: data.frameShape,
            lensType: data.lensType,
            brand: data.brand,
            gender: data.gender,
            color: data.color,
        };

        // set filters
        setFilters(eyeGlassInfo);

        setIsModalOpen(false);
    };

    return (
        <Modal
            title="Filter Eye-Glasses"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form onSubmit={onSubmit}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                    }}
                >
                    <div style={{ display: "flex", gap: "12px" }}>
                        <MyInput
                            type="number"
                            name="minPrice"
                            label="Min Price:"
                        />
                        <MyInput
                            type="number"
                            name="maxPrice"
                            label="Max Price:"
                        />
                    </div>
                    <MySelect
                        name="frameMaterial"
                        label="Frame Material:"
                        options={[
                            { label: "All", value: "" },
                            ...frameMaterials,
                        ]}
                    />
                    <MySelect
                        name="frameColor"
                        label="Frame Color:"
                        options={[{ label: "All", value: "" }, ...frameColors]}
                    />
                    <MySelect
                        name="frameShape"
                        label="Frame Shape:"
                        options={[{ label: "All", value: "" }, ...frameShapes]}
                    />
                    <MySelect
                        name="lensType"
                        label="Lens Type:"
                        options={[{ label: "All", value: "" }, ...lensTypes]}
                    />
                    <MySelect
                        name="brand"
                        label="Brand:"
                        options={[{ label: "All", value: "" }, ...brands]}
                    />
                    <MySelect
                        name="gender"
                        label="Gender:"
                        options={[
                            { label: "All", value: "" },
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
                    <Button
                        className="my-font"
                        style={{
                            fontSize: "15px",
                            fontWeight: "600",
                            height: "37px",
                            marginTop: "6px",
                        }}
                        icon={<FilterOutlined />}
                        type="primary"
                        htmlType="submit"
                    >
                        Filter
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default FilterEyeGlass;

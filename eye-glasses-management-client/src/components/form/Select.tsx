import { Select } from "antd";
import { Controller } from "react-hook-form";

// props interface
interface ISelectProps {
    name: string;
    label?: string;
    options: { label: string; value: string }[];
}

const MySelect = ({ name, label, options }: ISelectProps) => {
    const filterOption = (
        input: string,
        option?: { label: string; value: string }
    ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    return (
        <div
            className="my-font"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                width: "100%",
            }}
        >
            <label
                style={{ fontSize: "15px", fontWeight: "600" }}
                htmlFor={name}
            >
                {label ? label : ""}
            </label>
            <Controller
                name={name}
                render={({ field }) => (
                    <Select
                        {...field}
                        showSearch
                        placeholder="Select an option"
                        optionFilterProp="children"
                        filterOption={filterOption}
                        options={options}
                        style={{ height: "36px" }}
                        className="my-font"
                    />
                )}
            />
        </div>
    );
};

export default MySelect;

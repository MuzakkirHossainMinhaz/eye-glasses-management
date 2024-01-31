import { Input } from "antd";
import { Controller } from "react-hook-form";

// props interface
interface IInputProps {
    type: string;
    name: string;
    label?: string;
}

const MyInput = ({ type, name, label }: IInputProps) => {
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
                    <Input
                        className="my-font"
                        {...field}
                        placeholder={`Type ${name}`}
                        type={type}
                        id={name}
                        style={{ padding: "6px 8px" }}
                    />
                )}
            />
        </div>
    );
};

export default MyInput;

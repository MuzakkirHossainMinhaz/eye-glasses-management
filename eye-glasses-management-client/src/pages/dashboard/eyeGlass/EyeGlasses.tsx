/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Button, DatePicker, Input, Space, Table } from "antd";
import type {
    DatePickerProps,
    InputRef,
    TableColumnType,
    TableColumnsType,
    TableProps,
} from "antd";
import {
    CopyOutlined,
    DeleteOutlined,
    FilterOutlined,
    RetweetOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import {
    useDeleteAllEyeGlassesMutation,
    useDeleteEyeGlassMutation,
    useGetAllEyeGlassesQuery,
} from "../../../redux/features/eyeGlass/eyeGlassApi";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import FilterEyeGlass from "../../../components/eyeGlass/FilterEyeGlass";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import Form from "../../../components/form/Form";
import MyInput from "../../../components/form/Input";
import { FieldValues } from "react-hook-form";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useCreateSalesMutation } from "../../../redux/features/sales/salesApi";

type OnChange = NonNullable<TableProps<any>["onChange"]>;
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const EyeGlasses: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [deleteEyeGlass] = useDeleteEyeGlassMutation();
    const [filters, setFilters] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});
    const [isSellModalOpen, setIsSellModalOpen] = useState(false);
    const user = useAppSelector(selectCurrentUser);
    const [productId, setProductId] = useState("");
    const [date, setDate] = useState("");
    const [createSales] = useCreateSalesMutation();
    const [deleteAllEyeGlasses] = useDeleteAllEyeGlassesMutation();
    const [quantity, setQuantity] = useState(0);

    // sell eye-glass handler
    const handleSell = async (data: FieldValues) => {
        const toastId = toast.loading("Selling eye-glass...");

        const sale = {
            productId,
            ...data,
            saleDate: date,
            sellerId: user?._id,
        };

        if (data.quantity > quantity) {
            toast.error("Insufficient quantity.", {
                id: toastId,
                duration: 2000,
            });
            return;
        }

        await createSales(sale);

        setIsSellModalOpen(false);
        toast.success("Successfully sold.", { id: toastId, duration: 2000 });
        setProductId("");
        setDate("");
    };

    // date for sell modal
    const onChange: DatePickerProps["onChange"] = (_date, dateString) => {
        setDate(dateString);
    };

    // for sell modal
    const showIsSellModal = (id: string, quantity: number) => {
        setIsSellModalOpen(true);
        setProductId(id);
        setQuantity(quantity);
    };

    // for filter in table
    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps["confirm"],
        dataIndex: any
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    // for filter in table
    const handleChange: OnChange = (_pagination, _filters, sorter) => {
        setSortedInfo(sorter as Sorts);
    };

    // for filter in table
    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
    };

    // for filter in table
    const showModal = () => {
        setIsModalOpen(true);
    };

    // fetch data
    const { data, isLoading } = useGetAllEyeGlassesQuery(filters, {
        refetchOnMountOrArgChange: true,
    });

    // remove zero quantity products
    const dataOnNonZeroQuantity = data?.data?.filter(
        (eyeGlass: any) => eyeGlass.quantity > 0
    );

    // select from table to delete
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    // product delete handler
    const handleDelete = () => {
        toast.loading("Deleting...");
        deleteEyeGlass(selectedRowKeys); // delete product
        setSelectedRowKeys([]);
        toast.success("Successfully Deleted.");
    };

    const hasSelected = selectedRowKeys.length > 0;

    // for filter
    const getColumnSearchProps = (dataIndex: any): TableColumnType<any> => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{ padding: 8, width: 250 }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(
                            selectedKeys as string[],
                            confirm,
                            dataIndex
                        )
                    }
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(
                                selectedKeys as string[],
                                confirm,
                                dataIndex
                            )
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? "#1677ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    // table columns
    const columns: TableColumnsType<any> = [
        {
            title: "Name",
            dataIndex: "name",
            ...getColumnSearchProps("name"),
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            sorter: (a, b) => a.quantity - b.quantity,
            sortOrder:
                sortedInfo.columnKey === "quantity" ? sortedInfo.order : null,
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Frame Material",
            dataIndex: "frameMaterial",
        },
        {
            title: "Frame Shape",
            dataIndex: "frameShape",
        },
        {
            title: "Frame Color",
            dataIndex: "frameColor",
        },
        {
            title: "Lens Type",
            dataIndex: "lensType",
        },
        {
            title: "Brand",
            dataIndex: "brand",
        },
        {
            title: "Gender",
            dataIndex: "gender",
        },
        {
            title: "Action",
            render: (_: any, record: any) => (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: "15px",
                        fontWeight: "600",
                    }}
                >
                    <NavLink
                        title="Update"
                        to={`/eye-glasses/update/${record._id}`}
                        style={{
                            color: "#4096ff",
                            textDecoration: "none",
                            fontSize: "18px",
                            fontWeight: "600",
                        }}
                    >
                        <RetweetOutlined />
                    </NavLink>
                    <NavLink
                        title="Create variant"
                        to={`/eye-glasses/duplicate/${record._id}`}
                        style={{
                            color: "#4096ff",
                            textDecoration: "none",
                            fontSize: "16px",
                            fontWeight: "600",
                        }}
                    >
                        <CopyOutlined />
                    </NavLink>
                    <button
                        title="Sell"
                        style={{
                            color: "#4096ff",
                            textDecoration: "none",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "18px",
                        }}
                        onClick={() =>
                            showIsSellModal(record._id, record.quantity)
                        }
                    >
                        <ShoppingCartOutlined />
                    </button>
                </div>
            ),
        },
    ];

    // all / bulk delete handler
    const handleAllDelete = () => {
        const toastId = toast.loading("Deleting all items...");
        deleteAllEyeGlasses(undefined);
        toast.success("Successfully Deleted.", {
            id: toastId,
            duration: 2000,
        });
    };

    return (
        <div>
            <div
                style={{
                    marginBottom: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                    }}
                >
                    <Button
                        danger
                        type="primary"
                        onClick={handleAllDelete}
                        icon={<DeleteOutlined />}
                        loading={isLoading}
                    >
                        Bulk Delete
                    </Button>
                    <Button
                        danger
                        onClick={handleDelete}
                        icon={<DeleteOutlined />}
                        disabled={!hasSelected}
                        loading={isLoading}
                    >
                        Delete
                    </Button>
                    <span>
                        {hasSelected
                            ? `Selected ${selectedRowKeys.length} items`
                            : ""}
                    </span>
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <p>Total items: {dataOnNonZeroQuantity?.length}</p>
                    </div>
                    <Button
                        icon={<FilterOutlined />}
                        type="primary"
                        onClick={showModal}
                    >
                        Filter
                    </Button>
                    <NavLink to="/eye-glasses/add">
                        <Button type="primary" loading={isLoading}>
                            Add
                        </Button>
                    </NavLink>
                </div>
            </div>
            <Table
                rowSelection={rowSelection}
                loading={isLoading}
                pagination={{ pageSize: 10 }}
                bordered
                rowKey={(record) => record._id}
                columns={columns}
                dataSource={dataOnNonZeroQuantity}
                onChange={handleChange}
            />
            <FilterEyeGlass
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setFilters={setFilters}
            />

            {/* for sell modal */}
            <div
                style={{
                    display: isSellModalOpen ? "flex" : "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100dvw",
                    height: "100dvh",
                    zIndex: 999,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    padding: 20,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        backgroundColor: "white",
                        padding: 25,
                        minWidth: 350,
                        borderRadius: 7,
                        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                        position: "relative",
                    }}
                >
                    <span
                        className="my-font"
                        style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            display: "flex",
                            justifyContent: "flex-end",
                            position: "absolute",
                            top: 10,
                            right: 20,
                            cursor: "pointer",
                        }}
                        onClick={() => setIsSellModalOpen(false)}
                    >
                        x
                    </span>
                    <Form onSubmit={handleSell}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 15,
                            }}
                        >
                            <MyInput
                                type="number"
                                label="Quantity:"
                                name="quantity"
                            />
                            <MyInput
                                type="text"
                                label="Name of Buyer:"
                                name="buyerName"
                            />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "6px",
                                }}
                            >
                                <label
                                    className="my-font"
                                    style={{
                                        fontWeight: "600",
                                        fontSize: "15px",
                                    }}
                                    htmlFor="saleDate"
                                >
                                    Date of Sell:
                                </label>
                                <DatePicker onChange={onChange} />
                            </div>

                            <Button
                                className="my-font"
                                style={{
                                    fontSize: "15px",
                                    fontWeight: "600",
                                    height: "37px",
                                    marginTop: "4px",
                                }}
                                type="primary"
                                htmlType="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EyeGlasses;

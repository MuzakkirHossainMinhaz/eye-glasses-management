/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Select, Space, Table } from "antd";
import type {
    InputRef,
    TableColumnType,
    TableColumnsType,
    TableProps,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useGetAllSalesQuery } from "../../../redux/features/sales/salesApi";

type OnChange = NonNullable<TableProps<any>["onChange"]>;
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

type TDataType = {
    productId: string;
    quantity: number;
    buyerName: string;
    saleDate: string;
    sellerId: string;
};

const SalesHistory = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});
    const [salesData, setSalesData] = useState<TDataType[]>([]);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps["confirm"],
        dataIndex: any
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleChange: OnChange = (_pagination, _filters, sorter) => {
        setSortedInfo(sorter as Sorts);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
    };

    const { data, isLoading } = useGetAllSalesQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

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

    const columns: TableColumnsType<any> = [
        {
            title: "Buyer Name",
            dataIndex: "buyerName",
            ...getColumnSearchProps("buyerName"),
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
            title: "Sell of the Date",
            dataIndex: "saleDate",
        },
    ];

    const onChange = (value: string) => {
        const currentDate = new Date();

        let filteredData: TDataType[] = [...(data?.data || [])];

        // Define the date range based on the selected category
        switch (value) {
            case "weekly":
                // Filter data for the current week
                const startOfWeek = new Date(currentDate);
                startOfWeek.setHours(0, 0, 0, 0); // Set to the beginning of the day
                startOfWeek.setDate(
                    currentDate.getDate() - currentDate.getDay()
                ); // Go back to the start of the week
                filteredData = filteredData.filter(
                    (sale) => new Date(sale.saleDate) >= startOfWeek
                );
                break;

            case "daily":
                // Filter data for the current day
                const startOfDay = new Date(currentDate);
                startOfDay.setHours(0, 0, 0, 0); // Set to the beginning of the day
                filteredData = filteredData.filter(
                    (sale) => new Date(sale.saleDate) >= startOfDay
                );
                break;

            case "monthly":
                // Filter data for the current month
                const startOfMonth = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    1
                );
                filteredData = filteredData.filter(
                    (sale) => new Date(sale.saleDate) >= startOfMonth
                );
                break;

            case "yearly":
                // Filter data for the current year
                const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
                filteredData = filteredData.filter(
                    (sale) => new Date(sale.saleDate) >= startOfYear
                );
                break;

            default:
                // No filter applied for unknown category
                break;
        }

        // Update the salesData state with the filtered data
        setSalesData(filteredData);
    };

    useEffect(() => {
        onChange("weekly"); // Set the default category to "weekly"
    }, [data]);

    return (
        <div>
            <div style={{ marginBottom: 16, maxWidth: 250 }}>
                <p
                    className="my-font"
                    style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}
                >
                    Categorized By:
                </p>
                <Select
                    style={{ width: "100%" }}
                    placeholder="Select an option"
                    onChange={onChange}
                    defaultValue={"weekly"}
                    options={[
                        {
                            label: "Weekly",
                            value: "weekly",
                        },
                        {
                            label: "Daily",
                            value: "daily",
                        },
                        {
                            label: "Monthly",
                            value: "monthly",
                        },
                        {
                            label: "Yearly",
                            value: "yearly",
                        },
                    ]}
                />
            </div>
            <Table
                rowSelection={rowSelection}
                loading={isLoading}
                pagination={{ pageSize: 10 }}
                bordered
                rowKey={(record) => record._id}
                columns={columns}
                dataSource={salesData}
                onChange={handleChange}
            />
        </div>
    );
};

export default SalesHistory;

// src/pages/orders/list.tsx
import { List, useTable, DateField, ShowButton } from "@refinedev/antd";
import { Table, Tag } from "antd";

export const OrderList = () => {
  const { tableProps } = useTable({
    resource: "orders",
    syncWithLocation: true,
  });
  console.log("🚀 ~ OrderList ~ tableProps:", tableProps);

  const data = (tableProps.dataSource as any)?.orders ?? [];
  console.log("🚀 ~ OrderList ~ data:", data);

  return (
    <List>
      <Table
        {...tableProps}
        rowKey="_id"
        dataSource={data} // Đây là mảng docs đã tách sẵn
      >
        <Table.Column
          title="Khách hàng"
          dataIndex={["user", "name"]}
          render={(name: string) => name || "Không có"}
        />
        <Table.Column
          title="SĐT"
          dataIndex={["user", "phone"]}
          render={(phone: string) => phone || "Không có"}
        />
        <Table.Column
          title="Tổng tiền"
          dataIndex="totalAmount"
          render={(amount: number) => amount?.toLocaleString("vi-VN") + "đ"}
        />
        <Table.Column
          title="Trạng thái"
          dataIndex="status"
          render={(status: string) => {
            const colorMap: Record<string, string> = {
              pending: "orange",
              confirmed: "blue",
              shipped: "cyan",
              delivered: "green",
              cancelled: "red",
            };
            return <Tag color={colorMap[status] || "default"}>{status}</Tag>;
          }}
        />
        <Table.Column
          title="Ngày tạo"
          dataIndex="createdAt"
          render={(value: string) => (
            <DateField value={value} format="DD/MM/YYYY HH:mm" />
          )}
        />
        <Table.Column
          title="Hành động"
          render={(_, record: any) => (
            <ShowButton hideText recordItemId={record._id} />
          )}
        />
      </Table>
    </List>
  );
};

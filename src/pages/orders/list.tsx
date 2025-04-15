// src/pages/orders/list.tsx
import { List, useTable, DateField, ShowButton } from "@refinedev/antd";
import { Table, Tag } from "antd";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Chờ xác nhận":
      return "orange";
    case "Đã xác nhận":
      return "blue";
    case "Người bán huỷ":
      return "red";
    case "Người mua huỷ":
      return "red";
    case "Đang giao hàng":
      return "cyan";
    case "Giao hàng thành công":
      return "green";
    case "Giao hàng thất bại":
      return "volcano";
    case "Chờ thanh toán":
      return "gold";
    case "Đã thanh toán":
      return "purple";
    case "Huỷ do quá thời gian thanh toán":
      return "magenta";
    default:
      console.warn("Trạng thái không xác định:", status);
      return "default";
  }
};

interface Order {
  _id: string;
  user: { name: string; phone: string };
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface OrdersResponse {
  orders: Order[];
}

export const OrderList = () => {
  const { tableProps } = useTable<OrdersResponse>({
    resource: "orders",
    syncWithLocation: true,
  });

  // Trích xuất mảng orders từ dữ liệu API
  const data = Array.isArray(tableProps.dataSource?.orders)
    ? tableProps.dataSource.orders
    : [];
  console.log("🚀 ~ OrderList ~ data:", data);

  return (
    <List>
      <Table {...tableProps} rowKey="_id" dataSource={data}>
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
          render={(status: string) => (
            <Tag color={getStatusColor(status || "default")}>
              {status || "Không xác định"}
            </Tag>
          )}
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

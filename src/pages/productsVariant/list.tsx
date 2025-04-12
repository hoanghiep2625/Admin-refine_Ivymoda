import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { Space, Table, Image } from "antd";

export const ProductVariantList = () => {
  const { tableProps } = useTable({
    resource: "variants",
    syncWithLocation: true,
  });

  const data = (tableProps.dataSource as any)?.docs ?? [];

  return (
    <List>
      <Table
        {...tableProps}
        dataSource={Array.isArray(data) ? data : []}
        rowKey="_id"
      >
        <Table.Column
          dataIndex={["productId", "name"]}
          title="Sản phẩm"
          render={(value) => value || "Không xác định"}
        />
        <Table.Column dataIndex="sku" title="SKU" />
        <Table.Column
          dataIndex={["color", "colorName"]}
          title="Màu"
          render={(value) => value || "Không xác định"}
        />
        <Table.Column dataIndex="price" title="Giá" />
        <Table.Column
          dataIndex={["images", "main", "url"]}
          title="Ảnh chính"
          render={(value) => <Image src={value} width={50} />}
        />
        <Table.Column
          title="Hành động"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record._id} />
              <ShowButton hideText size="small" recordItemId={record._id} />
              <DeleteButton hideText size="small" recordItemId={record._id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

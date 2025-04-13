import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { Space, Tree, Typography, Drawer } from "antd";
import { useState, useEffect } from "react";

const { Text } = Typography;

export const CategoryList = () => {
  const { tableProps } = useTable({
    resource: "categories",
    syncWithLocation: true,
  });

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (tableProps?.dataSource) {
      const response = tableProps.dataSource as unknown as { docs: any[] };
      const rawData = Array.isArray(response.docs) ? response.docs : [];
      setData(rawData);
    }
  }, [tableProps?.dataSource]);

  const categoryMap = new Map(data.map((cat: any) => [cat._id, cat.name]));

  const generateTreeData = (
    items: any[],
    parentId: string | null = null
  ): any[] => {
    return items
      .filter((item) => item.parentId === parentId)
      .map((item) => ({
        title: item.name,
        key: item._id,
        value: item._id,
        children: generateTreeData(items, item._id),
      }));
  };

  const handleSelectCategory = (selectedKeys: React.Key[]) => {
    const selectedId = selectedKeys[0] as string;
    setSelectedCategoryId(selectedId);
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedCategoryId(null);
  };

  return (
    <List title="Danh sách danh mục">
      <Tree
        treeData={generateTreeData(data)}
        defaultExpandAll
        onSelect={handleSelectCategory}
        expandedKeys={expandedKeys}
        onExpand={(keys) => setExpandedKeys(keys as string[])}
      />

      {selectedCategoryId && (
        <Drawer
          title="Chi tiết danh mục"
          open={drawerVisible}
          onClose={handleCloseDrawer}
          width={400}
        >
          <Text strong>Chi tiết danh mục:</Text>
          <p>Tên: {categoryMap.get(selectedCategoryId)}</p>
          <Space>
            <EditButton
              hideText
              size="small"
              recordItemId={selectedCategoryId}
            />
            <ShowButton
              hideText
              size="small"
              recordItemId={selectedCategoryId}
            />
            <DeleteButton
              hideText
              size="small"
              recordItemId={selectedCategoryId}
            />
          </Space>
        </Drawer>
      )}
    </List>
  );
};

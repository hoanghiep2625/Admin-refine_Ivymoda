import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const ProductEdit = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "products",
    action: "edit",
    meta: {
      updateResource: "admin/products",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="SKU"
          name="sku"
          rules={[{ required: true, message: "Vui lòng nhập SKU" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name={["categoryId"]}
          rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
        >
          <Select
            placeholder="Chọn danh mục"
            options={[
              { label: "Áo sơ mi", value: "67ecff047884e0fcf7e12625" },
              // thêm danh mục nếu cần
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Mô tả ngắn"
          name="shortDescription"
          rules={[{ required: true, message: "Vui lòng nhập mô tả ngắn" }]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>

        <Form.Item label="Mô tả chi tiết" name="description">
          <ReactQuill
            theme="snow"
            value={formProps.form?.getFieldValue("description") || ""}
            onChange={(value) => {
              formProps.form?.setFieldsValue({ description: value });
            }}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};

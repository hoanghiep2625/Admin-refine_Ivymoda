import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";

const generateSKU = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length: 7 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

export const ProductCreate = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "admin/products",
  });

  useEffect(() => {
    formProps.form?.setFieldsValue({
      sku: generateSKU(),
    });
  }, []);

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        {/* Không hiển thị nhưng vẫn gửi lên */}
        <Form.Item name="sku" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
        >
          <Input />
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
            onChange={(value) =>
              formProps.form?.setFieldsValue({ description: value })
            }
            value={formProps.form?.getFieldValue("description") || ""}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};

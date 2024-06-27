import API from "../api";
import type { DataTypeText } from "../datatype";
import DataType from "../datatype";
import type { TranslatorLanguage } from "../language";

export default function ToolITT() {
  return async (data: DataTypeText) => {
    const { data: response } = await API.request.post("/itt/generate", {
      image: data.data,
      stream: false,
    });

    return new DataType.Text(response.response);
  };
}

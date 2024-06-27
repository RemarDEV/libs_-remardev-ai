import API from "../api";
import type { DataTypeText } from "../datatype";
import DataType from "../datatype";

export default function ToolTTM(max_tokens: number = 500) {
  return async (data: DataTypeText) => {
    const { data: response } = await API.request.post("/ttm/generate", {
      prompt: data.data,
      max_tokens: max_tokens,
      stream: false,
    });

    return new DataType.Audio(response.response);
  };
}

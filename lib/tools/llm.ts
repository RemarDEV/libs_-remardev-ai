import API from "../api";
import type { DataTypeText } from "../datatype";
import DataType from "../datatype";

export default function ToolLLM(prompt: string) {
  return async (data: DataTypeText) => {
    const { data: response } = await API.request.post("/llm/generate", {
      prompt: prompt.replaceAll("{data}", data.data),
      stream: false,
    });

    return new DataType.Text(response.response);
  };
}

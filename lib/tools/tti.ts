import API from "../api";
import type { DataTypeText } from "../datatype";
import DataType from "../datatype";

export default function ToolTTI(
  prompt: string,
  width: number,
  height: number,
  inference_steps: number
) {
  return async (data: DataTypeText) => {
    const { data: response } = await API.request.post("/tti/generate", {
      prompt: prompt.replaceAll("{data}", data.data),
      width: width,
      height: height,
      inference_steps: inference_steps,
      stream: false,
    });

    return new DataType.Image(response.response);
  };
}

import API from "../api";
import type { DataTypeImage, DataTypeText } from "../datatype";
import DataType from "../datatype";

export default function ToolTTIUpscale() {
  return async (data: DataTypeImage) => {
    const { data: response } = await API.request.post("/tti/upscale", {
      image: data.data,
      stream: false,
    });

    return new DataType.Image(response.response);
  };
}

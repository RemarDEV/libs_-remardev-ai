import API from "../api";
import type { DataTypeAudio, DataTypeText } from "../datatype";
import DataType from "../datatype";

export default function ToolSTT(type: "wav" | "m4a" = "wav") {
  return async (data: DataTypeAudio) => {
    const { data: response } = await API.request.post("/stt/generate", {
      audio:
        data.data.split("base64,").length > 1
          ? data.data.split("base64,")[1]
          : data.data,
      type: type,
    });

    return new DataType.Text(response.response);
  };
}

import API from "../api";
import type { DataTypeImage, DataTypeText } from "../datatype";
import DataType from "../datatype";

export default function ToolObjectDetection(treshold: number = 0.5) {
  return async (data: DataTypeImage) => {
    const { data: response } = await API.request.post(
      "/object-detection/generate",
      {
        image: data.data,
        treshold: treshold,
        stream: false,
      }
    );

    return new DataType.ObjectDetectionTargets(response.response);
  };
}

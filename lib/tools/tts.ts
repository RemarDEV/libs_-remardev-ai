import API from "../api";
import type { DataTypeText } from "../datatype";
import DataType from "../datatype";

export default function ToolTTS(speaker_id: string) {
  return async (data: DataTypeText) => {
    const { data: response } = await API.request.post("/tts/generate", {
      text: data.data,
      speaker_id,
      stream: false,
    });

    return new DataType.Audio(response.response);
  };
}

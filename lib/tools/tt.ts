import API from "../api";
import type { DataTypeText } from "../datatype";
import DataType from "../datatype";
import type { TranslatorLanguage } from "../language";

export default function ToolTT(
  src_lang: TranslatorLanguage,
  tgt_lang: TranslatorLanguage
) {
  return async (data: DataTypeText) => {
    const { data: response } = await API.request.post("/tt/generate", {
      text: data.data,
      src_language: src_lang,
      tgt_language: tgt_lang,
      stream: false,
    });

    return new DataType.Text(response.response);
  };
}

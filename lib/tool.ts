import ToolITT from "./tools/itt";
import ToolLLM from "./tools/llm";
import ToolObjectDetection from "./tools/object-detection";
import ToolSTT from "./tools/stt";
import ToolTT from "./tools/tt";
import ToolTTI from "./tools/tti";
import ToolTTIUpscale from "./tools/tti_upscale";
import ToolTTM from "./tools/ttm";
import ToolTTS from "./tools/tts";

const Tool = {
  LLM: ToolLLM,
  TTS: ToolTTS,
  STT: ToolSTT,
  TTM: ToolTTM,
  TT: ToolTT,
  TTI: ToolTTI,
  TTIUpscale: ToolTTIUpscale,
  ObjDet: ToolObjectDetection,
  ITT: ToolITT,

  TextToText: ToolLLM,
  TextToSpeech: ToolTTS,
  SpeechToText: ToolSTT,
  TextToMusic: ToolTTM,
  TextTranslation: ToolTT,
  TextToImage: ToolTTI,
  TextToImageUpscale: ToolTTIUpscale,
  ObjectDetection: ToolObjectDetection,
  ImageToText: ToolITT,
};

export default Tool;

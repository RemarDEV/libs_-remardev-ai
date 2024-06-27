# RemarDEV AI

Wrapper for RemarDEV AI API, with support for RemarDEV AI Pipelines.

## ! Experimental !

This package is still in early phases of development. It is possible that some features may not work as intented, some server crashes may also occur. The library could also undergo some breaking changes in the future. We will be glad for any feedback or bug reports (our [contact](https://www.remardev.com#contact)).

## Installation

First, you need to install this package using npm:

```bash
npm install @remardev/ai
```

Alternatively, you can use yarn:

```bash
yarn add @remardev/ai
```

Or, you can also use bun:

```bash
bun add @remardev/ai
```

After you installed the package, you will need to create a new RemarDEV AI API key, which you can get from [RemarDEV AI Developer Dashboard](https://ai.remardev.com/developer).

## Usage

First, you need to import the package and set the API key:

```typescript
import { API } from "@remardev/ai";

API.setToken("YOUR_API_KEY");
```

You need to do this before using any of the AI tools or API endpoints.

## Pipelines

```typescript
import { Pipeline } from "@remardev/ai";
```

### What are pipelines?

Pipelines allow you to chain multiple AI tools together, as you like (as long as you follow the correct data types) and run them at once. This allows you to create complex AI applications with ease. Pipelines will handle all basic data types for you, so you don't have to worry about converting them.

### How to create pipeline?

We will start by creating a new pipeline:

```typescript
const myPipeline = new Pipeline(
  Pipeline.source,
  Tool.LLM("Tell me a story about {data}."),
  Tool.TTS(Voice.Dave)
);
```

This will create a new pipeline you can use. This pipeline will take the given source (we will pass it later), and generate a story about it using the LLM tool and then convert it into speech using TTS tool. The prompt is given to the LLM tool as a string, where `{data}` is replaced with the input data (see Placeholders below).

### How to run pipeline?

To run the pipeline, you need to call the `run` method on the pipeline and pass the source data:

```typescript
// Create a new text data type
const myDataType = new DataType.Text("Hello, World!");

const result = await myPipeline.run(myDataType);
```

Now, in the result you have the final data, which is audio data type, you can now use it as you like, for example save it as a file:

```typescript
result.saveToFile("output.wav");
```

## Data Types

Data types are the basic building blocks of our AI tools. They allow you to process and pass data between the tools and pipelines. There are multiple data types available. You pass your data in the correct format to the data type and it transforms it into the correct format for the AI tool. Data types also have set of different methods you can use to manipulate the data.

```typescript
import { DataType } from "@remardev/ai";
```

### Text

```typescript
const textData = new DataType.Text("<Your text here>");
```

#### Methods

#### Properties

`data` - text that is stored in the data type.

### Image

```typescript
const imageData = new DataType.Image("<Your image base64 or file path here>");
```

Base64 URL is the only supported input for now.

#### Methods

`saveToFile(path: string)` - saves the image to the file path.

#### Properties

`data` - image that is stored in the data type, base64 URL.

### Audio

```typescript
const audioData = new DataType.Audio(
  "<Your audio base64, wav data, or file path here>"
);
```

Base64 is the only supported input for now.

### ObjectDetectionTargets

This data type is used to store object detection targets. It is used as output of the Object Detection tool.

```typescript
const objectDetectionTargetsData = new DataType.ObjectDetectionTargets([
  {
    label: "car",
    bbox: {
      x: 0.1,
      y: 0.1,
      w: 0.2,
      h: 0.2,
    },
    score: 0.4,
  },
]);
```

#### Methods

`saveToFile(path: string)` - saves the audio to the file path.

#### Properties

`data` - audio that is stored in the data type, base64.

## Tools

Available tools for you to use. Each is priced differently (see our [pricing](https://ai.remardev.com/developer/pricing)). These tools are designed to be used in pipelines and can be chained together.

```typescript
import { Tool } from "@remardev/ai";
```

### Large Language Model (LLM)

This tool is used to generate text based on the input data. It is a powerful tool that can be used for many purposes, such as translation, summarization, and more. You pass it your prompt, you can get better results by trying different prompts. You can use placeholders like `{data}` in the prompt, which will be replaced with the input data.

```typescript
Tool.LLM("<Prompt here>");
```

The output is `DataType.Text`.

### Text-to-Speech (TTS)

This tool is used to convert text into speech. The text that is being said is the input data from previous item in the pipeline (tool or source). You need to pass the voice that is being used (see voice list).

```typescript
Tool.TTS(<Voice>);
```

for example with the Dave voice:

```typescript
Tool.TTS(Voice.Dave);
```

The output is `DataType.Audio`.

### Speech-to-Text (STT)

This tool is used to convert speech into text. The speech that is being converted is the input data from previous item in the pipeline (tool or source). Only supported language is English, for now.

```typescript
Tool.STT(<Format - m4a or wav - default is wav>);
```

for example with m4a format:

```typescript
Tool.STT("m4a");
```

The output is `DataType.Text`.

### Text-to-Music (TTM)

This tool is used to convert text into music. The text that is being converted is the input data from previous item in the pipeline (tool or source). You can pass the maximum number of tokens to generate (1 second should be around 55 tokens). We can currently only generate few hundred tokens at once, around 600.

```typescript
Tool.TTM(<number of tokens>);
```

for example with 300 tokens:

```typescript
Tool.TTM(300);
```

The output is `DataType.Audio`.

### Text-to-Image (TTI)

This tool is used to generate image from the input prompt. The prompt is passed into the `{data}` placeholder, which should be used in the prompt argument for the tool. You also need to pass the image width and height in pixels, this should be divisible by 8. We recommend using 512x512 pixels, you can then upscale the image using Text-to-Image Upscale tool (TTIUpscale). You can also pass the inference steps, which is the number of steps the model will take to generate the image (more steps = better quality, but slower), we recommend between 1 and 2 steps, maximum is 4.

```typescript
Tool.TTI("<Prompt here>", <width>, <height>, <inference steps>);
```

for example to generate image of a cat with something (passed from source or previous tool - `{data}`), 512x512 pixels, 2 inference steps:

```typescript
Tool.TTI("A cat, with a {data}", 512, 512, 2);
```

The output is `DataType.Image`.

### Text-to-Image Upscale (TTIUpscale)

This tool is used to upscale the image generated by Text-to-Image tool. The input image is passed from previous tool or source. Image will be upscaled 2x. Should be passed data directly from the Text-to-Image tool.

```typescript
Tool.TTIUpscale();
```

The output is `DataType.Image`.

### Object Detection

This tool is used to detect objects in the image. The input image is passed from previous tool or source. You can pass the confidence threshold, which is the minimum confidence for the object to be detected (0-1). We recommend using 0.5.

```typescript
Tool.ObjectDetection(<confidence threshold>);
```

for example with 0.5 confidence threshold:

```typescript
Tool.ObjectDetection(0.5);
```

The output is `DataType.ObjectDetectionTargets`.

### Image-to-Text (ITT)

This tool is used to extract text from images. It supports latex. The input image is passed from previous tool or source.

```typescript
Tool.ITT();
```

The output is `DataType.Text`.

## Placeholders

Placeholders are used in the prompts for the AI tools. They are replaced with the input data when the tool is run. The placeholders are in the format `{placeholder}`.

### Available placeholders

- `{data}` - The input data, in the correct format for the tool. They are obtained from previous tool in the pipeline or the source data (if there is no tool before).

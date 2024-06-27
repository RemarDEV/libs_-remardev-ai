import type { DataTypeAudio, DataTypeText } from "./datatype";

export default class Pipeline {
  pipes: ((data: any) => any)[];
  sourceData: any = null;

  constructor(...pipes: ((data: any) => any)[]) {
    this.pipes = pipes;
  }

  run(source: any): Promise<DataTypeText | DataTypeAudio> {
    this.sourceData = source;

    return new Promise(async (res, rej) => {
      let data = this;
      for (let i = 0; i < this.pipes.length; i++) {
        data = await this.pipes[i](data);
      }

      res(data as any);
    });
  }

  static source(pipe: Pipeline) {
    return pipe.sourceData;
  }
}

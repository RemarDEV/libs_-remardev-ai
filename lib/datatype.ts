import axios from "axios";

export class DataTypeDefault {
  data: any;

  constructor(data: any) {
    this.data = data;
  }

  toString() {
    return this.data.toString();
  }

  async fromUrl(url: string) {}

  saveToFile(path: string) {}
}

export class DataTypeText extends DataTypeDefault {
  data: string;

  constructor(data: string) {
    super(data);

    this.data = data;
  }

  /*async saveToFile(path: string) {
    const fs: any = await vsi("fs");
    fs.writeFileSync(path, this.data);
  }*/
}

export class DataTypeAudio extends DataTypeDefault {
  data: string;

  constructor(data: string) {
    super(data);

    this.data = data;
  }

  /*async saveToFile(path: string) {
    const fs: any = await vsi("fs");
    fs.writeFileSync(path, this.data, "base64");
  }*/
}

export class DataTypeImage extends DataTypeDefault {
  data: string;

  constructor(data: string) {
    super(data);

    this.data = data;
  }

  /*async saveToFile(path: string): Promise<void> {
    const fs: any = await vsi("fs");
    fs.writeFileSync(path, this.data.split("base64,")[1], "base64");
  }*/

  async fromUrl(url: string) {
    const { data } = await axios.get(url, { responseType: "arraybuffer" });

    this.data = Buffer.from(data, "binary").toString("base64");
  }
}

export class DataTypeObjectDetectionTargets extends DataTypeDefault {
  data: string;

  constructor(data: string) {
    super(data);

    this.data = data;
  }
}

const DataType = {
  Text: DataTypeText,
  Audio: DataTypeAudio,
  Image: DataTypeImage,
  ObjectDetectionTargets: DataTypeObjectDetectionTargets,
};

export default DataType;

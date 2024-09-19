import { pipeline, FeatureExtractionPipeline, env } from "@xenova/transformers";
import { hash, hex, Embedded } from "./common";

export interface ModelLoadingStatus {
  status: string;
}

export interface ModelLoadingInitiate extends ModelLoadingStatus {
  status: "initiate";
  name: string;
  file: string;
}

export interface ModelLoadingDownload extends ModelLoadingStatus {
  status: "download";
  name: string;
  file: string;
}

export interface ModelLoadingProgress extends ModelLoadingStatus {
  status: "progress";
  name: string;
  file: string;
  progress: number;
  loaded: number;
  total: number;
}

export interface ModelLoadingDone extends ModelLoadingStatus {
  status: "done";
  name: string;
  file: string;
}

export interface ModelLoadingReady extends ModelLoadingStatus {
  status: "ready";
  task: string;
  model: string;
}

export interface EmbeddingOptions {
  model?: string;
  progress_callback?: (status: ModelLoadingStatus) => void;
}

export class Embedding {
  static model = "Xenova/all-MiniLM-L6-v2";
  static instance: FeatureExtractionPipeline | null = null;

  static async getInstance(opts?: EmbeddingOptions) {
    if (import.meta.env.DEV) {
      env.allowLocalModels = false;
      env.useBrowserCache = false;
    }

    if (this.instance !== null) {
      return new this(this.instance);
    } else {
      const instance = await pipeline<"feature-extraction">(
        "feature-extraction",
        opts?.model || this.model,
        {
          quantized: true,
          progress_callback: opts?.progress_callback,
        },
      );
      this.instance = instance;
      return new this(instance);
    }
  }

  pipeline: FeatureExtractionPipeline;

  constructor(pipeline: FeatureExtractionPipeline) {
    this.pipeline = pipeline;
  }

  async embed(text: string): Promise<Embedded> {
    return (await this.embeds([text]))[0];
  }

  async embeds(texts: string[]): Promise<Embedded[]> {
    const result = await this.pipeline(texts, {
      pooling: "mean",
      normalize: true,
    });

    const ids = (await Promise.all(texts.map(hash))).map(hex);
    const vectors: number[][] = result.tolist();
    return texts.map((text, i) => ({
      id: ids[i],
      text,
      vector: new Float32Array(vectors[i]),
    }));
  }
}

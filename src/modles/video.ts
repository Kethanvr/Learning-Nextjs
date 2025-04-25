import mongoose, { model, models, Schema } from "mongoose";

export const VideoDimensions = {
  width: 1080,
  height: 1920,
} as const;

export interface Ivideo {
  _id?: string;
  title: string;
  desciption: string;
  videourl: string;
  thumbnailurl: string;
  controls?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
}

const Videoschema = new Schema<Ivideo>({
  title: { type: String, required: true },
  desciption: {
    type: String,
    required: true,
  },
  videourl: {
    type: String,
    required: true,
  },
  thumbnailurl: {
    type: String,
    required: true,
  },
  controls: {
    type: Boolean,
    default: true,
  },
  transformation: {
    height: { type: Number, default: VideoDimensions.height },
    width: { type: Number, default: VideoDimensions.width },

    quality: { type: Number, min: 1, max: 100 },
  },
});

const Video = models?.Video || model<Ivideo>("Video",Videoschema)

export default Video
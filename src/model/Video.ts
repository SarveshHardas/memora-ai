import mongoose, { Schema, Document } from 'mongoose';

export interface Video extends Document {
    channel_id: string;
    video_id: string;
    createdAt: Date;
    updatedAt: Date;
}

export const VideoSchema : Schema<Video> = new Schema({
    channel_id: { type: String, required: true },
    video_id: { type: String, required: true },
},{ timestamps: true });

const VideoModel = (mongoose.models.Video as mongoose.Model<Video>) || mongoose.model<Video>('Video', VideoSchema);

export default VideoModel;

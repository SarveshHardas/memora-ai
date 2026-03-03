import { Schema, Document } from 'mongoose';

export interface Video extends Document {
    channel_id: string;
    title: string;
    description: string;
    duration: number;
    status: 'ingested' | 'transcribing' | 'indexed' | 'failed';
    createdAt: Date;
    updatedAt: Date;
}

export const VideoSchema : Schema<Video> = new Schema({
    channel_id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    status: { type: String, enum: ['ingested', 'transcribing', 'indexed', 'failed'], default: 'ingested' }
},{ timestamps: true });

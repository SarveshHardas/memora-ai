import mongoose, { Schema, Types } from 'mongoose';

export interface Transcript {
    video_id: Types.ObjectId;
    start_time: number;
    end_time: number;
    text?: string;
    createdAt: Date;
    updatedAt: Date;
}

export const TranscriptSchema: Schema<Transcript> = new Schema<Transcript>({
    video_id: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
    start_time: { type: Number, required: true },
    end_time: { type: Number, required: true },
    text: { type: String, required: false }
}, { timestamps: true });

const TranscriptModel = (mongoose.models.Transcript as mongoose.Model<Transcript>) || mongoose.model<Transcript>('Transcript', TranscriptSchema);

export default TranscriptModel;

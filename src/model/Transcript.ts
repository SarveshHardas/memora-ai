import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface Transcript extends Document {
    video_id: ObjectId;
    start_time: number;
    end_time: number;
    text?: string;
    embedding_id: string;
    createdAt: Date;
    updatedAt: Date;
}

export const TranscriptSchema : Schema<Transcript> = new Schema({
    video_id: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
    start_time: { type: Number, required: true },
    end_time: { type: Number, required: true },
    text: { type: String, required: false },
    embedding_id: { type: String, required: true }
},{ timestamps: true });

const TranscriptModel = (mongoose.models.Transcript as mongoose.Model<Transcript>) || mongoose.model<Transcript>('Transcript', TranscriptSchema);

export default TranscriptModel;

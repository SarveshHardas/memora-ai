import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface Clip extends Document {
    video_id: ObjectId;
    start_time: number;
    end_time: number;
    video_url: string;
    status: 'generating' | 'ready' |'failed';
    createdAt: Date;
    updatedAt: Date;
}

export const ClipSchema : Schema<Clip> = new Schema({
    video_id: { type: Schema.Types.ObjectId, required: true, ref: 'Video' },
    start_time: { type: Number, required: true },
    end_time: { type: Number, required: true },
    video_url: { type: String, required: true },
    status: { type: String, enum: ['generating', 'ready', 'failed'], default: 'generating' }
},{ timestamps: true });

const clipModel = (mongoose.models.Clip as mongoose.Model<Clip>) || mongoose.model<Clip>('Clip', ClipSchema);

export default clipModel;
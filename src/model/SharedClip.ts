import { Schema, Document, ObjectId } from 'mongoose';

export interface SharedClip extends Document {
    clip_id: ObjectId;
    public_token: string;
    video_url: string;
    createdAt: Date;
    updatedAt: Date;
}

export const SharedClipSchema : Schema<SharedClip> = new Schema({
    clip_id: { type: Schema.Types.ObjectId, required: true, ref: 'Clip' },
    public_token: { type: String, required: true, unique: true },
    video_url: { type: String, required: true },
},{ timestamps: true });

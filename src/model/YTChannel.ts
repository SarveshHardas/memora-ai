import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface YTChannel extends Document {
    user_id: ObjectId;
    channel_id: string;
    channel_name: string;
    access_token: string;
    refresh_token: string;
    createdAt: Date;
    updatedAt: Date;
}

export const YTChannelSchema : Schema<YTChannel> = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    channel_id: { type: String, required: true, unique: true },
    channel_name: { type: String, required: true },
    access_token: { type: String, required: true },
    refresh_token: { type: String, required: true },
},{ timestamps: true });

const YTChannelModel = (mongoose.models.YTChannel as mongoose.Model<YTChannel>) || mongoose.model<YTChannel>('YTChannel', YTChannelSchema);

export default YTChannelModel;
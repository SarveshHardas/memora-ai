import mongoose, { Schema, Document, models } from 'mongoose';

export interface User extends Document {
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema : Schema<User> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
},{ timestamps: true });

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema);

export default UserModel;
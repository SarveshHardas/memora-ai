import { Schema, Document } from 'mongoose';

export interface User extends Document {
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export const UserSchema : Schema<User> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
},{ timestamps: true });

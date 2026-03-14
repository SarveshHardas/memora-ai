import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface Accounts extends Document {
    access_token: string;
    id_token: string;
    expires_at: number;
    scope: string;
    token_type: string;
    providerAccountId: string;
    provider: string;
    type: string;
    userId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export const AccountsSchema : Schema<Accounts> = new Schema({
    access_token: { type: String, required: true },
    id_token: { type: String, required: true },
    expires_at: { type: Number, required: true },
    scope: { type: String, required: true },
    token_type: { type: String, required: true },
    providerAccountId: { type: String, required: true, unique: true },
    provider: { type: String, required: true },
    type: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
},{ timestamps: true });

const AccountsModel = (mongoose.models.Accounts as mongoose.Model<Accounts>) || mongoose.model<Accounts>('Accounts', AccountsSchema);

export default AccountsModel;

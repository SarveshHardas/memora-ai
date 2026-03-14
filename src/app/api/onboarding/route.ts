import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/dbConnect";
import Account from "@/model/Accounts";
import videoIngestion from "@/lib/videoIngestion";
import YTChannelModel from "@/model/YTChannel";
import { getVideos } from "@/lib/getVideos";
import { getChannelInfo } from "@/lib/getChannelInfo";

export async function GET(req: NextRequest) {
    const session = await auth();
    console.log("Session:", session);
    if(!session) {
        return NextResponse.json({ message: "User is not authenticated" }, { status: 401 });
    }
    connectDB();
    const accessToken = session.accessToken;
    if (!accessToken) {
        return NextResponse.json({ message: "Access token is missing" }, { status: 400 });
    }
    const channelInfo = await getChannelInfo(accessToken);
    console.log("Channel Info:", channelInfo);
    if (!channelInfo) {
        return NextResponse.json({ message: "Failed to retrieve channel info" }, { status: 500 });
    }
    if (!session.user || !session.user.id) {
        return NextResponse.json({ message: "User information is missing in session" }, { status: 400 });
    }
    try {
        const existingChannel = await YTChannelModel.findOne({ channel_id: channelInfo.channelId });
        if (existingChannel) {
            console.log("Channel already exists in database:", existingChannel);
            return NextResponse.json({ status: 200, message: "Onboarding completed" });
        }
        const newYTChannel = new YTChannelModel({
            user_id: session.user.id,
            channel_id: channelInfo.channelId,
            channel_name: channelInfo.title,
            access_token: accessToken
        });
        await newYTChannel.save();
    } catch (error) {
        console.error("Error saving YouTube channel:", error);
        return NextResponse.json({ message: "Failed to save YouTube channel" }, { status: 500 });
    }
    const videoUrls = await getVideos(accessToken);
    videoIngestion(videoUrls);
    return NextResponse.json({ status: 200, message: "Onboarding completed" });
}
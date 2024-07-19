import { connectionStr } from "./../../lib/db";
import { restaurantSchema } from "./../../lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    await mongoose.connect(connectionStr, {useNewUrlParser:true});
    const data = await restaurantSchema.find()
    return NextResponse.json({data})
}

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    await mongoose.connect(connectionStr, {useNewUrlParser:true});
    if(payload.login) {
        // use it for login
        result = await restaurantSchema.findOne({email:payload.email,password:payload.password});
        if (result) {
            success = true;
        }
    } else {
        // use it for signup
        const restaurant = new restaurantSchema(payload);
        result = await restaurant.save();
        if (result) {
            success = true;
        }
    }
    return NextResponse.json({success, result})
}
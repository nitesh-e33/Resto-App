import { connectionStr } from "../../../lib/db";
import { foodSchema } from "../../../lib/foodsModel";
import { restaurantSchema } from "../../../lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    const id = content.params.id;
    let success = false;
    await mongoose.connect(connectionStr, {useNewUrlParser:true});
    const details = await restaurantSchema.findOne({_id:id});
    const foodItems = await foodSchema.find({resto_id:id}); 
    if(details || foodItems) {
        success = true;
    }
    return NextResponse.json({success,details,foodItems});
}
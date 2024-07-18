import { connectionStr } from "../../../../lib/db";
import { foodSchema } from "../../../../lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    const id = content.params.id;
    let success = false;
    await mongoose.connect(connectionStr, {useNewUrlParser:true});
    const result = await foodSchema.find({resto_id:id});
    if(result) {
        success=true
    }
    return NextResponse.json({success,result})
}   

export async function DELETE(request, content) {
    const id = content.params.id;
    let success = false;
    await mongoose.connect(connectionStr, {useNewUrlParser:true});
    const result = await foodSchema.deleteOne({_id:id})
    if(result.deletedCount > 0){
        success = true;
    }
    return NextResponse.json({success,result})
}
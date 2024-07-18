import { connectionStr } from "./../../lib/db";
import { restaurantSchema } from "./../../lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
    let success = false;
    let queryParams = request.nextUrl.searchParams;
    let filter = {};

    let city = queryParams.get("location");
    let name = queryParams.get("restaurant");

    if (city && name) {
      filter = {
        $and: [
          { city: { $regex: new RegExp(city, 'i') } },
          { name: { $regex: new RegExp(name, 'i') } }
        ]
      };
    } else if (city) {
      filter = { city: { $regex: new RegExp(city, 'i') } };
    } else if (name) {
      filter = { name: { $regex: new RegExp(name, 'i') } };
    }
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    let result = await restaurantSchema.find(filter);
  
    if (result.length) {
      success = true;
    }

    return NextResponse.json({ success, result });
}

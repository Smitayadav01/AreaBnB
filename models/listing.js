const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://tse3.mm.bing.net/th/id/OIP.9k0JjGJhFH4tjGOUQbTdjQHaEL?pid=Api&P=0&h=220",
        set:(v)=>v===""? "https://tse3.mm.bing.net/th/id/OIP.9k0JjGJhFH4tjGOUQbTdjQHaEL?pid=Api&P=0&h=220" :v
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
        type: Schema.Types.ObjectId,
        ref:"Review",
        }
    ]
})

listingSchema.post("findByIdAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})

const listing=mongoose.model("listing",listingSchema);
module.exports=listing;
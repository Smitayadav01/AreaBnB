const mongoose=require("mongoose");
const Schema=mongoose.Schema;

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
    country:String
})

const listing=mongoose.model("listing",listingSchema);
module.exports=listing;
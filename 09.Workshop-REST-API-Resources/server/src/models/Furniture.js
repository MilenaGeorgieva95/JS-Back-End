import {Schema, model} from 'mongoose';

const furnitureSchema = new Schema({
    make: String,
    model:String,
    year: Number,
    description: String,
    price: Number,
    img: String,
    material: String,
});

const Furniture=model('Furniture', furnitureSchema);

export default Furniture;
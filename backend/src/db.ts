import mongoose, { mongo, Schema } from 'mongoose'

mongoose.connect("mongodb+srv://prakharkumar1314:4h0TKimFXaHO8MyJ@cluster0.kwskxal.mongodb.net/")

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
}, { collection: 'user' });

const User = mongoose.model('User', UserSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: "tag"}],
    userId: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }]
})

const ContentModel = mongoose.model("Content", ContentSchema);

const LinkSchema = new Schema({
    hash: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
});

const LinkModel = mongoose.model("Links", LinkSchema);

export { User, ContentModel, LinkModel};
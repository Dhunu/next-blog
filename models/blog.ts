import { Schema, model, models } from "mongoose";

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        content: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
            default: "/images/default-thumbnail.jpg",
        },
        images: [
            {
                type: String,
            },
        ],
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
        publishedAt: {
            type: Date,
            default: undefined,
        },
    },
    {
        timestamps: true,
    }
);

export default models?.Blog || model("Blog", blogSchema);

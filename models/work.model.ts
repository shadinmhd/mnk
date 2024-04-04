import WorkInterface from "@/interface/work.interface";
import mongoose from "mongoose";

const workSchema = new mongoose.Schema<WorkInterface>({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true
	},
	listed: {
		type: Boolean,
		default: false
	},
}, { timestamps: true })

const WorkModel = mongoose.models.Work || mongoose.model("Work", workSchema)
export default WorkModel

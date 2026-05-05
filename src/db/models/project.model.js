import mongoose from "mongoose";

export const statusProjectEnum = {'not_started':'not started','in_progress':'in progress','completed':'completed'};

const projectSchema = new mongoose.Schema({
  name:{ type: String,
     required: true ,
      minLength: [2,'Project name must be at least 2 character long'],
     maxLength: [50,'Project name cannot exceed 50 characters']
    },
description: {
type: String,
required: true,
minLength: [10,'Description must be at least 10 character long'],
maxLength: [500,'Description cannot exceed 500 characters']
},
status: {
type: String,
required: true,
enum: statusProjectEnum,
default: statusProjectEnum.not_started
},
ended_at: {
  type: Date,
  default: Date.now()
},
projectMember:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
  userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  reportId:{type: mongoose.Schema.Types.ObjectId, ref:"Report"},
  epicId:{type: mongoose.Schema.Types.ObjectId, ref:"Epic"},
  kanbanBoardId:{type: mongoose.Schema.Types.ObjectId, ref:"KanbanBoard"},
  companyId:{type: mongoose.Schema.Types.ObjectId, ref:"Company"},
  meetingId:{type:mongoose.Schema.Types.ObjectId, ref:"Meeting"},
  archived:{type:Boolean, default:false},
   
},{
    timestamps:true,
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
});

const Project = mongoose.model('Project',projectSchema);

export default Project;
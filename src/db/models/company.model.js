import mongoose from "mongoose";

export const subscriptionPlanEnum = {'free':'free','basic':'basic','premium':'premium'};

const companySchema = new mongoose.Schema({
  name:{ type: String,
     required: true ,
      minLength: [2,'Company name must be at least 2 character long'],
     maxLength: [50,'Company name cannot exceed 50 characters']
    },
  industry: {
type: String,
required: true,
minLength: [2,'Industry must be at least 2 character long'],
maxLength: [50,'Industry cannot exceed 50 characters']
  },
  subscriptionPlan: {
        type:String,
        required:true,
        enum:subscriptionPlanEnum,
        default:subscriptionPlanEnum.free,
  },
  userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  teamId:{type:mongoose.Schema.Types.ObjectId, ref:"Team"},
  projectId:{type:mongoose.Schema.Types.ObjectId, ref:"Project"},
   
},{
    timestamps:true,
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
});

const Company = mongoose.model('Company',companySchema);

export default Company;
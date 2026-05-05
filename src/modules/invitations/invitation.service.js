import Invitation from "../../db/models/invitation.model.js";
import crypto from "crypto";

export const generateInvitationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const getPendingInvitationByEmailService = async (email) => {
  return await Invitation.findOne({ emailInvited: email, status: 'pending' });
};

export const createInvitationService = async (data) => {
  return await Invitation.create(data);
};

export const getAllInvitationsService = async () => {
    return await Invitation.find();
};

export const getInvitationByIdService = async (id) => {
    return await Invitation.findById(id);
}

export const getInvitationByTokenService = async (token) => {
    return await Invitation.findOne({ token });
}

export const updateInvitationService = async (id, updateData) => {
    return await Invitation.findByIdAndUpdate(id, updateData, { new: true , runValidators: true});
}

export const deleteInvitationService = async (id) => {
    return await Invitation.findByIdAndDelete(id);
}
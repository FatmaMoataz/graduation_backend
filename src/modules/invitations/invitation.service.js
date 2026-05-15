import Invitation from "../../db/models/invitation.model.js";
import crypto from "crypto";

export const generateInvitationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const getPendingInvitationByEmailService = async (email) => {
  return await Invitation.findOne({ emailInvited: email, status: 'pending' });
};

export const createInvitationService = async (data) => {
  const invitation = await Invitation.create(data);

  return {
    success: true,
    message: "Invitation created successfully",
    data: invitation
  };
};

export const getAllInvitationsService = async () => {
  const invitations = await Invitation.find();

  return {
    success: true,
    results: invitations.length,
    data: invitations
  };
};

export const getInvitationByIdService = async (id) => {
  return await Invitation.findById(id);
};

export const getInvitationByTokenService = async (token) => {
  return await Invitation.findOne({ token });
};

export const handleInvitationResponseService = async (token, status) => {
  const invitation = await Invitation.findOne({ token });

  if (!invitation) {
    return {
      success: false,
      status: 404,
      message: "Invalid invitation token"
    };
  }

  if (invitation.expiresAt < Date.now()) {
    return {
      success: false,
      status: 400,
      message: "Invitation expired"
    };
  }

  if (invitation.status !== 'pending') {
    return {
      success: false,
      status: 400,
      message: "Invitation already used"
    };
  }

  const updated = await Invitation.findByIdAndUpdate(
    invitation._id,
    { status },
    { new: true }
  );

  return {
    success: true,
    message: `Invitation ${status}`,
    data: updated
  };
};

export const updateInvitationService = async (id, data, userId) => {
  const invitation = await Invitation.findById(id);

  if (!invitation) {
    return {
      success: false,
      status: 404,
      message: "Invitation not found"
    };
  }

  if (invitation.sentBy.toString() !== userId.toString()) {
    return {
      success: false,
      status: 403,
      message: "Unauthorized to update this invitation"
    };
  }

  if (invitation.status !== 'pending') {
    return {
      success: false,
      status: 400,
      message: "Cannot update invitation after it is used"
    };
  }

  const updatedInvitation = await Invitation.findByIdAndUpdate(
    id,
    { emailInvited: data.emailInvited },
    { new: true, runValidators: true }
  );

  return {
    success: true,
    message: "Invitation updated successfully",
    data: updatedInvitation
  };
};

export const deleteInvitationService = async (id, userId) => {
  const invitation = await Invitation.findById(id);

  if (!invitation) {
    return {
      success: false,
      status: 404,
      message: "Invitation not found"
    };
  }

  if (invitation.sentBy.toString() !== userId.toString()) {
    return {
      success: false,
      status: 403,
      message: "Unauthorized to delete this invitation"
    };
  }

  await Invitation.findByIdAndDelete(id);

  return {
    success: true,
    message: "Invitation deleted successfully"
  };
};
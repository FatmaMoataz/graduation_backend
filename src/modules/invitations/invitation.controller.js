import * as invitationService from '../invitations/invitation.service.js';
import { invitationStatusEnum } from '../../db/models/invitation.model.js';

export const createInvitation = async(req,res) => { 
try {
   const existing = await invitationService.getPendingInvitationByEmailService(req.body.emailInvited);
if(existing) {
  return res.status(400).json({ success: false, message: 'an active invitation already exists for this email' });
}

   const token = invitationService.generateInvitationToken();
   const invitation = await invitationService.createInvitationService({
      emailInvited: req.body.emailInvited,
      token,
      status: invitationStatusEnum.pending
   });
   res.status(201).json({ success: true, data: invitation });
} catch (error) {
   res.status(400).json({ success: false, message: error.message });
}
}

export const handleInvitationResponse = async (req, res) => {
  try {
    const token = req.params.token;

    const status = req.path.includes("accept")
      ? invitationStatusEnum.accepted
      : invitationStatusEnum.rejected;

    const invitation = await invitationService.getInvitationByTokenService(token);

    if (!invitation) {
      return res.status(404).json({
        success: false,
        message: "invalid invitation token"
      });
    }

    if (invitation.expiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "invitation expired"
      });
    }

    if (invitation.status !== invitationStatusEnum.pending) {
      return res.status(400).json({
        success: false,
        message: "already used"
      });
    }

    const updated = await invitationService.updateInvitationService(
      invitation._id,
      { status }
    );

    return res.status(200).json({
      success: true,
      message: `invitation ${status}`,
      data: updated
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllInvitations = async(req,res) => { 
 try {
    const invitations = await invitationService.getAllInvitationsService();
    res.status(200).json({ success: true, data: invitations });
 } catch (error) {
    res.status(500).json({ success: false, message: error.message });
 }
}

export const getInvitationById = async(req,res) => { 
 try {
    const invitation = await invitationService.getInvitationByIdService(req.params.id);
    if(!invitation) {
        return res.status(404).json({ success: false, message: 'invitation not found' });
    }
    return res.status(200).json({ success: true, data: invitation });
 } catch (error) {
    res.status(500).json({ success: false, message: error.message });
 }
}

export const getInvitationByToken = async(req,res) => { 
 try {
    const invitation = await invitationService.getInvitationByTokenService(req.params.token);
    if(!invitation) {
        return res.status(404).json({ success: false, message: 'invalid invitation token' });
    }
    if(invitation.status !== invitationStatusEnum.pending) {
        return res.status(400).json({ success: false, message: 'invitation is not pending' });
    }
    res.status(200).json({ success: true, data: invitation });
 } catch (error) {
    res.status(500).json({ success: false, message: error.message });
 }
}

export const updateInvitation = async (req, res) => {
  try {
    // if (!req.body || Object.keys(req.body).length === 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'no data provided to update'
    //   });
    // }

    const existingInvitation = await invitationService.getInvitationByIdService(req.params.id);

    if (!existingInvitation) {
      return res.status(404).json({
        success: false,
        message: 'invitation not found'
      });
    }

    if (existingInvitation.status !== invitationStatusEnum.pending) {
      return res.status(400).json({
        success: false,
        message: 'cannot update invitation after it is used'
      });
    }

    if (
      req.body.status &&
      !Object.values(invitationStatusEnum).includes(req.body.status)
    ) {
      return res.status(400).json({
        success: false,
        message: 'invalid status value'
      });
    }

    const updatedInvitation = await invitationService.updateInvitationService(
      req.params.id,
      {
        emailInvited: req.body.emailInvited,
      }
    );

    return res.status(200).json({
      success: true,
      data: updatedInvitation
    });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteInvitation = async(req,res) => { 
 try {
    const invitation = await invitationService.deleteInvitationService(req.params.id);
    if(!invitation) {
        return res.status(404).json({ success: false, message: 'invitation not found' });
    }
    return res.status(200).json({ success: true, message: 'invitation deleted successfully' });
 } catch (error) {
    res.status(500).json({ success: false, message: error.message });
 }
}
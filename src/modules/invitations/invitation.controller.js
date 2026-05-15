import * as invitationService from '../invitations/invitation.service.js';
import { invitationStatusEnum } from '../../db/models/invitation.model.js';

export const createInvitation = async (req, res, next) => {
  try {
    const existing = await invitationService.getPendingInvitationByEmailService(req.body.emailInvited);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An active invitation already exists for this email'
      });
    }

    const token = invitationService.generateInvitationToken();
    const result = await invitationService.createInvitationService({
      emailInvited: req.body.emailInvited,
      token,
      status: invitationStatusEnum.pending,
      sentBy: req.userId
    });

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export const handleInvitationResponse = async (req, res, next) => {
  try {
    const token = req.params.token;

    const status = req.path.includes("accept")
      ? invitationStatusEnum.accepted
      : invitationStatusEnum.rejected;

    const result = await invitationService.handleInvitationResponseService(token, status);

    if (!result.success) {
      return res.status(result.status || 400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export const getAllInvitations = async (req, res, next) => {
  try {
    const result = await invitationService.getAllInvitationsService();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export const getInvitationById = async (req, res, next) => {
  try {
    const result = await invitationService.getInvitationByIdService(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Invitation not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
}

export const getInvitationByToken = async (req, res, next) => {
  try {
    const result = await invitationService.getInvitationByTokenService(req.params.token);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Invalid invitation token'
      });
    }

    if (result.status !== invitationStatusEnum.pending) {
      return res.status(400).json({
        success: false,
        message: 'Invitation is not pending'
      });
    }

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
}

export const updateInvitation = async (req, res, next) => {
  try {
    const result = await invitationService.updateInvitationService(
      req.params.id,
      req.body,
      req.userId
    );

    if (!result.success) {
      return res.status(result.status || 400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export const deleteInvitation = async (req, res, next) => {
  try {
    const result = await invitationService.deleteInvitationService(
      req.params.id,
      req.userId
    );

    if (!result.success) {
      return res.status(result.status || 400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
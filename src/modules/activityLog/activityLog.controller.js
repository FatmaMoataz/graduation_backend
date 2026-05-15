import * as activityService from "./activityLog.service.js";

export const createActivity = async (req, res, next) => {
  try {
    const entity_type = req.params.entityType || req.body.entity_type;
    const entity_id = req.params.entityId || req.body.entity_id;

    if (!entity_type || !entity_id) {
      return res.status(400).json({
        success: false,
        message: "entity_type and entity_id must be provided either in the route or the body"
      });
    }

    const result = await activityService.createActivityService({
      ...req.body,
      entity_type,
      entity_id,
      userId: req.userId
    });

    return res.status(201).json(result);

  } catch (error) {
    next(error);
  }
};

export const getAllActivities = async (req, res, next) => {
  try {
    const result = await activityService.getAllActivitiesService();

    return res.status(200).json(result);

  } catch (error) {
    next(error);
  }
};

export const getSingleActivity = async (req, res, next) => {
  try {
    const result = await activityService.getSingleActivityService(
      req.params.id
    );

    // if (!result.success) {
    //   return res.status(result.status || 404).json(result);
    // }

    return res.status(200).json(result);

  } catch (error) {
    next(error);
  }
};

export const deleteActivity = async (req, res, next) => {
  try {
    const result = await activityService.deleteActivityService(
      req.params.id,
      req.userId
    );

    if (!result.success) {
      return res.status(result.status || 404).json(result);
    }

    return res.status(200).json(result);

  } catch (error) {
    next(error);
  }
};
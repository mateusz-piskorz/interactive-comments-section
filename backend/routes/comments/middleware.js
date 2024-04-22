const lastTimeUsed = {
  like: {},
  post: {},
};

// actionType: like | post
export const limitTime = (actionType) => {
  return async (req, res, next) => {
    let diff = 0;
    let canUse = false;
    const { userId } = req.body;
    if (lastTimeUsed[actionType][userId]) {
      diff = Date.now() - lastTimeUsed[actionType][userId];
      if (diff >= 60000) {
        canUse = true;
      }
    } else {
      canUse = true;
    }

    if (canUse) {
      lastTimeUsed[actionType][userId] = Date.now();
      next();
    } else {
      res.status(400).send({
        message: `You can only add one ${actionType} per 1 minute`,
        elapsedTime: diff,
      });
    }
  };
};

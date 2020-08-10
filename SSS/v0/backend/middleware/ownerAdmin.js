module.exports = function (req, res, next) {
    const store = await Store.findById(req.params._id);
    if (!req.user.isAdmin) return res.status(403).send("Access denied."); //403 if forbidden
    next();
  };
  
const permissionModel = require("../models/user/permissionModel");
const { errorHandler, pagination } = require("../helpers/customHelper");
const sequelize = require("../models");
const permissionController = {
  checkPermission: (requiredPermission) => {
    return async (req, res, next) => {
      try {
        const userId = req.decodeData.id;
        const roleId = req.decodeData.role_id;

        // console.log(req.decodeData);

        const userPermissions = await sequelize.query(
          `SELECT p.name FROM user_permissions up
                INNER JOIN permissions p ON p.id = up.permission_id AND p.deleted_at IS NULL
                WHERE up.deleted_at IS NULL AND up.user_id = 1 and up.role_id= 1
            `,
          {
            type: sequelize.QueryTypes.SELECT,
          }
        );
        const permissionNames = userPermissions.map(
          (permission) => permission.name
        );

        if (permissionNames.includes(requiredPermission)) {
          // console.log(userPermissions);
          next();
        } else {
          // User does not have permission
          res.status(403).json({ error: "Forbidden" });
        }

        // if (userPermissions.includes(requiredPermission)) {
        //   // User has permission, proceed to the next middleware or route handler
        //   next();
        // } else {
        //   // User does not have permission
        //   res.status(403).json({ error: "Forbidden" });
        // }
      } catch (error) {
        // Handle database error
        console.error("Error checking permission:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    };
  },
  getAll: async (req, res) => {
    try {
      const pagination_data = {};
      pagination_data.page = parseInt(req.query.page);
      pagination_data.per_page = parseInt(req.query.per_page);

      let paginate = await pagination(pagination_data);

      const data = await permissionModel.findAndCountAll({
        where: { deleted_at: null },
        offset: paginate.offset,
        limit: paginate.limit,
      });
      paginate.total_rows = data.count;
      paginate.total_pages = Math.ceil(data.count / paginate.limit);

      return res.json({
        message: "Get Permission",
        data: data.rows,
        meta: paginate,
      });
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
  addPermission: async (req, res, next) => {
    let postData = req.body;
    try {
      const result = await permissionModel.create(postData);
      res.status(201).send(result);
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
  updatePermission: async (req, res, next) => {
    let id = req.params.id;

    if (typeof id != "number" || id <= 0) {
      res
        .status(400)
        .json({ errors: [{ param: "Invalid Parameter", id: id }] });
    }

    let postData = req.body;

    try {
      const result = await permissionModel.update(postData, {
        where: { id: id },
      });
      if (result == 1) {
        res.status(200).json({ message: "Successfully Updated!" });
      }
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
  removePermission: async (req, res, next) => {
    let id = req.params.id;

    if (typeof id != "number" || id <= 0) {
      res.status(400).json({ errors: [{ param: "Invalid Parameter" }] });
    }

    try {
      const result = await permissionModel.destroy({
        where: { id: id },
      });
      if (result == 1) {
        res.status(200).json({ message: "Successfully Removed!" });
      }
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
};

module.exports = permissionController;

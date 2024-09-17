const express = require("express");
const router = express.Router();
const {getAdmins, updateAdmin, deleteAdmin, createAdmin}   = require('../handlers/admin.handler')


router.route('/api/admins')
.get(getAdmins)


router.route('/api/admin')
.post(createAdmin)


router.route('/api/admin/:adminId')
.patch(updateAdmin)
.delete(deleteAdmin)



module.exports = router;
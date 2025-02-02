const express = require("express");

const {
  create,
  lists,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const router = express.Router();

router.route("/").post(create).get(lists);
router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;

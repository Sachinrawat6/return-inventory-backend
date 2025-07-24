const express = require("express");
const { pendingOrders, addToConfirmOrders, addToCancelOrders, addToPendingOrder, editPendingOrders } = require("../controllers/pendingOrder.controller");
const router = express.Router();

router.route("/pending-orders").get(pendingOrders);
router.route("/add-to-confirm").post(addToConfirmOrders);
router.route("/add-to-cancel").post(addToCancelOrders);
router.route("/add-to-pending").post(addToPendingOrder);
router.route("/edit").post(editPendingOrders);


module.exports = router;
const addWebsiteData = require("../../api/v1/admin/addWebisteData");
const deleteUser = require("../../api/v1/admin/deleteUser");
const getAllContacts = require("../../api/v1/admin/getAllContacts");
const getAllUsers = require("../../api/v1/admin/getAllUsers");
const getLiveKit = require("../../api/v1/admin/getLiveKit");
const getPaygic = require("../../api/v1/admin/getPaygic");
const setLiveKit = require("../../api/v1/admin/setLiveKit");
const setPaygic = require("../../api/v1/admin/setPaygic");
const { adminOnly } = require("../../middlewares/userValidate");

const router = require("express").Router();

router.get("/users/:id/:email", adminOnly, getAllUsers);
router.delete("/user/delete/:id/:email/:userId", adminOnly, deleteUser);

// website data related
router.post("/website/add/:id/:email", adminOnly, addWebsiteData);

// paygic
router.get("/paygic/:id/:email", adminOnly, getPaygic);
router.put("/paygic/set/:id/:email", adminOnly, setPaygic);

// contact
router.get("/contacts/:id/:email", adminOnly, getAllContacts);

// livekit
router.put("/livekit/set/:id/:email", adminOnly, setLiveKit);
router.get("/livekit/:id/:email", adminOnly, getLiveKit);

module.exports = router;

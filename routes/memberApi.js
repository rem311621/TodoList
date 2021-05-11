const express = require("express");
const router = express.Router();
const memberModel = require("../models/memberModel");
router.post("/register", (req, res) => {
  const newMember = new memberModel({
    name: req.body.name,
    account: req.body.account,
    password: req.body.password,
  });
  memberModel.countDocuments({ account: req.body.account }, (err, data) => {
    if (data > 0) {
      res.json({ status: 1, msg: "此帳號已被註冊" });
    } else {
      newMember.save((error, data) => {
        if (err) {
          res.json({ status: 1, msg: "error" });
        } else {
          res.json({ status: 0, msg: "success", data: data });
        }
      });
    }
  });
});
router.post("/login", function (req, res) {
  memberModel.findOne(
    { account: req.body.account, password: req.body.password },
    function (err, data) {
      if (data == null) {
        res.json({ status: 1, msg: "帳號密碼錯誤!" });
      } else if (err) {
        res.json({ status: 1, msg: "error" });
      } else {
        res.json({ status: 0, msg: "success", data: data });
      }
    }
  );
});
module.exports = router;

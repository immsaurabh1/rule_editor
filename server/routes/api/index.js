const express = require("express");
const router = express.Router();
const ruleListPath = "../../models/data/rulelist.json"
const jsonfile = require('jsonfile');
const path = require('path');
const uniqid = require('uniqid');

router.get("/status", (req, res) => {
  res.ok({ success: "true" });
});
const readFile = () => {
  return jsonfile.readFile(path.join(__dirname, ruleListPath))
}
const updateFile = (file) => {
  return jsonfile.writeFile(path.join(__dirname, ruleListPath), file)
}
router.post("/rule/create", (req, res) => {
  try {
    const ruleId = req.body.ruleId;
    readFile()
      .then(obj => {
        let fileObj = obj || [];
        let data = req.body;
        if (ruleId) {
          data._id = ruleId;
          const index = fileObj.findIndex(item => item._id === ruleId);
          if (index > -1) {
            fileObj[index] = data;
          }
        }
        else {
          data._id = uniqid();
          fileObj.push(data)
        }
        return updateFile(fileObj)
      })
      .then(updated => {
        return res.ok(200, {
          success: true,
          message: `Rule was ${ruleId ? 'updated' : 'created'} successfully`
        });
      })
      .catch(error => res.error(400).json({
        success: false,
        message: "Something Went Wrong"
      }))
  } catch (err) {
    return res.error(400).json({
      success: false,
      message: "Something Went Wrong"
    });
  }
});
router.get("/rule/:ruleId", (req, res) => {
  const ruleId = req.params.ruleId;
  try {
    readFile()
      .then(obj => {
        let fileObj = obj || [];
        const index = fileObj.findIndex(item => item._id === ruleId);
        if (index > -1) {
          return res.ok(200, {
            success: true,
            message: "Rule by id fetched.",
            data: fileObj[index]
          });
        }
        throw "err";
      })
      .catch(error => {
        return res.error(400).json({
          success: false,
          message: "Something Went Wrong"
        })
      })
  } catch (err) {
    return res.error(400).json({
      success: false,
      message: "Something Went Wrong"
    });
  }
});

router.get("/ruleList", (req, res) => {
  try {
    readFile()
      .then(obj => {
        let fileObj = obj || [];
        return res.ok(200, {
          success: true,
          message: "Fetched Rule List",
          data: fileObj
        });
      }).catch(error => res.error(400).json({
        success: false,
        message: "Something Went Wrong"
      }))
  } catch (err) {
    return res.error(400).json({
      success: false,
      message: "Something Went Wrong"
    });
  }
});
router.delete("/deleteRule/:ruleId", (req, res) => {
  const ruleId = req.params.ruleId;
  try {
    readFile()
      .then(obj => {
        let fileObj = obj || [];
        const index = fileObj.findIndex(item => item._id === ruleId);
        if (index > -1) {
          fileObj.splice(index, 1);
        }
        return updateFile(fileObj)
      })
      .then(updated => res.ok(200, {
        success: true,
        message: "Rule has been deleted successfully."
      }))
      .catch(error => res.error(400).json({
        success: false,
        message: "Something Went Wrong"
      }))
  } catch (err) {
    return res.error(400).json({
      success: false,
      message: "Something Went Wrong"
    });
  }
});

module.exports = router;

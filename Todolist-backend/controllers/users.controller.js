const db = require("../models/db");

module.exports.getAll = (req, res) => {
  db.execute("SELECT * FROM tbl_todolist ")
    .then((data) => {
      let [rows] = data;
      res.status(200).json({
        data: rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

module.exports.getById = (req, res) => {
  let id = req.params.id;
  db.execute("SELECT * FROM tbl_todolist WHERE id=?", [id])
    .then((data) => {
      let [rows] = data;
      res.status(200).json({
        data: rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

module.exports.createUsers = (req, res) => {
  let { title, userId, id } = req.body;
  db.execute("SELECT * FROM tbl_todolist WHERE title=?", [title])
    .then((data) => {
      let [rows] = data;
      if (rows.length > 0) {
        return Promise.reject("Todo already exist");
      } else {
        return db.execute("INSERT INTO tbl_todolist VALUES(?, ?, ?, ?)", [
          userId,
          id,
          title,
          null,
        ]);
      }
    })
    .then((data) => {
      res.status(200).json({
        message: "Create successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

module.exports.updateUsers = (req, res) => {
  let id = req.params.id;
  let { userId, title } = req.body;
  db.execute("SELECT * FROM tbl_todolist WHERE id=?", [id])
    .then((data) => {
      let [rows] = data;
      console.log(rows);
      if (rows.length === 0) {
        return Promise.reject(" Todo not found");
      } else {
        return db.execute(
          "UPDATE tbl_todolist SET id=?, title=?, completed=? WHERE id=?",
          [userId, title, null, id]
        );
      }
    })
    .then((data) => {
      res.status(200).json({
        message: " Update successsfully",
      });
    })
    .catch((err) => {
      res.status(200).json({
        message: err,
      });
    });
};

module.exports.deleteUsers = (req, res) => {
  let id = req.params.id;
  db.execute("SELECT * FROM tbl_todolist WHERE id=?", [id])
    .then((data) => {
      let [rows] = data;
      if (rows.length === 0) {
        return Promise.reject("Todo not found");
      } else {
        return db.execute("DELETE FROM tbl_todolist WHERE id=?", [id]);
      }
    })
    .then((data) => {
      res.status(200).json({
        message: "Delete successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

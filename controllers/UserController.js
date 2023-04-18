const { User, Thought } = require("../models");

module.exports = {
  // get all of the users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // single user by its id and populate data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with that ID Found." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // creating a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // going to update a user by its id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $set: body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(400).json({ message: "No User with this ID Found." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // going to remove user by the id
  deleteUser({ params }, res) {
    User.findOneAndRemove({ _id: params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this ID Found." })
          : res.json({ message: "User has been deleted." })
      )
      .catch((err) => res.status(500).json(err));
  },

  // going to add new friend to the friends list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this ID Found." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // remove friend from the friends list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendId: req.params._id } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this ID Found." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
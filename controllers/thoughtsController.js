const { Thought, User } = require("../models");

module.exports = {
  // all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        return res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // one thought by id
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought with that ID Found" })
          : res.json({ thought })
      )
      .catch((err) => res.status(500).json(err));
  },
  // new thought and assigns id
  createNewThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addtoSet: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "No User with that ID Found .",
            })
          : res.json({ message: "Thought Added to User's Thoughts." })
      );
  },
  // update thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: { thoughtText: req.body.thoughtText } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .res.json({ message: "No Thought with this ID found" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // delete thought by id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .res.json({ message: "NO Thought with that ID Found" })
          : res.json({ message: "Thought was Deleted." })
      )
      .catch((err) => res.status(500).json(err));
  },
  // adds reaction to thought by id
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought with that ID Found" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // removes reaction from thought by id
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought with this ID Found." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
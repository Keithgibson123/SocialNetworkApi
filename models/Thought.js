const { Schema, Types, model } = require("mongoose");
const mongoose = require("mongoose");
const reactionSchema = require("./Reaction");

// subdocument schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    user: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // format the timestamp on the query
      get: (date) => {
        if (date) return date.toString().split("G")[0];
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// create Thought model
const thoughtSchema = new Schema(
  {
    thought: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // format the timestamp on the query
      get: (date) => {
        if (date) return date.toString().split("G")[0];
      },
    },
    user: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// retrieves the length of the thought's reactions array field
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
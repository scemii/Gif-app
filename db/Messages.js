const Joi = require("@hapi/joi");
const db = require("./connexion");

const schema = Joi.object({
  username: Joi.string().required(),
  message: Joi.string().max(500),
  imageUrl: Joi.string().uri({
    scheme: [/https?/]
  })
});

const messages = db.get("messages");

function getAll() {
  return messages.find();
}

function create(message) {
  const result = schema.validate(message);
  if (result.error === null) {
    message.created = new Date();
    return messages.insert(message);
  } else {
    return Promise.reject(result.error);
  }
}

module.exports = {
  create,
  getAll
};

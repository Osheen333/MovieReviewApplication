require('dotenv').config();
const {UserInputError} = require('apollo-server');
// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

module.exports.validateRegisterInput = (
  name,
  email,
  password,
  confirmPassword
) => {
  const passwordPattern =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string()
      .regex(RegExp(passwordPattern)) // you have to put it in this way and it will work :)
      .required()
      .min(8)
      .max(20),
    confirmPassword: Joi.ref('password'),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: {allow: ['com', 'net']},
    }),
  });
  const {value, error} = schema.validate(
    {name, email, password, confirmPassword},
    {abortEarly: false}
  );

  if (error) {
    throw new UserInputError('Error', {error});
  }
};
module.exports.validateLoginInput = (email, password) => {
  const passwordPattern =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const schema = Joi.object({
    password: Joi.string()
      .regex(RegExp(passwordPattern)) // you have to put it in this way and it will work :)
      .required()
      .min(8)
      .max(20),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: {allow: ['com', 'net']},
    }),
  });
  const {value, error} = schema.validate(
    {email, password},
    {abortEarly: false}
  );

  if (error) {
    throw new UserInputError('Error', {error});
  }
};

module.exports.validateChangePassword = (password, confirmPassword) => {
  const passwordPattern =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const schema = Joi.object({
    password: Joi.string()
      .regex(RegExp(passwordPattern)) // you have to put it in this way and it will work :)
      .required()
      .min(8)
      .max(20),
    confirmPassword: Joi.ref('password'),
  });
  const {value, error} = schema.validate(
    {confirmPassword, password},
    {abortEarly: false}
  );

  if (error) {
    throw new UserInputError('Error', {error});
  }
};

module.exports.validateMovieInput = (
  description,
  movieName,
  directorName,
  releaseDate
) => {
  const schema = Joi.object({
    movieName: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(300).required(),
    directorName: Joi.string().min(3).max(30).required(),
    releaseDate: Joi.string().min(3).max(15).required(),
  });
  const {value, error} = schema.validate(
    {movieName, description, directorName, releaseDate},
    {abortEarly: false}
  );

  if (error) {
    throw new UserInputError('Error', {error});
  }
};

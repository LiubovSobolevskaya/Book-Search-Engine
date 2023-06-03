const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Resolver for the "me" query
        me: async (parent, args, context) => {
            if (context.user) {
                // If user is logged in, return the user data
                return User.findOne({ _id: context.user._id });
            }
            // If user is not logged in, throw an authentication error
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        // Resolver for the "createUser" mutation
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            if (!user) {
                throw new Error('Something is wrong!');
            }
            // Sign token for the created user
            const token = signToken(user);
            // Return the token and user data
            return { token, user };
        },
        // Resolver for the "login" mutation
        login: async (parent, { username, email, password }) => {
            // Find user by username or email
            const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
            if (!user) {
                // If no user is found, throw an authentication error
                throw new AuthenticationError('No user found with this email address');
            }
            // Check if the password is correct
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                // If password is incorrect, throw an authentication error
                throw new AuthenticationError('Incorrect credentials');
            }
            // Sign token for the authenticated user
            const token = signToken(user);
            // Return the token and user data
            return { token, user };
        },
        // Resolver for the "saveBook" mutation
        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                // If user is logged in, add the book to the savedBooks array of the user
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book } },
                    { new: true }
                );
                return updatedUser;
            }
            // If user is not logged in, throw an authentication error
            throw new AuthenticationError('You need to be logged in!');
        },
        // Resolver for the "removeBook" mutation
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                // If user is logged in, remove the book from the savedBooks array of the user
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            // If user is not logged in, throw an authentication error
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;

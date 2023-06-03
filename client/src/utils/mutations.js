import { gql } from '@apollo/client';

// GraphQL mutation to log in a user
export const LOGIN_USER = gql`
  mutation login( $email: String!, $password:String!) {
    login(email: $email, password: $password) {
        token
        user {
          _id
          username
        }
    }
  }
`;
// GraphQL mutation to create a new user
export const ADD_USER = gql`
  mutation createUser($username: String!, $email: String!, $password:String!) {
    createUser(username: $username, email: $email, password: $password) {
        token
        user {
          _id
          username
        }
    }
  }`;
// GraphQL mutation to save a book to user's account
export const SAVE_BOOK = gql`
  mutation saveBook($book: BookInput) {
    saveBook(book: $book) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            image
            link
            title
            description
        }
    }
}`;
// GraphQL mutation to remove a book from user's account
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        _id
        username
        email
        bookCount 
        savedBooks {
          bookId
          authors
          image
          link
          title
          description
      }


    }
}`;

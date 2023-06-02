import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser( $email: String!, $password:String!) {
    loginUser(email: $email, password: $password) {
        token
        user {
          _id
          username
        }
    }
  }
`;

export const ADD_USER = gql`
  mutation createUser( $email: String!, $password:String!) {
    createUser(username: $username, email: $email, password: $password) {
        token
        user {
          _id
          username
        }
    }
  }`;

export const SAVE_BOOK = gql`
  mutation saveBook($book: Book) {
    saveBook(book: $book) {
        _id
        username
        email
        bookCount
        Book {
            bookId
            authors
            image
            link
            title
            description
        }
    }
}`;

export const REMOVE_BOOK = gql`
  mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
    }
}`;

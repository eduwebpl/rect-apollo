import {gql} from '@apollo/client';

export const BASIC_PRODUCT_FRAGMENT = gql`
  fragment BasicProduct on Product {
    productID
    name
    unitPrice
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    categoryID
    name
  }
`
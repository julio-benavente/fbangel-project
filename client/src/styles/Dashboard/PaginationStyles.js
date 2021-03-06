import { transparentize } from "polished";
import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 1rem;
  position: relative;
  .left_arrow,
  .right_arrow {
    transform: scale(0.7);
  }

  .right_arrow {
    transform: scale(0.7) rotate(180deg);
  }

  .rc-pagination {
    font-size: 12px;
    font-family: "Arial";
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rc-pagination-total-text {
    float: left;
    height: 30px;
    line-height: 30px;
    margin-right: 10px;
  }
  .rc-pagination:after {
    content: " ";
    display: block;
    height: 0;
    clear: both;
    overflow: hidden;
    visibility: hidden;
  }
  .rc-pagination-item {
    cursor: pointer;
    border-radius: 40px;
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    list-style: none;
    float: left;
    background-color: ${(props) => transparentize(0.7, props.theme.color.blue)}
      transparentize($color: $blue, $amount: 0.8);
    margin-right: 8px;
  }
  .rc-pagination-item a {
    text-decoration: none;
    font-weight: 700;
    color: $black;
  }

  .rc-pagination-item:hover {
    background-color: ${(props) => props.theme.color.blue};
    a {
      color: $white;
    }
  }
  .rc-pagination-item-active {
    background-color: ${(props) => props.theme.color.blue};
  }
  .rc-pagination-item-active a {
    color: #fff;
  }
  .rc-pagination-item-active:hover a {
    color: #fff;
  }
  .rc-pagination-jump-prev:after,
  .rc-pagination-jump-next:after {
    content: "•••";
    display: block;
    letter-spacing: 2px;
    color: #ccc;
    font-size: 12px;
    margin-top: 1px;
  }
  .rc-pagination-jump-prev:hover:after,
  .rc-pagination-jump-next:hover:after {
    color: #2db7f5;
  }
  .rc-pagination-jump-prev:hover:after {
    content: "«";
  }
  .rc-pagination-jump-next:hover:after {
    content: "»";
  }
  .rc-pagination-prev,
  .rc-pagination-jump-prev,
  .rc-pagination-jump-next {
    margin-right: 8px;
  }
  .rc-pagination-prev,
  .rc-pagination-next,
  .rc-pagination-jump-prev,
  .rc-pagination-jump-next {
    cursor: pointer;
    font-size: 10px;
    border-radius: 6px;
    list-style: none;
    min-width: 28px;
    height: 28px;
    line-height: 28px;
    float: left;
    text-align: center;
  }
  .rc-pagination-prev a:after {
    content: "‹";
    display: block;
  }
  .rc-pagination-next a:after {
    content: "›";
    display: block;
  }
  .rc-pagination-prev,
  .rc-pagination-next {
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .rc-pagination-prev a,
  .rc-pagination-next a {
    color: #666;
  }
  .rc-pagination-prev a:after,
  .rc-pagination-next a:after {
    margin-top: -1px;
  }
  .rc-pagination-disabled {
    cursor: not-allowed;
    color: #ccc;
  }
  .rc-pagination-disabled a {
    color: #ccc;
  }
  .rc-pagination-options {
    // disabled on purpose
    display: none;
    float: left;
    margin-left: 15px;
  }
  .rc-pagination-options-size-changer {
    float: left;
    width: 80px;
  }
  .rc-pagination-options-quick-jumper {
    float: left;
    margin-left: 16px;
    height: 28px;
    line-height: 28px;
  }
  .rc-pagination-options-quick-jumper input {
    margin: 0 8px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid #d9d9d9;
    outline: none;
    padding: 3px 12px;
    width: 50px;
    height: 28px;
  }
  .rc-pagination-options-quick-jumper input:hover {
    border-color: #2db7f5;
  }
  .rc-pagination-simple .rc-pagination-prev,
  .rc-pagination-simple .rc-pagination-next {
    border: none;
    height: 24px;
    line-height: 24px;
    margin: 0;
    font-size: 18px;
  }
  .rc-pagination-simple .rc-pagination-simple-pager {
    float: left;
    margin-right: 8px;
  }
  .rc-pagination-simple .rc-pagination-simple-pager .rc-pagination-slash {
    margin: 0 10px;
  }
  .rc-pagination-simple .rc-pagination-simple-pager input {
    margin: 0 8px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid #d9d9d9;
    outline: none;
    padding: 5px 8px;
    width: 30px;
    min-height: 20px;
  }
  .rc-pagination-simple .rc-pagination-simple-pager input:hover {
    border-color: #2db7f5;
  }
`;

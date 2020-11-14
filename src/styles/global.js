import { createGlobalStyle } from "styled-components"

import "font-awesome/css/font-awesome.css";

export const GlobalStyle = createGlobalStyle`
.main-footer {
  position: fixed;
  bottom:0;
  left:0;
  width:100%;
}
.content-wrapper{
  min-height: 657px;
}
button {
  margin-left: 5px;
}
.table-actions {
  width: 150px;
}
.sidebar-open .content-wrapper, .sidebar-open .right-side, .sidebar-open {
    transform: translate(0) !important;
}
`;

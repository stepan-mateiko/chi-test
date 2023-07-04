import styled from "styled-components";

export const Heading = styled.caption`
 font-size:24px;
 font-weight:700;
 margin: 20px auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  border-collapse: collapse;
`;

export const TableHead=styled.thead`
background-color: #f2f2f2;`

export const TableRow=styled.tr`
&:nth-child(even) {
  background-color: #f9f9f9;
}`

export const TableHeaderCell = styled.th`
padding: 10px;
`;

export const TableDataCell = styled.td`
  padding: 10px;
`;

export const Pagination=styled.div`
width:80%;
margin:0 auto;
& ul{
    display:flex;
    justify-content: center;
    list-style-type:none;
    flex-wrap:wrap;
    & li{
        width: 5%
    }
}`

export const StyledHeader=styled.header`
display:flex;
justify-content:space-between;
align-items:center;
width:100%;
margin: 20px auto;
`

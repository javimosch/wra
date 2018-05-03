import styled from 'vue-styled-components';

var UploadInput = styled.input`

    font-size:12px;
    border:0px;
    border-bottom:1px solid grey;

    @media only screen and (min-width: 320px) {
        
    }
    
    &:hover,&:active,&:focus{
        border:0px;
        border-bottom:1px solid grey;
        text-decoration: none;
        box-shadow: none;
        outline:0px solid grey;
    }
    
    &[disabled]:hover,&[disabled]:active,&[disabled]:focus{
        outline:0px
    }

`;
export default UploadInput



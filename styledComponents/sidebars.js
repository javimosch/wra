import styled from 'vue-styled-components';

export const wSidebarToggle = styled.div`
    top: 40%;
    width: 50px;
    background: white;
    z-index: 10;
    position: fixed;
    transform: rotate(-90deg);
    left: 0;
    margin-left:-15px;
    border: 0px;
    height: 20px;
    padding:0px;
    button{
        font-size:8px;
        margin:0px;
        position: absolute;
        background-color:#F57F22;
    }
    button:hover{
        background-color:#F57F22;
        opacity: 0.6;    
    }
`;
export const wSidebar = styled.div`
    top: 5%;
    padding: 1em;
    width: 90%;
    background: white;
    z-index: 10;
    position: fixed;
    left: 0;
    border: 1px solid #D42B2F;
    overflow: scroll;
    height: 90%;
    border-radius: 0px 20px 20px 0;
    @media only screen and (min-width: 320px) {
        width:300px;
    }
`;



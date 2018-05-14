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
        background-color:#033048;
    }
    button:hover{
        opacity: 0.6;    
    }
`;
export const wSidebar = styled.div`
    top: 0px;
    padding: 0px;
    width: 90%;
    background: white;
    z-index: 10;
    position: fixed;
    left: 0;
    border: 0;
    overflow: scroll;
    height: 100%;
    border-radius: 0px 0px 0px 0;
    border: 1px solid rgba(0,0,0,.05);
    
    @media only screen and (min-width: 320px) {
        width:150px;
    }
`;

export const wSidebar2 = styled.div`
    padding: 0px;
    background: white;
    overflow: scroll;
    @media only screen and (min-width: 320px) {
        width:150px;
        
    }
`;


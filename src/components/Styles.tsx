import styled from 'styled-components';

interface SubMenuItemProps {
    key?: string, 
    onClick?: React.MouseEventHandler<HTMLDivElement>
}


export const SubMenu = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    &:first-child {
        margin-top: -6%;//-35px
    }
`;

export const SubMenuItem = styled.div<SubMenuItemProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > img {
        height: 6em;
    }
`;

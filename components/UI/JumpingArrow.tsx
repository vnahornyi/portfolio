import styled from '@emotion/styled';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useColorModeValue } from '@chakra-ui/react';

interface IJumpingArrow {
    alwaysWhite?: boolean;
}

const JumpingArrow: React.FC<IJumpingArrow> = ({ alwaysWhite }) => (
    <StyledJumpingArrow>
        <ChevronDownIcon w='10' h='10' color={useColorModeValue(alwaysWhite ? 'black' : 'green.400', 'white')} />
    </StyledJumpingArrow>
);

// const StyledScrollBottomBtn = styled(IconButton)`
const StyledJumpingArrow = styled.div`
    position: absolute;
    z-index: 1;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    animation: jumping 1s linear infinite;
    background-color: transparent;

    @keyframes jumping {
        0% {
            transform: translate(-50%, 0px);
        } 50% {
            transform: translate(-50%, -25px);
        } 100% {
            transform: translate(-50%, 0px);
        }
    }
`;

export default JumpingArrow;

import styled from '@emotion/styled';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { IconButton, useColorModeValue } from '@chakra-ui/react';

interface IScrollToBottomBtn {
    sectionNumber?: number;
    alwaysWhite?: boolean;
}

const ScrollToBottomBtn: React.FC<IScrollToBottomBtn> = ({ sectionNumber = 1, alwaysWhite }) => {
    const handleClick = () => {
        window.scrollTo({
            top: window.innerHeight * sectionNumber,
            behavior: 'smooth'
        });
    }

    return (
        <StyledScrollBottomBtn
            aria-label='scroll to bottom'
            zIndex={1}
            onClick={handleClick}
            icon={<ChevronDownIcon w='10' h='10' color={useColorModeValue(alwaysWhite ? 'black' : 'green.400', 'white')} />}
        />
    );
}

const StyledScrollBottomBtn = styled(IconButton)`
    position: absolute;
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

export default ScrollToBottomBtn;

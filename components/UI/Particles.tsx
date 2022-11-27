import { Box } from '@chakra-ui/react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useCallback, useRef } from 'react';
import ReactParticles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';

interface IParticlesProps {
    config: unknown;
}

const Particles: React.FC<IParticlesProps> = ({ config }) => {
    const ref = useRef<HTMLDivElement>(null);
    const show = useInView(ref);

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    if (!config) return null;

    return (
        <Box pos='absolute' ref={ref} inset='150px'>
            <AnimatePresence>
                {show && (
                    <Box
                        as={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ display: 'none' }}
                        pos='absolute'
                        top='0'
                        left='0'
                        right='0'
                        bottom='0'
                        w='full'
                        h='full'
                        overflow='hidden'
                        zIndex={0}
                    >
                        <ReactParticles
                            params={config}
                            style={{ position: 'absolute', top: 0 }}
                            canvasClassName='canvas'
                            init={particlesInit}
                        />
                    </Box>
                )}
            </AnimatePresence>
        </Box>
    );
}

export default Particles;

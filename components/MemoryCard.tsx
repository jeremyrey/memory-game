/* eslint-disable @next/next/no-img-element */
import { MemoryCardState } from 'app-types';
import { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { Image, Center } from '@chakra-ui/react'

const variants = {
  hidden: { 
    rotateY: 0,
  },
  showing: { 
    rotateY: 155
  },
  revealed: { 
    rotateY: 155,
    x: "100vw",
    y: "50vh",
    transition: {
      x: {
        delay: 2
      },
      y: {
        delay: 2
      }
    }
  },
}

interface ComponentProps {
  cardState: MemoryCardState;
  handleClick: () => void;
}

export default function MemoryCard({
  cardState,
  handleClick,
}: ComponentProps): ReactElement {
  return (
    <motion.div variants={variants} animate={cardState.tag} initial="hidden" onClick={handleClick}
      whileHover={
        cardState.tag === "hidden" ? {
        rotateY: 25,
        transition: {
          duration: .2
        }} : {}
      }
      style={{
        transformStyle: "preserve-3d",
        position: "relative",
        aspectRatio: "450 / 630",

      }}
    >
      <Center
        position="absolute"
        width="100%"
        height="100%"
        style={{
          backfaceVisibility: "hidden",
        }}
      >
        <Image src='/images/default.svg' alt='default' />
      </Center>
      <Center
          position="absolute"
          width="100%"
          height="100%"
          transform="rotateY(180deg)"
          style={{
            backfaceVisibility: "hidden"
          }}
      >
        <Image src={cardState.value.pokemon.sprites.front_default} alt='' objectFit='contain'/>
      </Center>
    </motion.div>
  );
}

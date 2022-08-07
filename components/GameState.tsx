import { matchExhaustive } from '@practical-fp/union-types';
import { MemoryGameState } from 'app-types';
import { ReactElement } from 'react';
import { Heading, Box } from '@chakra-ui/react'

export default function GameState({
  gameState,
}: {
  gameState: MemoryGameState;
}): ReactElement {
  return (
    <Box width="250px" padding="4">
      <Heading>Loto</Heading>
      <div>
        <span>
          {matchExhaustive(gameState, {
            all_hidden: () => 'Choisis une nouvelle carte',
            all_revealed: () => 'Bravo !',
            one_showing: ({ pokemon }) => `Où est le deuxième ${pokemon.name} ?`,
            two_showing: () => 'Eh non...',
          })}
        </span>
      </div>
    </Box>
  );
}

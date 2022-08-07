import * as E from 'fp-ts/Either';
import { getCards } from '@lib/pokeapi';
import { pipe } from 'fp-ts/lib/function';
import { ReactElement, useEffect, useState } from 'react';
import { MemoryCardState } from 'app-types';
import MemoryCard from '@components/MemoryCard';
import {
  gameStateFromMemoryCardList,
  handleClickOnCard,
  resetCardList,
} from 'controllers/game-manager';
import { map } from 'fp-ts/lib/Array';
import { memoryGameState } from '@lib/pokeapi/impl';
import GameState from '@components/GameState';
import { Grid, Flex, Spacer } from '@chakra-ui/react';

export default function Board(): ReactElement {
  const [timer, setTimer] = useState<number | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [cardList, setCardList] = useState<MemoryCardState[]>([]);
  const gameState = gameStateFromMemoryCardList(cardList);
  const gameStateIsTwoShowing = memoryGameState.two_showing.is(gameState);
  const handleClick = (cardState: MemoryCardState): void => {
    if (timer != null) {
      window.clearTimeout(timer);
    }
    setCardList(handleClickOnCard({ cardState, gameState }));
  };

  const reloadGame = (): void => {
    window.location.reload();
  };

  // Ne s'active que si @gameStateIsTwoShowing est changé
  useEffect(() => {
    if (gameStateIsTwoShowing) {
      setTimer(
        window.setTimeout(() => {
          setCardList(resetCardList);
        }, 2000)
      );
    }
  }, [gameStateIsTwoShowing]);

  useEffect(() => {
    setLoading(true)
    getCards().then((data) => {
      setCardList(data);
      setLoading(false);
    })
  }, []);

  if (isLoading) return <div>Ca arrive ;)</div>

  return (
    <Flex>
      <Grid templateColumns='repeat(4, 1fr)' gap={6} width="100%" padding="4">
        {pipe(
            cardList,
            map((cardState) => (
              <MemoryCard
                key={cardState.value.id}
                cardState={cardState}
                handleClick={() => handleClick(cardState)}
              />
            ))
          )}
      </Grid>
      <GameState gameState={gameState}/>
    </Flex>
  );
}

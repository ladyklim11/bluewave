
// Libraries
import React from 'react';

// Constants
import { BLOCK_TYPES } from '../constants';

// Assets
import editIcon from '../../../assets/actionsIcons/edit.svg';
import toUpIcon from '../../../assets/actionsIcons/toUp.svg';
import toDownIcon from '../../../assets/actionsIcons/toDown.svg';
import deleteIcon from '../../../assets/actionsIcons/delete.svg';
import copyIcon from '../../../assets/actionsIcons/copy.svg';

// Styles
import styles from '../style.module.scss';


const ControlPanel = ({ show, actions, values }) => {
  const {
    setSelectedBlock,
    setCreatingBlock,

    createBlock,
    swapBlocks,
    deleteBlock,
  } = actions;

  const {
    activePage,
    selectedBlock,
  } = values;

  const handleSwapBlocks = async (fromBlock, toBlock) => {
    swapBlocks(fromBlock.id, toBlock.id);
  };

  return (
    <>
      {show && (
        <div className={styles.List__Edit__Panel} onClick={e => e.stopPropagation()}>
          <button
            className={styles.List__Edit__Item}
            onClick={e => {
              e.stopPropagation();
              deleteBlock(selectedBlock.id);
              setSelectedBlock(null);
            }}
          >
            <img src={deleteIcon} alt='Удалить' />
          </button>
          <button
            className={styles.List__Edit__Item}
            onClick={e => {
              e.stopPropagation();
              createBlock(selectedBlock.type_block_id, selectedBlock.content);
            }}
            disabled={selectedBlock?.type_block_id === 11}
          >
            <img src={copyIcon} alt='Копировать' />
          </button>
          <button
            className={styles.List__Edit__Item}
            onClick={() => {
              setCreatingBlock(BLOCK_TYPES.find(({ type_block_id }) => type_block_id === selectedBlock.type_block_id));
            }}
          >
            <img src={editIcon} alt='Редактировать' />
          </button>
          <button
            className={styles.List__Edit__Item}
            onClick={() => {
              const fromBlock = selectedBlock;
              const toBlock = activePage.blocks.find(({ index_number }) => selectedBlock.index_number - 1 === index_number);
              handleSwapBlocks(fromBlock, toBlock);
            }}
            disabled={selectedBlock.index_number === 0}
          >
            <img src={toUpIcon} alt='Поднять наверх' />
          </button>
          <button
            className={styles.List__Edit__Item}
            onClick={() => {
              const fromBlock = selectedBlock;
              const toBlock = activePage.blocks.find(({ index_number }) => selectedBlock.index_number + 1 === index_number);
              handleSwapBlocks(fromBlock, toBlock);
            }}
            disabled={selectedBlock.index_number >= activePage.blocks.length - 1}
          >
            <img src={toDownIcon} alt='Спустить вниз' />
          </button>
        </div>
      )}
    </>
  )
}

export default ControlPanel;
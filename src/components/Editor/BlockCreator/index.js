
// Libraries
import React from 'react';

// Components
import PerfectScrollbar from 'react-perfect-scrollbar';

// Styles
import styles from '../style.module.scss';


export const checkRules = (formData, rules, globalRules) => {
  if (formData) {
    const checkMinLength = (text, minLength) => text?.replace(/<\/?[^>]+(>|$)/g, "")?.length >= minLength;
    const checkMaxLength = (text, maxLength) => text?.replace(/<\/?[^>]+(>|$)/g, "")?.length <= maxLength;
    const checkRequired = (value) => value?.length > 0;
    const checkYouTubeUrl = (url) => {
      if (url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11
      }
    };

    const defaultFieldsAndRules = rules && Object.entries(rules);

    const checkDefaultRules = defaultFieldsAndRules && defaultFieldsAndRules.length
      ? defaultFieldsAndRules.reduce((reducer, [field, rulesList]) => {
        const isMinLength = rulesList.hasOwnProperty('minLength') ? checkMinLength(formData[field], rulesList.minLength) : true;
        const isMaxLength = rulesList.hasOwnProperty('maxLength') ? checkMaxLength(formData[field], rulesList.maxLength) : true;
        const isRequired = rulesList.hasOwnProperty('required') ? checkRequired(formData[field]) : true;
        const isYouTube = rulesList.hasOwnProperty('isYouTube') ? checkYouTubeUrl(formData[field]) : true;
        return reducer && isMinLength && isMaxLength && isRequired && isYouTube;
      }, true)
      : true;

    let checkGlobalRules = !globalRules;

    if (globalRules) {
      const globalFieldsAndRules = globalRules && Object.entries(globalRules);
      checkGlobalRules = globalFieldsAndRules && globalFieldsAndRules.length
        ? globalFieldsAndRules.reduce((reducer, [rule, value]) => {
          const isMinFields = rule === 'minFields' ? Object.values(formData).reduce((count, field) => field ? count + 1 : count, 1) > value : true;
          const isOr = rule === 'or' ? value.find(field => formData[field]) : true;
          return reducer && isMinFields && isOr;
        }, true)
        : true;
    }

    return checkDefaultRules && checkGlobalRules;
  } else {
    return false;
  }
};

const BlockCreator = ({
  defaultFormData = null,
  handleBlockSave,
  creatingBlock,
  activePage
}) => {
  const [formData, setFormData] = React.useState(
    creatingBlock.event === 'isSettings'
      ? activePage.settings
      : creatingBlock.event === 'blockLikeSettings'
        ? activePage.blocks.find(block => block.type_block_id === 11)?.content || defaultFormData || creatingBlock.defaultFormData
        : defaultFormData || creatingBlock.defaultFormData
  );

  const handleChangeFormData = value => setFormData(prev => ({ ...prev, ...value }));

  return (
    <>
      <div className={styles.Block}>
        <div className={styles.Content}>
          <div style={{marginBottom: 30, overflowY: 'auto'}}>
            <PerfectScrollbar>
              <div className={styles.Creator}>
                {creatingBlock?.component && creatingBlock.component({
                  formData,
                  handleChangeFormData,
                })}
              </div>
            </PerfectScrollbar>
          </div>
          <button
            onClick={() => handleBlockSave(formData)}
            style={{
              width: 'calc(100% - 32px)',
              minHeight: 48,
              margin: 'auto 16px 16px 16px',
            }}
            disabled={!checkRules(formData, creatingBlock.rules, creatingBlock.global_rules)}
          >
            {creatingBlock.submitText || 'Сохранить'}
          </button>
        </div>
      </div>
    </>
  )
};

export default BlockCreator;
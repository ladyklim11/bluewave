
// Libraries
import React from 'react';

// Components
import ColorPicker from '../../ColorPicker';
import PhoneSelect from '../../PhoneSelect';
import Input from '../../Input';

// Styles
import styles from '../../Editor/style.module.scss';


const CreatePaymentBlock = ({ formData, handleChangeFormData }) => {
  const PAYMENT_TYPES = [
    {
      label: 'Сервис 1',
      value: '1'
    },
    {
      label: 'Сервис 2',
      value: '2'
    },
    {
      label: 'Сервис 3',
      value: '3'
    }
  ];

  return (
    <>
      <div className={styles.Block__Form}>
        <div className={styles.Block__Label}>Текст блока</div>
        <Input
          placeholder='Введите текст'
          value={formData.textBlock.text}
          onChange={e => handleChangeFormData({ textBlock: ({ ...formData.textBlock, text: e.target.value })})}
          style={{marginBottom: 8}}
        />
        <div className={styles.Block__Row}>
          <ColorPicker
            placeholder='Цвет блока'
            color={formData.textBlock.blockColor}
            onChange={color => handleChangeFormData({ textBlock: ({ ...formData.textBlock, blockColor: color })})}
            style={{ width: 'calc(50% - 4px)' }}
          />
          <ColorPicker
            placeholder='Цвет текста'
            color={formData.textBlock.textColor}
            onChange={color => handleChangeFormData({ textBlock: ({ ...formData.textBlock, textColor: color })})}
            style={{ width: 'calc(50% - 4px)' }}
          />
        </div>
      </div>
      <div className={styles.Block__Form}>
        <div className={styles.Block__Label}>Кнопка</div>
        <Input
          placeholder='Текст кнопки'
          value={formData.button.text}
          onChange={e => handleChangeFormData({ button: ({ ...formData.button, text: e.target.value })})}
          style={{marginBottom: 8}}
        />
        <div className={styles.Block__Row}>
          <ColorPicker
            placeholder='Цвет кнопки'
            color={formData.button.buttonColor}
            onChange={color => handleChangeFormData({ button: ({ ...formData.button, buttonColor: color })})}
            style={{ width: 'calc(50% - 4px)' }}
          />
          <ColorPicker
            placeholder='Цвет текста'
            color={formData.button.textColor}
            onChange={color => handleChangeFormData({ button: ({ ...formData.button, textColor: color })})}
            style={{ width: 'calc(50% - 4px)' }}
          />
        </div>
      </div>
      <div className={styles.Block__Form}>
        <div className={styles.Block__Label}>
          Платежи
        </div>
        <PhoneSelect
          title={formData.payment.services.length > 0 ? `Выбрано ${formData.payment.services.length} платежных сервис(а)` : 'Выбрать платежный сервис'}
          type='checkbox'
          items={PAYMENT_TYPES}
          handleChange={selectedServices => handleChangeFormData({ payment: ({ ...formData.payment, services: selectedServices})})}
          style={{marginBottom: 8}}
          defaultValues={formData.payment.services}
        />
        <Input
          placeholder='Предложение цены'
          value={formData.payment.price}
          onChange={e => handleChangeFormData({ payment: ({ ...formData.payment, price: e.target.value })})}
        />
      </div>
    </>
  )
}

export default CreatePaymentBlock;
import React, {useState} from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useAuth } from '~/hooks/auth';
import { Button } from '~/components/Form/Button';
import { InputForm } from '~/components/Form/InputForm';
import { TransactionTypeButton } from '~/components/Form/TransactionTypeButton';
import { CategorySelectButton } from '~/components/Form/CategorySelectButton';
import { CategorySelect } from "~/screens/CategorySelect"
import { AppRoutesParamList } from '~/routes/app.routes'
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles"


interface FormData {
  name: string;
  amount: string;
}

type RegisterNavigationProps = BottomTabNavigationProp<
  AppRoutesParamList,
  "Listagem"
>;
const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('Nome é obrigatório'),
  amount: Yup
  .number()
  .typeError('Informe um valor numérico')
  .positive('O valor não pode ser negativo')
  .required('O valor é obrigatório')
})

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })
  const { user} = useAuth();
  const navigation = useNavigation<RegisterNavigationProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors}
  } = useForm({ resolver: yupResolver(schema)});

  function handleTransactionTypeSelect( type: 'negative' | 'positive') {
    setTransactionType(type);
  }

  function handleOpenModalSelectCategory() {
    setCategoryModalOpen(true);
  }

  function handleCloseModalSelectCategory() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if(!transactionType)
    return Alert.alert('Selecione o tipo da categoria');

    if(category.key === 'category')
    return Alert.alert('Selecione a categoria');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }
    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const currentyData = data ? JSON.parse(data) : []; //pegar os dados já salvos na chave, pois o setItem ele sobrescreve

      const dataFormatted = [
        ...currentyData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });
      navigation.navigate('Listagem');

    } catch (error) {
      Alert.alert('Não foi possível cadastrar');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder='Nome'
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors?.name?.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder='Preço'
              keyboardType='numeric'
              error={errors.amount && errors.amount?.message}
            />
            <TransactionTypes>
              <TransactionTypeButton
                type="up"
                title='Income'
                onPress={() => handleTransactionTypeSelect('positive') }
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                type="down"
                title='Outcome'
                onPress={() => handleTransactionTypeSelect('negative') }
                isActive={transactionType === 'negative'}
              />
            </TransactionTypes>

            <CategorySelectButton
              testID='category-button'
              title={category.name}
              onPress={handleOpenModalSelectCategory}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}  testID='modal-category'>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseModalSelectCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}

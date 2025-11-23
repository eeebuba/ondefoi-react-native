import { yupResolver } from '@hookform/resolvers/yup';
import { TUserLogin } from '@src/@types/auth';
import { Logo } from '@src/components/Logo';
import { Button, Gap, IconButton, Text } from '@src/components/default';
import { RHFProvider, RHFTextInput } from '@src/components/hook-form';
import { toast } from '@src/components/toast';
import { useTheme } from '@src/hooks/useTheme';
import { authMethods } from '@src/utils/firebase/auth';
import { AuthSchemas } from '@src/utils/form-schemas';
import { router } from 'expo-router';
import { FirebaseError } from 'firebase/app';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native';

// ----------------------------------------------------------------------

export default function SignInPage() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={{ flex: 1, padding: 24 }}
        contentContainerStyle={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Logo style={{ marginBottom: 100 }} />

        <Text variant="h1" style={{ marginBottom: 24, textAlign: 'center' }}>
          Acesse sua conta
        </Text>

        <SignInForm />

        <Button
          variant="text"
          onPress={() => router.navigate('/auth/sign-up')}
          style={{ marginTop: 24 }}
        >
          Não tem uma conta?
        </Button>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

// ----------------------------------------------------------------------

function SignInForm() {
  const theme = useTheme();
  const [isPwdHidden, setIsPwdHidden] = useState(true);

  // ----------------------------------------------------------------------

  const methods = useForm<TUserLogin>({
    resolver: yupResolver(AuthSchemas.Login),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: TUserLogin) => {
    try {
      await authMethods().signIn(data.email, data.password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        // TODO: firebase error message mapping
        return toast.error('Dados de acesso inválidos');
      }
      toast.error('Ocorreu um erro inesperado :/');
    }
  };

  // ----------------------------------------------------------------------

  return (
    <RHFProvider methods={methods}>
      <RHFTextInput name="email" label="Email" />

      <Gap />

      <RHFTextInput
        name="password"
        label="Senha"
        secureTextEntry={isPwdHidden}
        right={
          <IconButton
            name={isPwdHidden ? 'eye' : 'eyeOff'}
            onPress={() => setIsPwdHidden(!isPwdHidden)}
            color={theme.palette.text.faded}
          />
        }
      />

      <Button
        loading={isSubmitting}
        style={{ marginTop: 24 }}
        onPress={() => void handleSubmit(onSubmit)()}
      >
        Entrar
      </Button>
    </RHFProvider>
  );
}

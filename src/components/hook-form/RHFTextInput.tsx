import { Text } from '@src/components/default';
import { theme } from '@src/theme';
import { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextInput, TextInputProps, View } from 'react-native';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  label: string;
  right?: ReactNode;
};

type Props = IProps & Omit<TextInputProps, 'theme'>;

// ----------------------------------------------------------------------

export default function RHFTextInput({ name, label, right, ...rest }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <View
            style={{
              height: 56,
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: theme.palette.text.disabled,
              borderRadius: theme.props.borderRadius.element,
              ...(!!error && {
                marginBottom: 4,
                borderColor: theme.palette.error.dark,
              }),
            }}
          >
            <TextInput
              value={value ? value + '' : ''}
              onChangeText={onChange}
              placeholder={label}
              selectionColor={theme.palette.text.faded}
              placeholderTextColor={theme.palette.text.faded}
              style={{
                flex: 1,
                fontSize: 14,
                paddingVertical: 12,
                paddingHorizontal: 24,
                color: theme.palette.text.primary,
              }}
              {...rest}
            />

            <View style={{ paddingVertical: 2, paddingRight: 16 }}>
              {right}
            </View>
          </View>

          {!!error && (
            <Text variant="body2" style={{ color: theme.palette.error.dark }}>
              {error?.message}
            </Text>
          )}
        </>
      )}
    />
  );
}

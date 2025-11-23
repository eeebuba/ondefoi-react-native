import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon, Text } from '@src/components/default';
import { theme } from '@src/theme';
import { fDateWritten } from '@src/utils/date';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Keyboard,
  Pressable,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

// ----------------------------------------------------------------------

type Props = {
  name: string;
} & TextInputProps;

// ----------------------------------------------------------------------

export default function RHFDatePicker({ name, ...rest }: Props) {
  const { control } = useFormContext();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          {isOpen && (
            <DateTimePicker
              mode="date"
              value={value as Date}
              is24Hour={true}
              onChange={(event, date) => {
                if (event.type === 'set') {
                  setIsOpen(false);
                  onChange(date);
                }
                setIsOpen(false);
              }}
            />
          )}

          <Pressable
            onPress={() => {
              Keyboard.dismiss();
              setIsOpen(true);
            }}
          >
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
                editable={false}
                onChangeText={onChange}
                value={fDateWritten(value as Date)}
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
                <Icon name="calendar" color={theme.palette.text.faded} />
              </View>
            </View>
          </Pressable>

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

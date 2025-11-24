import { ITransaction } from '@src/@types/transaction';
import { Text } from '@src/components/default';
import { CreateEditForm } from './sections/create-edit/CreateEditForm';

// ----------------------------------------------------------------------

type Props = {
  onSuccess?: VoidFunction;
  //
  isEdit?: boolean;
  editData?: ITransaction;
};

// ----------------------------------------------------------------------

export function TransactionCreateEdit({
  onSuccess,
  isEdit = false,
  editData,
}: Props) {
  return (
    <>
      <Text
        variant="h2"
        style={{ textAlign: 'center', paddingBottom: 20, paddingTop: 18 }}
      >
        {isEdit ? 'Editar transação' : 'Adicionar transação'}
      </Text>

      <CreateEditForm
        onSuccess={onSuccess ? onSuccess : () => {}}
        isEdit={isEdit}
        editData={editData}
      />
    </>
  );
}
